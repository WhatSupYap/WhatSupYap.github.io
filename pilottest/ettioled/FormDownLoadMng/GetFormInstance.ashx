<%@ WebHandler Language="C#" Class="GetFormInstance" %>

using System;
using System.Web;
using System.Data;
using Covision.Framework;
using Covision.Framework.Data.Business;
using System.IO;
using System.Collections.Generic;

// /Approval/WebService/GetFormInstance.ashx
public class GetFormInstance : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";

        // string process_id = Injection.AvoidXMLInjection(context.Request.Params["pid"]);
        // string fmpf = Injection.AvoidXMLInjection(context.Request.Params["fmpf"]);

        if (null != context.Request.Headers["X-Custom-Mode"] && context.Request.Headers["X-Custom-Mode"] == "WebMethod")
        {
            string jsonString = "";
            using (StreamReader reader = new StreamReader(context.Request.InputStream))
            {
                jsonString = reader.ReadToEnd();
            }

            IDictionary<string, object> parsedJson = null;
            try { parsedJson = Json.JsonParser.FromJson(jsonString); } catch { }
            if (parsedJson != null && parsedJson.ContainsKey("fid") && parsedJson.ContainsKey("rvs"))
            {
                DataPack INPUT = new DataPack();
                Guid guid = new Guid(parsedJson["fid"].ToString());
                INPUT.add("@FORM_ID", guid);
                INPUT.add("@REVISION", parsedJson["rvs"]);
                //Guid guid = new Guid(parsedJson["fid"].ToString());

                DataSet ds = RunRetrieveDatabase(INPUT, "usp_wfform_data_select");

                Util.SerializeJson(ds);

                string rtn = Util.SerializeJson(ds);
        
                context.Response.Write(rtn);
                //Response.End();
            }
        }
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

            SqlDbAgent.ConnectionString = PageBase.AES_decrypt(Covision.Framework.Common.Configuration.ConfigurationApproval.ApprovalConfig(cs).ToString());
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


    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}