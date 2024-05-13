<%@ Page Language="C#" AutoEventWireup="true" CodeFile="popup_column_mapping_master.aspx.cs"
    Inherits="Approval_popup_column_mapping_master" %>

    <!DOCTYPE html>
    <html lang="ko">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv='Pragma' content='no-cache' />
        <title>폼 컬럼 마스터 상세</title>
        <link rel="stylesheet" href="assets/popup.css" />
    </head>

    <body>
        <div style="display:none;">
            <form runat="server" id="form1">
                <asp:Button runat="server" ID="btnSave" OnClick="btnSave_Click" />
            </form>
        </div>
        <main>
            <header class="flex-sbetween-center">
                <h1>폼 컬럼 마스터 상세 - <span id="formName"></span></h1>
            </header>
            <nav class="flex-sbetween-center side-padding">
                <div id="div-version">
                    <strong>버젼관리</strong>
                    <select id="selectVersion">
                    </select>
                    <strong>커스텀</strong>
                    <input type="checkbox" id="chkCustom">
                </div>
                <div id="div-buttons">
                    <button id="save-form">저장</button>
                    <button id="cancel-form">닫기</button>
                </div>
            </nav>
            <section class="content">
                <div id="divColumnList" class="flex-center-center">
                    <div class="item">
                        <strong class="flex-sbetween-center" style="display: inline;">폼 컬럼 리스트</strong>
                        <button id="add-row"
                            style="height: 20px; box-sizing: border-box; font-size: 12px; float: right; margin-right: 20px;">행추가</button>
                        <div class="item_detail">
                            <div class="row" rowType="head">
                                <div class="column th1">컬럼ID ( col_$ = col_1, col_2 ... )</div>
                                <div class="column th2">컬럼명</div>
                                <div class="column th3">옵션</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="divParsing" class="flex-center-center">
                    <ul>
                        <li>
                            <button id="parse-2-grid">◀</button>
                        </li>
                        <li>
                            <button id="parse-2-xml">▶</button>
                        </li>
                    </ul>
                </div>
                <div id="divTextarea" class="flex-center-center">
                    <div class="item">
                        <strong class="flex-sbetween-center">폼 컬럼 리스트 XML</strong>
                        <textarea id="item_xml" class="item_detail" spellcheck="false"></textarea>
                    </div>
                </div>
            </section>
        </main>
        <footer class="flex-sbetween-center side-padding">
            <span>
                <button id="import-excel">엑셀 불러오기</button>
                <button id="down-excel-sample">엑셀 업로드 샘플</button>
            </span>
            <div style="display: none;">
                <input type="file" id="excel-file" onchange="inportExcel(event)" />
            </div>
            <span>&nbsp;</span>
        </footer>
        <script src="assets/xlsx.full.min.js"></script>
        <script src="assets/FileSaver.min.js"></script>
        <script>

            const constClassNameColId = "col-id";
            const constClassNameColName = "col-name";
            const constClassNameColOption = "col-option";
            const constRootNodeName = "<%#constRootNodeName%>";
            const constTextMinus = "-";
            const constTextUp = "▲";
            const constTextDown = "▼";
            const constPrefixHdnNew = "<%#constPrefixHdnNew%>";
            const constPrefixHdnOrigin = "<%#constPrefixHdnOrigin%>";
            const constCtrlEditedList = "<%#constCtrlEditedList%>"
            const constCNDS = "<%#constCNDS%>" // Class Name Default Settings
            const constSeparator = "<%#constSeparator%>";

        </script>
        <script src="assets/formColumnMapping.js"></script>
    </body>

    </html>