<%@ Page Language="C#" AutoEventWireup="true" CodeFile="list_column_mapping_master_exceldown.aspx.cs"
    Inherits="Approval_list_column_mapping_master_exceldown" %>

    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" lang="ko">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv='Pragma' content='no-cache' />
        <title>폼 데이터 다운로드</title>
        <link rel="stylesheet" href="/GWImages/common/css/approval_form.css" type="text/css" />
        <link rel="stylesheet"
            href="/Coviweb/common/script/jquery-ui-1.10.4/css/smoothness/jquery-ui-1.10.4.custom.css" />
        <link type="text/css" rel="stylesheet" href="calendar/datepickercontrol.css" />
        <link rel="stylesheet" href="assets/list.css" />
    </head>

    <body>
        <header class="top">
            <span class="top-title">폼 데이터 다운로드</span>
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
        <!-- 레이어 팝업 -  -->
        <div class="layerPop layerPop-FormInfo" style="display: none;">
            <div class="layerPop-Content">
                <div class="pop-title">
                    <span class="space-empty">&nbsp;</span>
                    <h2 class="fname">Concurring Review 신청</h2>
                    <button class="close-laypop bsbb mg-10px">X</button>
                </div>
                <dl class="dl-content">
                    <dt class="w100">유형</dt>
                    <dd class="csnm w480"></dd>
                </dl>
                <dl class="dl-content">
                    <dt class="w100">Form Prefix</dt>
                    <dd class="fmpf w480"></dd>
                </dl>
                <dl class="dl-content">
                    <dt class="w100">Description</dt>
                    <dd class="fmds w480" style="overflow: auto; line-height: 25px"></dd>
                </dl>
                <dl class="dl-content">
                    <dt class="w100">날짜선택</dt>
                    <dd class="form-data w480">
                        <input type="text" class="sDate datePicker" name="calendarField" />&nbsp;~&nbsp;<input
                            type="text" class="eDate datePicker" name="calendarField" />
                    </dd>
                </dl>                
                <button class="excel-down bsbb font-14px mg-10px">
                    <img src="/GwImages/BLUE/Covi/Common/btn/btn_icon01_excel.gif" alt="엑셀출력" />
                    <span class="btnText">엑셀출력</span>
                </button>
            </div>
            <div class="layerPop-Curtain"></div>
        </div>
        <!-- 레이어 팝업 - 로딩중 -->
        <div class="layerPop layerPop-loding">
            <div class="layerPop-Content">
                <img class="layerPop-Gif" src="/GwImages/Blue/Covi/Blog/Common/Images/loading2.gif" />
                <p class="p1">로딩중입니다.</p>
                <p>잠시만 기다려 주십시오.</p>
            </div>
            <div class="layerPop-Curtain"></div>
        </div>
        <script src="assets/xlsx.full.min.js"></script>
        <script src="assets/FileSaver.min.js"></script>
        <script src="assets/list.js"></script>
        <script src="assets/formDownload.js"></script>
        <script type="text/javascript" src="/Coviweb/common/script/jquery-ui-1.10.4/js/jquery-1.10.2.js"></script>
        <script type="text/javascript" language="javascript" src="calendar/datepickercontrol.js"></script>
        <script type="text/javascript"
            src="/Coviweb/common/script/jquery-ui-1.10.4/js/jquery-ui-1.10.4.custom.js"></script>
        <script>
            $.datepicker.regional['kr'] = {
                closeText: '닫기', // 닫기 버튼 텍스트 변경
                currentText: '오늘', // 오늘 텍스트 변경
                monthNames: ['1 월', '2 월', '3 월', '4 월', '5 월', '6 월', '7 월', '8 월', '9 월', '10 월', '11 월', '12 월'], // 개월 텍스트 설정
                monthNamesShort: ['1 월', '2 월', '3 월', '4 월', '5 월', '6 월', '7 월', '8 월', '9 월', '10 월', '11 월', '12 월'], // 개월 텍스트 설정
                dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'], // 요일 텍스트 설정
                dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'] // 요일 텍스트 축약 설정
            };

            $.datepicker.setDefaults($.datepicker.regional['kr']);
            $("input[name=calendarField]").datepicker({
                showOn: 'button',
                buttonImageOnly: true,
                buttonImage: "/GWImages/Common/icon/icon_calendar.gif",
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true,
                onSelect: function (dateText) {

                }
            }).on("change", function (event) {
                var dateValue = $(this).val();
                var dateTypeValue;

                if (dateValue.indexOf(" ") > -1) {
                    dateValue = dateValue.replace(/ /ig, "-");
                } else if (dateValue.indexOf(".") > -1) {
                    dateValue = dateValue.replace(/./ig, "-");
                }

                if (dateValue.length == 0) {
                    dateTypeValue = new Date();
                }
                else if (dateValue.length > 10) {
                    dateTypeValue = string2date(dateValue);
                }
                else {
                    var today = new Date();
                    var thisyaer = today.getFullYear();
                    var thismonth = today.getMonth() + 1;
                    if (thismonth < 10) thismonth = "0" + thismonth;

                    if (dateValue.length == 1) {
                        //한자리면 날짜
                        dateValue = thisyaer + "-" + thismonth + "-0" + dateValue;
                    }
                    else if (dateValue.length == 2) {
                        //두자라면 날짜
                        dateValue = thisyaer + "-" + thismonth + "-" + dateValue;
                    }
                    else if (dateValue.length == 3) {
                        //세자 : month 1, day 2
                        dateValue = thisyaer + "-0" + dateValue.substr(0, 1) + "-" + dateValue.substr(1, 2);
                    }
                    else if (dateValue.length == 4) {
                        // month 2, day 2
                        dateValue = thisyaer + "-" + dateValue.substr(0, 2) + "-" + dateValue.substr(2, 2);
                    }
                    else if (dateValue.length == 5) {
                        //yaer 2 month 1, day 2
                        dateValue = dateValue.substr(0, 2) + "-0" + dateValue.substr(2, 1) + "-" + dateValue.substr(3, 2);
                    }
                    else if (dateValue.length == 6) {
                        //yaer 2 month 2, day 2
                        dateValue = dateValue.substr(0, 2) + "-" + dateValue.substr(2, 2) + "-" + dateValue.substr(4, 2);
                    }
                    else if (dateValue.length == 7) {
                        //yaer 3 month 2, day 2
                        dateValue = dateValue.substr(0, 3) + "-" + dateValue.substr(3, 2) + "-" + dateValue.substr(5, 2);
                    }
                    else if (dateValue.length == 8) {
                        //yaer 4 month 2, day 2
                        dateValue = dateValue.substr(0, 4) + "-" + dateValue.substr(4, 2) + "-" + dateValue.substr(6, 2);
                    }
                    else {
                    }

                    dateTypeValue = string2date(dateValue);
                }

                $(this).datepicker('setDate', dateTypeValue);
            });
        </script>
        <div class="hidden">
            <iframe id="ifrCustom"></iframe>
        </div>
    </body>

</html>