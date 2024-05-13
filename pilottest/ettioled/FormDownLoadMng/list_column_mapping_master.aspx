<%@ Page Language="C#" AutoEventWireup="true" CodeFile="list_column_mapping_master.aspx.cs"
    Inherits="Approval_list_column_mapping_master" %>

    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" lang="ko">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv='Pragma' content='no-cache' />
        <title>폼 컬럼 마스터 관리</title>
        <link rel="stylesheet" href="/GWImages/common/css/approval_form.css" type="text/css" />
        <link rel="stylesheet" href="/Coviweb/common/script/jquery-ui-1.10.4/css/smoothness/jquery-ui-1.10.4.custom.css" />        
        <link type="text/css" rel="stylesheet" href="calendar/datepickercontrol.css" />
        <link rel="stylesheet" href="assets/list.css" />
    </head>

    <body>
        <header class="top">
            <span class="top-title">폼 컬럼 마스터 관리</span>
            <div class="top-search">
                <input type="text" class="top-search-text" />
                <button type="button" class="top-search-button">검색</button>
            </div>
        </header>
        <nav>
            <ul class="nav1">
                <%=button_list.ToString() %>
            </ul>
        </nav>
        <main>
            <table class="main-table">
                <colgroup>
                    <col style="width: 25%" />
                    <col style="width: 25%" />
                    <col style="width: 50%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>Form Name</th>
                        <th>Form Prefix</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <%=tbody_list.ToString() %>
            </table>
        </main>
        <!-- 레이어 팝업 - 로딩중 -->
        <div class="layerPop layerPop-loding">
            <div class="layerPop-Content">
                <img class="layerPop-Gif" src="/GwImages/Blue/Covi/Blog/Common/Images/loading2.gif"/>
                <p class="p1">로딩중입니다.</p>
                <p>잠시만 기다려 주십시오.</p>
            </div>
            <div class="layerPop-Curtain"></div>
        </div>
        <script src="assets/list.js"></script>        
        <script>

            for (let fmif of document.querySelectorAll("tr.fmif")) {
                fmif.addEventListener("click", () => tr_Click(fmif));
            }

            const tr_Click = (tr) => {
                window.open("./popup_column_mapping_master.aspx?fid=" + tr.getAttribute("fmid"), "SettingAppLine", "height=800; width=1150; status=no; resizable=no; help=no;");
            }
        </script>
    </body>
    </html>
