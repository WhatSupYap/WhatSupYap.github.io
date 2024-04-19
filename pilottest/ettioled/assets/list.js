document.addEventListener("DOMContentLoaded", () => {
    Tab_Click();
    hideLayerPop();
});

document.querySelector(".top-search-text").addEventListener("keydown", (e) => { if (e.key == "Enter" || e.keyCode == 13) { SearchText(); } });
document.querySelector(".top-search-button").addEventListener("click", (e) => { SearchText(); });


function hideLayerPop() {
    const layerPopList = document.querySelectorAll(".layerPop");
    for (let layerPop of layerPopList)
    {
        layerPop.style.display = "none";
    }
}

function Tab_Click(nav_button) {

    const nav_buttons = document.querySelectorAll(".nav1 button");

    if (xIsEmpty(nav_button)) nav_button = nav_buttons[0];

    const attr_tbid = "tbid";

    const target_tbody_id = nav_button.getAttribute(attr_tbid);
    const hide_list = document.querySelectorAll(".main-table tbody");
    for (var i = 0; i < hide_list.length; i++) {

        const current_id = hide_list[i].getAttribute("id");
        var display = "";
        if (target_tbody_id != current_id) display = "none";
        hide_list[i].style.display = display;
    }

    for (var i = 0; i < nav_buttons.length; i++) {
        const current_id = nav_buttons[i].getAttribute(attr_tbid);
        var css_class = "nav1-tab";
        if (target_tbody_id == current_id) {
            css_class = "nav1-tab-on";
        }
        nav_buttons[i].setAttribute("class", css_class);
    }

}

function SearchText() {
    const ctrl = document.querySelector(".top-search-text");
    const keyword = ctrl.value;

    // 키워드 없으면 리턴
    if (xIsEmpty(keyword)) return;

    const nav_button_result = document.querySelector(".nav1 button[keyword='" + keyword + "']");

    if (!xIsEmpty(nav_button_result)) {
        Tab_Click(nav_button_result);
        return;
    }

    const main_table = document.querySelector(".main-table");

    //debugger;

    //const main_table_td_fnames = main_table.querySelectorAll("td.fname");
    //for (var i = 0; i < main_table_td_fnames.length; i++) {
    //    if (0 <= main_table_td_fnames[i].innerText.replaceAll(" ", "").indexOf(keyword.replaceAll(" ", ""))) {
    //        new_tbody.appendChild(main_table_td_fnames[i].parentElement.cloneNode(true));
    //    }
    //}
    
    const new_tbody = document.createElement("tbody");    

    const main_table_tr_list = main_table.querySelectorAll("tr");

    for (const tr of main_table_tr_list) {
        const fname = tr.getAttribute("fname");
        if (fname === null) continue;
        if (0 <= fname.replaceAll(" ", "").indexOf(keyword.replaceAll(" ", ""))) {
            new_tbody.appendChild(tr.cloneNode(true));
        }
    }

    // 검색된게 없으면 리턴
    if (0 == new_tbody.querySelectorAll("tr").length) {

        const new_td = document.createElement("td");
        new_td.innerText = "검색 결과가 없습니다.";
        new_td.setAttribute("colspan", "3");
        new_td.setAttribute("class", "err_msg");
        new_tbody.appendChild(document.createElement("tr").appendChild(new_td));
    }
    else
    {
        for (let fmif of new_tbody.getElementsByClassName("fmif")) {
            fmif.addEventListener("click", () => tr_Click(fmif));
        }
    }

    const result_tbody = main_table.querySelectorAll("tbody[id^='new']");
    const new_id = "new_tbody" + (result_tbody.length + 1).toString();
    new_tbody.setAttribute("id", new_id);
    main_table.appendChild(new_tbody);
    const new_li = document.createElement("li");
    const new_button = document.createElement("button");
    new_button.setAttribute("type", "button");
    new_button.setAttribute("class", "nav1-tab");
    new_button.setAttribute("tbid", new_id);
    new_button.setAttribute("onclick", "Tab_Click(this);");
    new_button.setAttribute("keyword", keyword);
    new_button.innerText = "검색:" + keyword;
    new_li.appendChild(new_button);
    document.querySelector(".nav1").appendChild(new_li);

    Tab_Click(new_button);
}

function xIsEmpty(p) {
    if (typeof p === "undefined" || p == null) {
        return true;
    }
    else if (p.toString() === "") {
        return true;
    }
    return false;
}