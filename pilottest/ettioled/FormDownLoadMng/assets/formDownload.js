const excelButtonClass = "excel-down";

document.addEventListener("DOMContentLoaded", () => {
    for (let fmif of document.querySelectorAll("tr.fmif")) {
        fmif.addEventListener("click", () => tr_Click(fmif));
    }
});

const tr_Click = (tr) => {
    // 정보노출용
    const noticeList = ["fname", "fmpf", "fmds", "csnm"];
    for (let attrName of noticeList) {
        document.querySelector("." + attrName).innerText = tr.getAttribute(attrName);
    }
    // 팝업용 정보들
    const paramList = ["rvs", "fmid", "fname", "fmpf"];
    for (let paramName of paramList) {
        document.querySelector("." + excelButtonClass).setAttribute(paramName, tr.getAttribute(paramName));
    }
    document.querySelector(".layerPop-FormInfo").style.display = "";
}

const setExcelBtnText = (txt) => {
    const excelBtn = document.querySelector("." + excelButtonClass);
    const excelBtnInnerSpan = excelBtn.querySelector(".btnText");
    excelBtnInnerSpan.innerText = txt;
}

const getCellAlphabetByNumber = (number) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const Base26 = [];
    let i = number - 1;
    while (true) {
        const len = alphabet.length;
        const q = i / len;
        const r = i % len;
        Base26.unshift(r);
        if (q < 1) break;
        i = Math.floor(q - 1);
    }

    let result = "";

    for (const idx of Base26) {
        result += alphabet[idx];
    }
    return result;
}

function getAlphabetByNumber(number) {
    if (number < 1) {
        throw new Error("Number must be greater than or equal to 1");
    }

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    const index = (number - 1) % alphabet.length;
    return alphabet[index];
}

const getValueFromOjbect = (obj, key) => {
    const objkeys = Object.keys(obj);
    const objvalues = Object.values(obj);
    let idx;
    for (let i = 0; i < objkeys.length; i++) {
        if (objkeys[i].toLocaleUpperCase() === key.toLocaleUpperCase()) {
            idx = i;
            break;
        }
    }
    if (idx == null || idx === undefined) return null;
    else return objvalues[idx];
}

