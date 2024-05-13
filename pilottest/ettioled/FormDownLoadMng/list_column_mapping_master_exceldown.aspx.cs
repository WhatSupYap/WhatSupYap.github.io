using Covision.Framework;
using Covision.Framework.Data.Business;
using NPOI.HSSF.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Approval_list_column_mapping_master_exceldown : PageBase
{
    protected StringBuilder tbody_list;
    protected StringBuilder button_list;

    protected void Page_Load(object sender, EventArgs e)
    {
        string connectionstring = string.Empty;//"INST_ConnectionString"
        string sp = string.Empty;
        DataPack INPUT = new DataPack();

        if (!IsPostBack)
        {
            button_list = new StringBuilder();
            tbody_list = new StringBuilder();

            connectionstring = "FORM_DEF_ConnectionString";
            sp = "usp_wfform_formlistquery01_admin";
            INPUT.add("@form_name", "");
            INPUT.add("@ent_code", "Deloitte");
            INPUT.add("@viewall", "T");

            DataSet ds = RunRetrieveDatabase(INPUT, sp, connectionstring);
            if (ds != null && ds.Tables.Count > 0)
            {
                //탭 타입
                if (ds.Tables[0].Rows.Count > 0 && ds.Tables[1].Rows.Count > 0)
                {
                    for (int index = 0; index < ds.Tables[0].Rows.Count; index++)
                    {
                        DataRow dr = ds.Tables[0].Rows[index];
                        //listTab.Add(string.Format("AddTab('{0}', '{1}', '{2}');", dr["CLASS_NAME"].ToString(), index, dr["CLASS_ID"].ToString()));

                        string CLASS_ID = dr["CLASS_ID"].ToString();
                        string tbid = "tbody" + index.ToString();
                        button_list.AppendLine("<li><button type=\"button\" class=\"nav1-tab\" tbid=\"" + tbid + "\" onclick=\"Tab_Click(this);\" cid=\"" + CLASS_ID + "\">" + dr["CLASS_NAME"].ToString() + "</button></li>");


                        DataRow[] drs = ds.Tables[1].Select("CLASS_ID = '" + CLASS_ID + "'");

                        tbody_list.AppendLine("<tbody id=\"" + tbid + "\" cid=\"" + CLASS_ID + "\">");
                        foreach (DataRow dr2 in drs)
                        {
                            string tr = "";
                            
                            // REVISION
                            tbody_list.AppendLine(
                                "<tr"
                                + " class=\"fmif\""
                                + " fmid=\"" + dr2["FORM_ID"].ToString() + "\""
                                + " csnm=\"" + dr["CLASS_NAME"].ToString() + "\""
                                + " fname=\"" + dr2["FORM_NAME"].ToString() + "\""
                                + " fmpf=\"" + dr2["FORM_PREFIX"].ToString() + "\""
                                + " fmds=\"" + dr2["FORM_DESC"].ToString() + "\""
                                + " rvs=\"" + dr2["REVISION"].ToString() + "\""
                                + ">"
                                + "<td>" + dr2["FORM_NAME"].ToString() + "</td>"
                                + "<td>" + dr2["FORM_PREFIX"].ToString() + "</td>"
                                + "<td>" + dr2["FORM_DESC"].ToString() + "</td>"
                                + "</tr>"
                                );
                        }
                        tbody_list.AppendLine("</tbody>");
                    }
                }
            }

            string tbody = "";

            tbody += "<tbody id=\"tbody1\">";
            tbody += "<tr><td class=\"fname\">탭2번</td><td>탭2번</td><td></td></tr>";
            tbody += "</tbody>";

        }
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
}