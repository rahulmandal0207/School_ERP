using SchoolClasses;
using System;
using System.Dynamic;
using System.Linq;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/Designation")]
    public class DesignationController : ApiController
    {
        [HttpPost]
        [Route("DesignationList")]
        public ExpandoObject DesignationList(Designation model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.Designations
                           where (model.DesignationId == d1.DesignationId || model.DesignationId == 0)
                           && (model.Status == d1.Status || model.Status == 0)
                           orderby d1.DesignationName
                           select new
                           {
                               d1.DesignationId,
                               d1.DesignationName,
                               d1.Status,
                               StatusName = Enum.GetName(typeof(Status), d1.Status),
                           };

                ResponseMessage.DesignationList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("saveDesignation")]
        public ExpandoObject SaveDesignation(Designation model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Designation Designation = null;
                if (model.DesignationId > 0)
                    Designation = dataContext.Designations.Where(x => x.DesignationId == model.DesignationId).First();
                else
                    Designation = new Designation();
                Designation.DesignationName = model.DesignationName;
                Designation.Status = model.Status;

                if (Designation.DesignationId == 0)
                    dataContext.Designations.InsertOnSubmit(Designation);
                dataContext.SubmitChanges();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("IX"))
                    ResponseMessage.Message = "This record is already exist";
                else
                    ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("deleteDesignation")]
        public ExpandoObject DeleteDesignation(Designation model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var Designation = dataContext.Designations.Where(x => x.DesignationId == model.DesignationId).First();
                dataContext.Designations.DeleteOnSubmit(Designation);
                dataContext.SubmitChanges();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("FK"))
                    ResponseMessage.Message = "This record is in use.so can't delete.";
                else
                    ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }
    }
}
