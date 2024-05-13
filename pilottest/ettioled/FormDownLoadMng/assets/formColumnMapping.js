const selectVersion = document.getElementById("selectVersion");
const form = document.getElementById("form1");
const ItemList = document.querySelector("#divColumnList .item_detail");


function inportExcel(e) {

    var input = e.target;
    var reader = new FileReader();
    reader.onload = function () {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, { type: 'binary' });
        wb.SheetNames.forEach(function (sheetName) {
            var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
            for (let i = 0; i < rowObj.length; i++) {
                const newNode = document.createElement(rowObj[i].COLUMN_ID);
                newNode.textContent = rowObj[i].COLUMN_NAME;
                ItemList.appendChild(makeRow(newNode));
            }

        });
    };
    reader.readAsBinaryString(input.files[0]);

    input.value = "";
}
function downExcelSample() {
    // step 1. workbook 생성
    var wb = XLSX.utils.book_new();

    // step 2. 시트 만들기 
    var newWorksheet = excelHandler.getWorksheet();

    // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
    XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());

    // step 4. 엑셀 파일 만들기 
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    // step 5. 엑셀 파일 내보내기 
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), excelHandler.getExcelFileName());
}
var excelHandler = {
    getExcelFileName: function () {
        return 'upload_sample.xlsx';
    },
    getSheetName: function () {
        return 'Sheet1';
    },
    getExcelData: function () {
        return [['COLUMN_ID', 'COLUMN_NAME'], ['FOOD_1', '계란후라이'], ['FOOD_2', '초밥'], ['FOOD_3', '햄버거']];
    },
    getWorksheet: function () {
        return XLSX.utils.aoa_to_sheet(this.getExcelData());
    }
}
function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}
function packXml2Form(sct) {

    const attr_nm1 = "preRevision";
    const attr_nm2 = "custom_state";
    const pre_revision = sct.getAttribute(attr_nm1);
    //const now_revision = sct[sct.selectedIndex].value;


    //const currentOption = selectVersion.querySelector(`option[value=\"${pre_revision}\"]`).getAttribute("custom_state");

    const chkCustom = document.querySelector("#chkCustom").checked;

    let hdnNew = form.querySelector("input[name=\"" + constPrefixHdnNew + pre_revision + "\"]");
    if (hdnNew == null) {
        hdnNew = document.createElement("input");
        hdnNew.setAttribute("type", "hidden");
        hdnNew.setAttribute("name", constPrefixHdnNew + pre_revision);
        hdnNew.setAttribute("revision", pre_revision);
        form.appendChild(hdnNew);
    }

    
    if (chkCustom)
    {
        hdnNew.value = "";
    }
    else
    {
        const hdnOrigin = document.querySelector("#form1 input[name=\"" + constPrefixHdnOrigin + pre_revision + "\"]");
        if (hdnOrigin != null) {
            if (hdnOrigin.value != item_xml.value) hdnNew.value = cleanStringForXml(item_xml.value);
        }
        else {
            hdnNew.value = cleanStringForXml(item_xml.value);
        }
    }

    hdnNew.setAttribute(attr_nm2, (chkCustom ? "0" : "1"));

}
//------------------------------------------------------------
// 이벤트
//------------------------------------------------------------

function xIsEmpty(p) {
    if (typeof p === "undefined" || p == null) {
        return true;
    }
    else if (p.toString() === "") {
        return true;
    }
    return false;
}

const setRevision = (revision) =>
{
    let pre_revision = selectVersion.getAttribute("preRevision")
    let now_revision = selectVersion.getAttribute("nowRevision");
    const next_revision = revision;

    if (now_revision === undefined || now_revision === null) now_revision = revision;
    if (pre_revision === undefined || pre_revision === null) pre_revision = revision;

    selectVersion.setAttribute("preRevision", now_revision);
    selectVersion.setAttribute("nowRevision", next_revision);


    const hdnOrigin_Current = document.querySelector("#" + constPrefixHdnOrigin + revision);
    if (hdnOrigin_Current != null)
    {
        let xmlEntity = parseXmlToEntity(hdnOrigin_Current.value);
        parseEntityToTextarea(xmlEntity);
        parseEntityToItemList(xmlEntity);
    }

    const currentOption = selectVersion.querySelector(`option[value=\"${revision}\"]`).getAttribute("custom_state");
    document.querySelector("#chkCustom").checked = (currentOption === "0");
}