// 엑셀 다운 버튼 클릭 이벤트
document.querySelector("." + excelButtonClass).addEventListener("click", async (e) => {
    // 데이터 불러오기
    let ctrl = e.target;
    //
    if (["span", "img"].includes(ctrl.tagName.toLowerCase())) {
        ctrl = ctrl.parentNode;
    }
    const rvs = ctrl.getAttribute("rvs");
    const fmid = ctrl.getAttribute("fmid");
    const fname = ctrl.getAttribute("fname");
    const fmpf = ctrl.getAttribute("fmpf");
    const sDate = document.querySelector(".sDate").value;
    const eDate = document.querySelector(".eDate").value;
    

    // 웹메소드 호출

    setExcelBtnText("진행중...");

    async function postJSON(url, data) {

        try {
            const response = await fetch(url, {
                method: "POST", // 또는 'PUT'
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "X-Custom-Mode": "WebMethod"
                },
                body: JSON.stringify(data)
            });

            //const result = response;
            const result = await response.json();
            //const result = await response.text();
            //console.log("성공:", result);

            debugger;
            // 조회도 안됨 큰 오류
            if (result.Table === undefined || result.Table.length <= 0) {
                alert("조회에 실패하였습니다.\rEC:1");
            }
            // DB 오류 메시지 확인 필요
            else if (result.Table[0].FLAG !== "S") {
                alert("조회에 실패하였습니다.\r관리자에게 문의하시기 바랍니다.\rEC:2");
            }
            // 매핑 없음
            else if (result.Table[0].CustomState === 1 && result.Table[0].MappingXml === "") {
                alert("조회에 실패하였습니다.\r관리자에게 문의하시기 바랍니다.\rEC:3");
            }
            // // 실제 데이터 없음
            // else if (result.Table1 === undefined || result.Table1.length <= 0) {
            //     //alert("오류 발생(3)");
            //     alert("조회에 실패하였습니다.\r\데이터가 없습니다.");
            // }
            else {

                // 컬럼 매핑 클래스
                // class ColMapping { id = ""; name = ""; constructor(id, name) { this.id = id; this.name = name; } }
                // class SubNode { id = ""; constructor(id, array) { this.id = id; this.list = array; } }

                const fmcs = result.Table[0].CustomState;

                if (fmcs === "0")
                {
                    const url = `./excelcustom.aspx?p=${fmpf}&r=${rvs}&sd=${sDate}&ed=${eDate}`;
                    ifrCustom.src = url;
                    return;
                }

                const defaultDataNode = getDataNodeFromXml(result.Table[0].MappingDefaultXml);
                const colMappingNode = getDataNodeFromXml(result.Table[0].MappingXml);

                const listExcelRow = [];
                const listExcelHead = [];
                const listMergeExcel = [];

                let rowidx = 0;
                for (const row of result.Table1) {
                    let cntSubRowMax = 0;
                    //------------------------------------------------------------
                    // 데이터 배열로 구성 ▼
                    //------------------------------------------------------------
                    const arrRow = [];
                    for (const node1 of defaultDataNode.childNodes) {
                        const dic = {};
                        dic[node1.tagName] = { name: node1.innerHTML, type: "s", value: row[node1.tagName] };
                        arrRow.push(dic);
                    }
                    const dataNodeRow = getDataNodeFromXml(row.XmlString);
                    for (const node2 of colMappingNode.childNodes) {
                        const hasChildNodes = node2.hasChildNodes() && 1 < node2.childNodes.length;
                        if (!hasChildNodes) {

                            const queryResult = dataNodeRow.querySelector(node2.tagName);
                            let queryResultValue = "";
                            if (queryResult != null && queryResult !== undefined) queryResultValue = queryResult.innerHTML;
                            const dic = {};
                            dic[node2.tagName] = { name: node2.innerHTML, type: "s", value: queryResultValue };
                            arrRow.push(dic);
                        }
                        else {

                            for (const node3 of node2.childNodes) {
                                const pattern = node3.getAttribute("pattern");
                                const patternText = pattern.replace("$", "");
                                const re = new RegExp(`${pattern.replace("$", "\\d*$")}`, 'g');

                                const arrNode4 = [];
                                for (const node4 of dataNodeRow.childNodes) {
                                    if (re.test(node4.tagName)) {
                                        const idx = node4.tagName.replace(patternText, "");
                                        const obj = {};
                                        obj[node4.tagName] = { idx: idx, value: node4.innerHTML };
                                        arrNode4.push(obj);
                                    }
                                }
                                const arrLength = arrNode4.length;
                                if (cntSubRowMax < arrLength) cntSubRowMax = arrLength;
                                const dic = {};
                                dic[pattern] = { name: node3.innerHTML, type: "m", value: arrNode4 };
                                arrRow.push(dic);
                            }
                        }
                    }
                    // 데이터 배열로 구성 ▲

                    // 해더 구성
                    if (rowidx == 0) {
                        for (const col of arrRow) {
                            const key = Object.keys(col).toString();
                            listExcelHead.push(col[key].name);
                        }
                        listExcelRow.push(listExcelHead);
                    }

                    const listCellCol = [];

                    const listCellRowStart = listExcelRow.length + 1;
                    const listCellRowEnd = listCellRowStart + cntSubRowMax - 1;
                    // 바디 구성
                    for (let i = 0; i < cntSubRowMax; i++) {
                        const listThisRow = [];
                        //for (const col of arrRow) {
                        for (let j = 0; j < arrRow.length; j++) {
                            const col = arrRow[j];
                            const key = Object.keys(col).toString();
                            const type = col[key].type;
                            let value = "";
                            if (type === "s" && i < 1) {
                                value = col[key].value;
                                if (1 < cntSubRowMax) listCellCol.push(getCellAlphabetByNumber(j + 1).toUpperCase());
                            }
                            else if (type === "m") {
                                const parentValue = col[key].value;
                                if (parentValue[i] !== undefined) {
                                    const subKey = Object.keys(parentValue[i]).toString();
                                    value = parentValue[i][subKey].value;
                                }
                            }
                            else {
                                value = "";
                            }
                            listThisRow.push(value);
                        }
                        listExcelRow.push(listThisRow);
                    }

                    for (const cellColIdx of listCellCol) {
                        const decode_range = XLSX.utils.decode_range(`${cellColIdx}${listCellRowStart}:${cellColIdx}${listCellRowEnd}`);
                        //decode_range.s["alignment"] = {vertical: "top"};
                        listMergeExcel.push(decode_range);
                    }

                    rowidx++;
                }
                const now = new Date();
                const year = now.getFullYear();
                const month = ("00" + (now.getMonth() + 1)).right(2); // 월은 0부터 시작하기 때문에 1을 더합니다.
                const day = ("00" + now.getDate()).right(2);
                const hour = ("00" + now.getHours()).right(2);
                const minute = ("00" + now.getMinutes()).right(2);
                const second = ("00" + now.getSeconds()).right(2);

                // step 1. workbook 생성
                var wb = XLSX.utils.book_new();
                // step 2. 시트 만들기 
                var newWorksheet = XLSX.utils.aoa_to_sheet(listExcelRow);
                newWorksheet["!merges"] = listMergeExcel;
                // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
                XLSX.utils.book_append_sheet(wb, newWorksheet, "sheet1");
                // step 4. 엑셀 파일 만들기 
                var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
                // step 5. 엑셀 파일 내보내기 
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `${fname.replaceAll(" ", "_")}_${year}${month}${day}${hour}${minute}${second}.xlsx`);
            }

        } catch (error) {
            //console.error("실패:", error);
            alert(`조회에 실패하였습니다.\r\n${error}`);
        }
    }

    // if (chkCustom.checked)
    // {
    //     const url = `./excelcustom.aspx?p=${fmpf}&r=${rvs}&sd=${sDate}&ed=${eDate}`;
    //     ifrCustom.src = url;
    // }
    await postJSON("./GetFormInstance.ashx", { fid: fmid, rvs: rvs, sd: sDate, ed: eDate });

    hideLayerPop();
    setExcelBtnText("엑셀출력");

    //btnText.innerText = originText;
});

// 레이어 팝업 [닫기] 버튼 클릭 = 감춤
document.querySelector(".close-laypop").addEventListener("click", (e) => {
    document.querySelector('.layerPop-FormInfo').style.display = 'none';
});

const getDocFromXml = (xmlString) => {
    xmlString = xmlString.replaceAll("&rdquo;", "\"");
    const parser = new DOMParser();
    return parser.parseFromString(xmlString, "text/xml");
}

const getDataNodeFromXml = (xmlString) => {
    const doc = getDocFromXml(xmlString);
    let node = doc;
    while (node.hasChildNodes() && node.childNodes.length <= 1) {
        node = node.childNodes[0];
    }
    return node;
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}

// 키 입력 막기
// for (const datePicker of document.querySelectorAll(".datePicker")) datePicker.addEventListener("keydown", (e) => { e.preventDefault(); });

String.prototype.right = function (length) {

    if (this.length <= length) {
        return this;
    }
    else {
        return this.substring(this.length - length, this.length);
    }
}