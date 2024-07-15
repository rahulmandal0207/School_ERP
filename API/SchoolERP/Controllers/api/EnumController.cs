using SchoolClasses;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/enum")]
    public class EnumController : ApiController
    {
        public class StatusModel
        {
            public int Key { get; set; }
            public string Value { get; set; }
        }

        [HttpPost]
        [Route("GenderList")]
        public ExpandoObject GenderList()
        {
            dynamic Response = new ExpandoObject();
            try
            {
                var list = new List<StatusModel>();
                var data = Enum.GetValues(typeof(Gender)).Cast<Gender>().Select(x => (byte)x).ToList();
                data.ForEach(x => list.Add(new StatusModel { Key = x, Value = System.Text.RegularExpressions.Regex.Replace(Enum.GetName(typeof(Gender), x), "[A-Z]", " $0") }));
                Response.GenderList = list;
                Response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                Response.Message = ex.Message;
            }
            return Response;
        }
        [HttpPost]
        [Route("StatusList")]
        public ExpandoObject StatusList()
        {
            dynamic Response = new ExpandoObject();
            try
            {
                var list = new List<StatusModel>();
                var data = Enum.GetValues(typeof(Status)).Cast<Status>().Select(x => (byte)x).ToList();
                data.ForEach(x => list.Add(new StatusModel { Key = x, Value = System.Text.RegularExpressions.Regex.Replace(Enum.GetName(typeof(Status), x), "[A-Z]", " $0") }));
                Response.StatusList = list;
                Response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                Response.Message = ex.Message;
            }
            return Response;
        }

        [HttpPost]
        [Route("StaffTypeList")]
        public ExpandoObject StaffTypeList()
        {
            dynamic Response = new ExpandoObject();
            try
            {
                var list = new List<StatusModel>();
                var data = Enum.GetValues(typeof(StaffType)).Cast<StaffType>().Select(x => (byte)x).ToList();
                data.ForEach(x => list.Add(new StatusModel { Key = x, Value = System.Text.RegularExpressions.Regex.Replace(Enum.GetName(typeof(StaffType), x), "[A-Z]", " $0") }));
                Response.StaffTypeList = list;
                Response.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                Response.Message = ex.Message;
            }
            return Response;
        }

    }
}