selectVersion.addEventListener("change", (e) => {
    const cvr = checkVaild();
    if (!cvr.isVaild)
    {
        selectVersion.value = selectVersion.getAttribute("preRevision");
        alert(cvr.msg);
        item_xml.focus();
        return;
    }
    else
    {
        packXml2Form(e.target);
        setRevision(e.target.value);
    }
});

const checkVaild = () => {
    let isVaild = true;
    let msg = "";

    const chkCustom = document.querySelector("#chkCustom").checked;

    if (chkCustom) return {isVaild: true, msg: "커스텀"};;

    const xmlString = cleanStringForXml(item_xml.value);
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, "text/xml");

    if (xmlString.trim().length == 0) {
        return {isVaild: false, msg: "값이 없습니다."};
    }
    else if (0 < doc.childNodes[0].querySelectorAll("parsererror").length) {
        return {isVaild: false, msg: "비정상적인 XML 형식입니다."};
    }
    else
    {
        return {isVaild: true, msg: "정상"};
    }
}

document.getElementById("parse-2-grid").addEventListener("click", () => parseEntityToItemList(parseXmlToEntity(item_xml.value)));
document.getElementById("parse-2-xml").addEventListener("click", () => parseEntityToTextarea(parseItemListToEntity()));
document.getElementById("import-excel").addEventListener("click", () => document.getElementById("excel-file").click());
document.getElementById("down-excel-sample").addEventListener("click", downExcelSample);

