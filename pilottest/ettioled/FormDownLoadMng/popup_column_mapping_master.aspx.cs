using Covision.Framework;
using Covision.Framework.Data.Business;
using DocumentFormat.OpenXml.Spreadsheet;
using ITRequestCls;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

public partial class Approval_popup_column_mapping_master : PageBase
{
    protected const string constRootNodeName = "column_mapping";
    protected const string constPrefixHdnOrigin = "hdnOrigin_";
    protected const string constPrefixHdnNew = "hdnNew_";
    protected const string constCtrlEditedList = "hdn_e_l";
    protected const string constIdHdnRevisionList = "hdnRevisionList";
    protected const string constCNDS = "default-settings";
    protected const string constSeparator = ",";
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            string fid = PageBase.AvoidCrosssiteScripting(Request.QueryString["fid"]);

            if (string.IsNullOrEmpty(fid)) new Exception("form ID 없음");

            if (!IsPostBack)
            {
                InitPage(fid);
            }

            // 아래 구문은 필수다. 참고: https://m.blog.naver.com/leeom/70074257641
            Page.DataBind();
        }
        catch (Exception ex)
        {
            HttpContext.Current.Response.Write("<script>alert(\"" + ex.Message + "\")</script>");
            //HttpContext.Current.Response.Write("<script>alert(\"" + "오류가 발생하였습니다." + "\");</script>");
            HttpContext.Current.Response.End();
        }
    }

    private void InitPage(string fid)
    {
        AddHidden("hdnFormID", fid);

        DataPack INPUT = new DataPack();

        Guid guid = new Guid(fid);

        INPUT.add("@FORM_ID", guid);

        DataSet ds = RunRetrieveDatabase(INPUT, "usp_wfform_formcolumn");
        if (ds != null && 2 <= ds.Tables.Count)
        {
            List<string> revisionList = new List<string>();

            string cn_revision = "revision";
            string cn_custom_state = "custom_state";
            DataTable dt = new DataTable();
            dt.Columns.Add(cn_revision);
            dt.Columns.Add(cn_custom_state);


            
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                DataRow dr = ds.Tables[0].Rows[i];

                if (i == 0)
                {
                    AddHidden("hdnFormName", dr["FORM_NAME"].ToString());
                }

                string revision = dr["REVISION"].ToString();
                string custom_statue = "1";                

                foreach (DataRow dr2 in ds.Tables[1].Select("REVISION = '" + revision + "'"))
                {
                    custom_statue = dr2["CUSTOM_STATE"].ToString();
                    string body_default = dr2["BODY_DEFAULT"].ToString();                    
                    if (!string.IsNullOrEmpty(body_default))
                    {
                        AddHidden(constPrefixHdnOrigin + revision, body_default, new Dictionary<string, string>() { { "revision", revision } });
                    }
                    break;
                }

                DataRow dr3 = dt.NewRow();
                dr3[cn_revision] = revision;
                dr3[cn_custom_state] = custom_statue;
                dt.Rows.Add(dr3);
            }

            AddHidden(constIdHdnRevisionList, Util.SerializeJson(dt));

        }
        else
        {
            throw new Exception("폼 검색 결과가 없습니다.");
        }
    }

    /// <summary>
    /// 폼에 히든필드 추가
    /// </summary>
    /// <param name="id">ID</param>
    /// <param name="value">값</param>
    private void AddHidden(string id, string value)
    {
        Dictionary<string, string> attrList = new Dictionary<string, string>();
        AddHidden(id, value, attrList);
    }

    /// <summary>
    /// 폼에 히든필드 추가
    /// </summary>
    /// <param name="id">ID</param>
    /// <param name="value">값</param>
    /// <param name="attrList">속성값들</param>
    private void AddHidden(string id, string value, Dictionary<string, string> attrList)
    {
        HtmlInputHidden hdn = new HtmlInputHidden();
        hdn.ID = id;
        hdn.Value = value;
        foreach (string key in attrList.Keys) hdn.Attributes.Add(key, attrList[key]);
        hdn.Attributes.Add("class", constCNDS);
        form1.Controls.Add(hdn);

    }

    protected DataSet RunRetrieveDatabase(DataPack INPUT, string sp)
    {
        string connectionstring = "FORM_DEF_ConnectionString";
        return RunRetrieveDatabase(INPUT, sp, connectionstring);
    }

    protected DataSet RunRetrieveDatabase(DataPack INPUT, string sp, string cs)
    {
        DataSet result = null;
        SqlDacBase SqlDbAgent = null;
        try
        {
            SqlDbAgent = new SqlDacBase();

            SqlDbAgent.ConnectionString = AES_decrypt(Covision.Framework.Common.Configuration.ConfigurationApproval.ApprovalConfig(cs).ToString());
            result = SqlDbAgent.ExecuteDataSet(CommandType.StoredProcedure, sp, INPUT);
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            if (SqlDbAgent != null)
            {
                SqlDbAgent.Dispose();
            }
        }
        return result;
    }

    protected void btnSave_Click(object sender, EventArgs e)
    {
        try
        {
            string hdn_list = Request.Form[constCtrlEditedList];
            string fid = PageBase.AvoidCrosssiteScripting(Request.QueryString["fid"]);

            var jsonobject = Json.JsonParser.FromJson(hdn_list);
            List<object> list = (List<object>)jsonobject["list"];

            DataPack INPUT = null;//new DataPack();
            foreach (Dictionary<string, object> item in list)
            {
                string revision = item["r"].ToString();
                string custom_state = item["c"].ToString();
                if (string.IsNullOrEmpty(revision)) continue;
                if (string.IsNullOrEmpty(custom_state)) continue;

                // @CUSTOM_STATE 0 = true 1 = false
                string xml = "";
                if (custom_state == "0")
                {
                    xml = Request.Form[constPrefixHdnNew + revision];
                    xml = xml.Replace("&lt;", "<").Replace("&gt;", ">");
                }
                

                INPUT = new DataPack();
                Guid guid = new Guid(fid);

                INPUT.add("@FORM_ID", guid);
                INPUT.add("@REVISION", int.Parse(revision));
                INPUT.add("@CUSTOM_STATE", custom_state);
                INPUT.add("@BODY_DEFAULT", xml);
                INPUT.add("@PERSON_CODE", Sessions.PERSON_CODE);
                /*
                    @FORM_ID uniqueidentifier
                    , @REVISION     INT
                    , @BODY_DEFAULT NTEXT
                    , @PERSON_CODE  NVARCHAR(50)
                */

                DataSet ds = RunRetrieveDatabase(INPUT, "usp_wfform_formcolumn_insert");

            }

            InitPage(fid);

            HttpContext.Current.Response.Write("<script>alert(\"" + "저장완료" + "\");document.location.href = document.location.href;</script>");
            HttpContext.Current.Response.End();
        }
        catch (ThreadAbortException)
        {

        }
        catch (Exception ex)
        {
            //HttpContext.Current.Response.Write("<script>alert(\"" + "오류가 발생하였습니다." + "\")</script>");
            HttpContext.Current.Response.Write("<script>alert(\"" + ex.Message + " / " + ex.StackTrace.Replace("\r\n","<br>") + "\")</script>");
            HttpContext.Current.Response.End();
        }
    }
}