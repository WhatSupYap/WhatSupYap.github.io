using Covision.Framework.Data.Business;
using System;
using System.Collections.Specialized;
using System.Data;
using System.Web;
using System.Xml;
using System.Text;
using Covision.Framework;

public partial class Approval_FormDownLoadMng_excelcustom : WebPartsPageBase
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                string prefix = "p";
                string revision = "r";
                string startDate = "sd";
                string endDate = "ed";

                NameValueCollection qs = Request.QueryString;

                if (qs[prefix] == null || qs[revision] == null)
                {
                    throw new Exception("파마리터 없음");
                }
                int iRevision = -1;
                if(!int.TryParse(qs[revision], out iRevision) || iRevision < 0)
                {
                    throw new Exception("버젼정보 비정상");
                }

                const string tableNameFormat = "WF_FORM_INSTANCE_{0}__V{1}";
                string tableName = string.Format(tableNameFormat, qs[prefix], qs[revision]);

                DownExcel(tableName.ToUpper());
            }
        }
        catch (Exception ex)
        {
            HttpContext.Current.Response.Write("<script>alert(\"조회에 실패하였습니다.\");</script>");
            HttpContext.Current.Response.End();
        }
    }

    /// <summary>
    /// 테이블 명으로 엑셀 다운로드
    /// </summary>
    /// <param name="tableName"></param>
    public void DownExcel(string tableName)
    {
        StringBuilder sbSheet = new StringBuilder();
        string FileName = "";
        string Query = "";
        XmlDocument xdoc;
        const string table_start = "<table>";
        const string table_end = "</table>";
        const string tr_start = "<tr xmlns:msxsl='urn:schemas-microsoft-com:xslt' xmlns:cfxsl='urn:cfxsl' xmlns:cfutil='urn:cfxsl'>";
        const string tr_end = "</tr>";
        const string td_start = "<td valign='top'>";
        const string td_end = "</td>";

        string[] HeaderList = new string[0];

        sbSheet.Append(table_start);

        if (tableName == "WF_FORM_INSTANCE_TEST__V0")
        {
            // 파일명
            FileName = "경조금";
            //--------------------------------------------------------------------------------
            // 해더
            //--------------------------------------------------------------------------------
            HeaderList = new string[] { "사번", "기안자", "UNIT NAME", "기안일", "문서번호", "요청일" };
            sbSheet.Append(tr_start); foreach (string Header in HeaderList) sbSheet.Append(td_start + Header + td_end); sbSheet.Append(tr_end);
            //--------------------------------------------------------------------------------
            // 본문
            //--------------------------------------------------------------------------------
            // 쿼리
            Query = "SELECT distinct top 10 f.form_inst_id,F.INITIATOR_ID, A.DISPLAY_NAME, UNIT_NAME, F.INITIATED_DATE, F.DOC_NO,	f.BODY_CONTEXT FROM  WF_FORM_INSTANCE_WF_KYUNGJOGUM_REQ__V0 f WITH(NOLOCK)  INNER JOIN COVI_FLOW_INST_ARCHIVE.dbo.WF_PROCESS t3 WITH(NOLOCK) ON f.FORM_INST_ID = t3.FORM_INST_ID   LEFT JOIN COVI_GROUPWARE.dbo.ORG_PERSON AS A WITH (NOLOCK)ON F.INITIATOR_ID = A.PERSON_CODE WHERE  t3.DELETE_FLAG = 'N'  AND t3.BUSINESS_STATE LIKE '02_01%'";
            xdoc = GetXdocByDataSet(GetDataSetByQuery(Query));
            // 바디 구성
            foreach (XmlNode row in xdoc.DocumentElement.ChildNodes)
            {
                sbSheet.Append(tr_start);
                sbSheet.Append(td_start + GetValueByTagName(row, "INITIATOR_ID") + td_end);
                sbSheet.Append(td_start + GetValueByTagName(row, "DISPLAY_NAME") + td_end);
                sbSheet.Append(td_start + GetValueByTagName(row, "UNIT_NAME") + td_end);
                sbSheet.Append(td_start + GetValueByTagName(row, "INITIATED_DATE") + td_end);
                sbSheet.Append(td_start + GetValueByTagName(row, "DOC_NO") + td_end);
                sbSheet.Append(td_start + GetValueByTagName(row, "request_date") + td_end);
                sbSheet.Append(tr_end);
            }
        }
        else if (tableName == "WF_FORM_INSTANCE_TEST__V1")
        {
            // 파일명
            FileName = "경조금";
            //--------------------------------------------------------------------------------
            // 해더
            //--------------------------------------------------------------------------------
            HeaderList = new string[] { "사번", "기안자", "UNIT NAME", "기안일", "문서번호", "요청일" };
            sbSheet.Append(tr_start); foreach (string Header in HeaderList) sbSheet.Append(td_start + Header + td_end); sbSheet.Append(tr_end);
            //--------------------------------------------------------------------------------
            // 본문
            //--------------------------------------------------------------------------------
            // 쿼리
            Query = "SELECT distinct top 10 f.form_inst_id,F.INITIATOR_ID, A.DISPLAY_NAME, UNIT_NAME, F.INITIATED_DATE, F.DOC_NO,	f.BODY_CONTEXT FROM  WF_FORM_INSTANCE_WF_KYUNGJOGUM_REQ__V0 f WITH(NOLOCK)  INNER JOIN COVI_FLOW_INST_ARCHIVE.dbo.WF_PROCESS t3 WITH(NOLOCK) ON f.FORM_INST_ID = t3.FORM_INST_ID   LEFT JOIN COVI_GROUPWARE.dbo.ORG_PERSON AS A WITH (NOLOCK)ON F.INITIATOR_ID = A.PERSON_CODE WHERE  t3.DELETE_FLAG = 'N'  AND t3.BUSINESS_STATE LIKE '02_01%'";
            xdoc = GetXdocByDataSet(GetDataSetByQuery(Query));
            // 바디 구성
            foreach (XmlNode row in xdoc.DocumentElement.ChildNodes)
            {
                int multicnt = 3;
                for (int i = 0; i < multicnt; i++)
                {
                    sbSheet.Append(tr_start);
                    sbSheet.Append(td_start + GetValueByTagName(row, "INITIATOR_ID") + td_end);
                    sbSheet.Append(td_start + GetValueByTagName(row, "DISPLAY_NAME") + td_end);
                    sbSheet.Append(td_start + GetValueByTagName(row, "UNIT_NAME") + td_end);
                    sbSheet.Append(td_start + GetValueByTagName(row, "INITIATED_DATE") + td_end);
                    sbSheet.Append(td_start + GetValueByTagName(row, "DOC_NO") + td_end);
                    sbSheet.Append(td_start + GetValueByTagName(row, "request_date") + td_end);
                    // 멀티로우 차별점
                    sbSheet.Append(td_start + GetValueByTagName(row, "dynamic_" + (i + 1).ToString()) + td_end);
                    sbSheet.Append(tr_end);
                }
            }
        }
        else
        {
            throw new Exception("등록된 테이블 없음");
        }


        sbSheet.Append(table_end);

        HttpContext.Current.Response.ContentType = "application/vnd.ms-excel";
        HttpContext.Current.Response.AddHeader("Content-Disposition", string.Format("attachment;filename={0}", FileName + "_" + DateTime.Now.ToString("yyyyMMddHHmmss")  + ".xls"));
        HttpContext.Current.Response.BufferOutput = false;
        // BOM 추가 *****
        HttpContext.Current.Response.BinaryWrite(new byte[] { 0xEF, 0xBB, 0xBF });
        // 내용 추가
        HttpContext.Current.Response.BinaryWrite(Encoding.UTF8.GetBytes(sbSheet.ToString()));
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.Close();
        HttpContext.Current.Response.End();
    }


    #region 유틸성 메소드
    /// <summary>
    /// xPath를 이용한 노드 조회
    /// </summary>
    /// <param name="parent">부모노드</param>
    /// <param name="id">ID</param>
    /// <returns></returns>
    private string GetValueByTagName(XmlNode parent, string id)
    {
        string rtn = "";
        XmlNode xn = parent.SelectSingleNode(id);
        if (xn != null) rtn = xn.InnerXml;
        return rtn;
    }
    /// <summary>
    /// 쿼리로 DataSet 조회
    /// </summary>
    /// <param name="Query">쿼리</param>
    /// <returns></returns>
    private DataSet GetDataSetByQuery(string Query)
    {
        DataSet ds;
        DataPack INPUT = null;

        using (SqlDacBase SqlDbAgent = new SqlDacBase())
        {
            SqlDbAgent.ConnectionString = "Initial Catalog=COVI_FLOW_FORM_INST;Data Source=KRSELAOPPRODDB,48349;User id=GWUSER;password=euz5CLQW^ii!3kLN*1_7";
            ds = SqlDbAgent.ExecuteDataSet(CommandType.Text, Query, INPUT);
        }

        return ds;
    }
    /// <summary>
    /// DataSet으로 Xml구성, BODY_CONTEXT 있어야함
    /// </summary>
    /// <param name="ds">DataSet</param>
    /// <returns></returns>
    private XmlDocument GetXdocByDataSet(DataSet ds)
    {
        const string rootName = "BODY_CONTEXT";
        XmlDocument xdoc = new XmlDocument();
        XmlNode root = xdoc.CreateElement(rootName);

        int i = 1;
        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            XmlNode xrow = xdoc.CreateElement("row" + i.ToString());

            foreach (DataColumn dc in ds.Tables[0].Columns)
            {
                if (dc.ColumnName == rootName)
                {
                    XmlDocument BODY_CONTEXT = new XmlDocument();
                    BODY_CONTEXT.LoadXml(dr[dc.ColumnName].ToString());
                    foreach (XmlNode xnbc in BODY_CONTEXT.FirstChild.ChildNodes)
                    {
                        xrow.AppendChild(xdoc.ImportNode(xnbc, true));
                    }
                }
                else
                {
                    XmlNode xn = xdoc.CreateElement(dc.ColumnName);
                    xn.InnerText = dr[dc.ColumnName].ToString();
                    xrow.AppendChild(xn);
                }
            }
            i++;
            root.AppendChild(xrow);
        }
        xdoc.AppendChild(root);

        return xdoc;
    }
    #endregion

}