document.getElementById("save-form").addEventListener("click", (e) => {

    //const chkCustom = document.querySelector("#chkCustom").checked;

    // Check Vaild Result
    const cvr = checkVaild();
    if (!cvr.isVaild)
    {
        alert(cvr.msg);
        item_xml.focus();
        return;
    }

    if (!confirm("저장하시겠습니까?\r\n저장은 XML 기준으로 진행됩니다.")) return;

    // 지금 화면 저장
    packXml2Form(selectVersion);
    let invaildCount = 0;
    let saveValueList = form.querySelectorAll("[name^=" + constPrefixHdnNew + "]");
    const hdn_save_list = document.createElement("input");
    hdn_save_list.setAttribute("type", "hidden");
    hdn_save_list.setAttribute("name", constCtrlEditedList);
    form.appendChild(hdn_save_list);

    const package = {list:[]};

    saveValueList.forEach(element => {
        element.value = element.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
        const revision = element.getAttribute("revision");
        const custom_state = element.getAttribute("custom_state");

        const origin = document.querySelector(`[name^="${constPrefixHdnOrigin}"][revision="${revision}"]`)

        if (origin == null || origin.value != element.value){
            //debugger;
            //hdn_save_list.value += revision + ",";
            package.list.push({r:revision,c:custom_state});
        }
    });

    hdn_save_list.value = JSON.stringify(package);

    debugger;

    form.querySelectorAll("[name^=" + constPrefixHdnOrigin + "]").forEach(element => form.removeChild(element));

    document.querySelector("#btnSave").click();
});
document.getElementById("add-row").addEventListener("click", (e) => {
    const newRow = makeRow();
    ItemList.appendChild(newRow);
    const newText = newRow.querySelector(`input[type="text"]`)
    newRow.querySelector("span").classList.add("hidden");
    newText.classList.remove("hidden");
    newText.focus();
});
ItemList.addEventListener("click", (e) => {
    const actable = e.target.getAttribute("actable");
    if (actable !== "Y") {
        e.preventDefault();
        return;
    }

    if (["span", "div"].includes(e.target.tagName.toLowerCase())) {
        let div;
        if (e.target.tagName.toLowerCase() === "span") div = e.target.parentElement;
        else if (e.target.tagName.toLowerCase() === "div") div = e.target;
        const currentText = div.querySelector(`input[type="text"]`);
        div.querySelector(`span`).classList.add("hidden");
        currentText.classList.remove("hidden");
        currentText.focus();
    }
    else if (["button"].includes(e.target.tagName.toLowerCase())) {
        const btnType = e.target.getAttribute("btnType");
        if (btnType === "remove") {
            const row = e.target.parentElement.parentElement;

            const rowType = row.getAttribute("rowType");
            if (rowType === "multirow") {
                const rowIdx = row.getAttribute("idx");
                const children = ItemList.querySelectorAll(`[rowType="sub"][parentidx="${rowIdx}"]`);
                for (const subRow of children) subRow.remove();
            }
            row.remove();
        }
    }
});
ItemList.addEventListener("focusout", (e) => {

    const actable = e.target.getAttribute("actable");
    if (actable !== "Y") {
        e.preventDefault();
        return;
    }

    if (["input"].includes(e.target.tagName.toLowerCase())) {
        let div = e.target.parentElement;
        const currentText = div.querySelector(`input[type="text"]`);
        const currentSpan = div.querySelector(`span`);
        currentSpan.textContent = currentText.value;
        currentText.classList.add("hidden");
        currentSpan.classList.remove("hidden");
    }
});
ItemList.addEventListener("keyup", function (e) {

    const actable = e.target.getAttribute("actable");
    if (actable !== "Y" || !(e.keyCode == 13 || e.keyCode == 27)) {
        e.preventDefault();
        return;
    }

    if (["input"].includes(e.target.tagName.toLowerCase())) {
        let div = e.target.parentElement;
        const currentText = div.querySelector(`input[type="text"]`);
        const currentSpan = div.querySelector(`span`);

        if (e.keyCode == 13)
        {
            currentSpan.textContent = currentText.value;
        }
        else if (e.keyCode == 27)
        {
            currentText.value = currentSpan.textContent;
        }
        currentText.classList.add("hidden");
        currentSpan.classList.remove("hidden");
    }
});
const parseItemListToEntity = () => {
    // row tbody
    const rowList = ItemList.querySelectorAll(".row");
    let Xml = "";
    Xml += `<${constRootNodeName}>`;
    for (const row of rowList) {
        const rowType = row.getAttribute("rowType");
        if (rowType === "sub" || rowType === "head") continue;
        const id = row.querySelector(".td1 span").textContent;
        const name = row.querySelector(".td2 span").textContent;
        let thisnode = "";
       
        thisnode += `<${id}`
        if (rowType === "multirow")
        {
            thisnode += ` name="${name}">`;
            const rowIdx = row.getAttribute("idx");
            const children = ItemList.querySelectorAll(`[rowType="sub"][parentidx="${rowIdx}"]`);
            for (const subRow of children)
            {
                const subid = subRow.querySelector(".td1 span").textContent;
                const subname = subRow.querySelector(".td2 span").textContent;
                const subnode = subid.replace("$","");
                thisnode += `<${subnode} pattern="${subid}">${subname}</${subnode}>`;
            }
        }
        else thisnode += `>${name}`;        
        thisnode += `</${id}>`;
        Xml += thisnode;
    }

    Xml += `</${constRootNodeName}>`;

    return parseXmlToEntity(Xml);
}
const clearItemList = () => {
    for (const row of ItemList.querySelectorAll(".row"))
    {
        const attr = row.getAttribute("rowType");
        if (attr === "head") continue;
        row.remove();
    }
}
const parseEntityToItemList = (entity) => {
    let rootNode;
    if (entity.tagName != null && entity.tagName.toLowerCase() === constRootNodeName) rootNode = entity;
    else rootNode = entity.querySelector(constRootNodeName);
    if (rootNode == null || rootNode.length <= 0 || rootNode === undefined) return;

    clearItemList();
    let idx = 1;
    for (const childNode of rootNode.childNodes) {
        childNode.setAttribute("idx", idx);
        // Multirow인 경우
        if (0 < childNode.children.length) {
            ItemList.appendChild(makeRow(childNode, "multirow"));

            let subIdx = 1;
            for (const grandChild of childNode.children) {
                grandChild.setAttribute("parentIdx", idx);
                grandChild.setAttribute("idx", subIdx);
                ItemList.appendChild(makeRow(grandChild, "sub"));
                subIdx++;
            }
        }
        else ItemList.appendChild(makeRow(childNode));
        idx++;
    }
}
const makeRow = (node, type = "") => {
    const makeDefaultCol = (className, type) => {
        const col = document.createElement("div");
        col.classList.add("column", className);
        if (type === "option") {
            const defaultButton = (title, textContent, btnType) => {
                const btn = document.createElement("button");
                btn.setAttribute("title", title);
                btn.setAttribute("actable", "Y");
                btn.setAttribute("btnType", btnType);
                btn.textContent = textContent;
                return btn;
            }
            col.appendChild(defaultButton("삭제", "-", "remove"));
            //col.appendChild(defaultButton("하위추가", "ㄴ", "addSub"));
        }
        else {
            const span = document.createElement("span");
            const text = document.createElement("input");
            span.setAttribute("actable", "Y");
            text.setAttribute("type", "text");
            text.setAttribute("spellcheck", "false");
            text.setAttribute("actable", "Y");
            text.classList.add("hidden");
            col.appendChild(span);
            col.appendChild(text);
            col.setAttribute("actable", "Y");
        }
        return col;
    }

    const row = document.createElement("div");
    row.classList.add("row");
    row.setAttribute("rowType", type);

    const td1 = makeDefaultCol("td1");
    const td2 = makeDefaultCol("td2");
    const td3 = makeDefaultCol("td3", "option");

    if (node != null && node !== undefined) {
        for (const attr of node.attributes) if (["idx", "parentIdx"].includes(attr.name)) row.setAttribute(attr.name, attr.value);

        let colIdValue = "";
        let colNameValue = "";

        colIdValue = node.tagName;
        colNameValue = node.innerHTML;

        if (type === "multirow") {
            colNameValue = node.getAttribute("name");
        }
        else if (type === "sub") {
            colIdValue = node.getAttribute("pattern");
        }

        td1.querySelector("span").textContent = colIdValue;
        td1.querySelector(`input[type="text"]`).value = colIdValue;

        td2.querySelector("span").textContent = colNameValue;
        td2.querySelector(`input[type="text"]`).value = colNameValue;
    }

    [td1, td2, td3].forEach(td => { row.appendChild(td); });

    return row;
}
const cleanStringForXml = (str) => {
    const regex_text1 = />[\s\t\n]+/;
    const regex1 = new RegExp(regex_text1);
    while (regex1.test(str)) str = str.replace(regex_text1, ">");
    const regex_text2 = /[\s\t\n]+</;
    const regex2 = new RegExp(regex_text2);
    while (regex2.test(str)) str = str.replace(regex_text1, "<");

    return str;
}
const parseXmlToEntity = (xmlString) => {
    xmlString = cleanStringForXml(xmlString);
    const parser = new DOMParser();
    let currentXmlEntity = parser.parseFromString(xmlString, "text/xml");
    return currentXmlEntity;
}
// 구성된 엔티티 텍스트 에어리어용으로
const parseEntityToTextarea = (entity) => {
    let rootNode;
    if (entity.tagName != null && entity.tagName.toLowerCase() === constRootNodeName) rootNode = entity;
    else rootNode = entity.querySelector(constRootNodeName);
    if (rootNode == null || rootNode.length <= 0 || rootNode === undefined) return;
    const constSpace4 = "    ";
    const constDown = "\n";
    let xmlString = "";
    xmlString += `<${rootNode.tagName}>${constDown}`;
    //let isFist = false;
    for (const childNode of rootNode.childNodes) {
        // Multirow인 경우
        if (0 < childNode.children.length) {
            let attributesText = "";
            for (attr of childNode.attributes) attributesText += ` ${attr.name}="${attr.value}"`;
            xmlString += `${constSpace4}<${childNode.tagName}${attributesText}>${constDown}`;
            for (const grandChild of childNode.children) xmlString += `${constSpace4 + constSpace4 + grandChild.outerHTML + constDown}`;
            xmlString += `${constSpace4}</${childNode.tagName}>${constDown}`;;
        }
        else
            xmlString += `${constSpace4 + childNode.outerHTML + constDown}`;
    }
    xmlString += `</${rootNode.tagName}>`;
    item_xml.value = xmlString;
}
const initPage = () => {
    const hdnFormName = document.querySelector("#hdnFormName");
    const hdnRevisionList = document.querySelector("#hdnRevisionList");
    const formName = document.querySelector("#formName");
    formName.textContent = hdnFormName.value;
    const revisionList = JSON.parse(hdnRevisionList.value);
    const selectVersion = document.querySelector("#selectVersion");
    let isFirst = true;
    let thisRevision = "";
    for (let data of revisionList) {
        const option = document.createElement("option");
        option.value = data.revision;
        // isFirst
        let addonText = "";
        if (isFirst) {
            addonText = " (최신)";
            isFirst = false;
            thisRevision = data.revision;
        }
        
        option.setAttribute("custom_state",data.custom_state);
        option.textContent = data.revision + addonText;
        selectVersion.appendChild(option);
    }


    setRevision(thisRevision);
}



document.addEventListener("DOMContentLoaded", initPage);

