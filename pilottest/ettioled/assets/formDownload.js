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
    const paramList = ["rvs", "fmid", "fname"];
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

// 엑셀 다운 버튼 클릭 이벤트
document.querySelector("." + excelButtonClass).addEventListener("click", (e) => {
    // 데이터 불러오기
    let ctrl = e.target;
    //
    if(["span", "img"].includes(ctrl.tagName.toLowerCase()))
    {
        ctrl = ctrl.parentNode;
    }
    const rvs = ctrl.getAttribute("rvs");
    const fmid = ctrl.getAttribute("fmid");
    const fname = ctrl.getAttribute("fname");
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

            // 조회도 안됨 큰 오류
            if (result.Table === undefined || result.Table.length <= 0) {
                alert("조회에 실패하였습니다.");
            }
            // DB 오류 메시지 확인 필요
            else if (result.Table[0].FLAG !== "S") {
                alert("조회에 실패하였습니다.\r\관리자에게 문의하시기 바랍니다.");
            }
            // 매핑 없음
            else if (result.Table[0].MappingXml === "") {
                alert("조회에 실패하였습니다.\r\관리자에게 문의하시기 바랍니다.");
            }
            // 실제 데이터 없음
            else if (result.Table1 === undefined || result.Table1.length <= 0) {
                //alert("오류 발생(3)");
                alert("조회에 실패하였습니다.\r\데이터가 없습니다.");
            }
            else {

                // 컬럼 매핑 클래스
                class ColMapping { id=""; name=""; constructor(id,name) { this.id = id; this.name = name; } }
                
                const listColMapping = [];
                const docMappingXml = getDocFromXml(result.Table[0].MappingXml);

                // 매핑 데이터 형성
                for (const node of docMappingXml.childNodes[0].childNodes)
                listColMapping.push(new ColMapping(node.tagName, node.innerHTML));

                const listExcelRow = [];
                // 실제 데이터 루프
                let cnt = 0;
                for (const row of result.Table1) {

                    // 해더
                    if (cnt == 0)
                    {
                        const excelHeader = ["제목","기안자","기안자 사번","기안자 부서","기안일"];
                        for (const cm of listColMapping)
                        {
                            excelHeader.push(cm.name);
                        }
                        listExcelRow.push(excelHeader);
                    }
                    const excelRow = [row.Subject, row.IniterName, row.IniterID, row.InitOuName, row.InitDate];
                    // 데이터 생성
                    const doc = getDocFromXml(row.XmlString);
                    for (const cm of listColMapping)
                    {
                        const node =  doc.querySelector(cm.id);

                        if (node == null)
                            excelRow.push("");
                        else
                            excelRow.push(doc.querySelector(cm.id).innerHTML);
                    }
                    listExcelRow.push(excelRow);
                    cnt++;
                }

                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth() + 1; // 월은 0부터 시작하기 때문에 1을 더합니다.
                const day = now.getDate();
                const hour = now.getHours();
                const minute = now.getMinutes();
                const second = now.getSeconds();

                // step 1. workbook 생성
                var wb = XLSX.utils.book_new();
                // step 2. 시트 만들기 
                var newWorksheet = XLSX.utils.aoa_to_sheet(listExcelRow);
                // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
                XLSX.utils.book_append_sheet(wb, newWorksheet, "sheet1");
                // step 4. 엑셀 파일 만들기 
                var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
                // step 5. 엑셀 파일 내보내기 
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `${fname.replaceAll(" ","_")}_${year}${month}${day}${hour}${minute}${second}.xlsx`);
            }

        } catch (error) {
            //console.error("실패:", error);
            alert(`조회에 실패하였습니다.\r\n${error}`);
        }
        
        hideLayerPop();
        setExcelBtnText("엑셀출력");
    }

    let params = { fid: fmid, rvs: rvs, sd: sDate, ed: eDate };

    let url = "./GetFormInstance.ashx";

    postJSON(url, params);

    //btnText.innerText = originText;
});


// 레이어 팝업 [닫기] 버튼 클릭 = 감춤
document.querySelector(".close-laypop").addEventListener("click", (e) => {
    document.querySelector('.layerPop-FormInfo').style.display='none';
});

const getDocFromXml = (xmlString) =>
{
    const parser = new DOMParser();
    return parser.parseFromString(xmlString, "text/xml");
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}

// 키 입력 막기
for (const datePicker of document.querySelectorAll(".datePicker")) datePicker.addEventListener("keydown", (e) => { e.preventDefault(); });