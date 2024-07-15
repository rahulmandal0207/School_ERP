using SchoolClasses;
using System;
using System.Dynamic;
using System.Linq;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/Session")]
    public class SessionController : ApiController
    {
        [HttpPost]
        [Route("SessionList")]
        public ExpandoObject SessionList(Session model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.Sessions
                           where (model.SessionId == d1.SessionId || model.SessionId == 0)
                           && (model.Status == d1.Status || model.Status == 0)
                           orderby d1.SessionName
                           select new
                           {
                               d1.SessionId,
                               d1.SessionName,
                               d1.SessionStartDate,
                               d1.SessionEndDate,
                               d1.Status,
                               StatusName = Enum.GetName(typeof(Status), d1.Status)
                           };

                ResponseMessage.SessionList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("saveSession")]
        public ExpandoObject SaveSession(Session model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Session Session = null;
                if (model.SessionId > 0)
                {
                    Session = dataContext.Sessions.Where(x => x.SessionId == model.SessionId).First();
                    Session.UpdatedBy = model.UpdatedBy;
                    Session.UpdatedDate = DateTime.Now;
                }
                else
                    Session = new Session();

                Session.SessionName = model.SessionName;
                Session.SessionStartDate = model.SessionStartDate;
                Session.SessionEndDate = model.SessionEndDate;
                Session.Status = model.Status;

                if (Session.SessionId == 0)
                    dataContext.Sessions.InsertOnSubmit(Session);
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
        [Route("deleteSession")]
        public ExpandoObject DeleteSession(Session model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var Session = dataContext.Sessions.Where(x => x.SessionId == model.SessionId).First();
                dataContext.Sessions.DeleteOnSubmit(Session);
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
