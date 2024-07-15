using SchoolClasses;
using System;
using System.Dynamic;
using System.Linq;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/Head")]
    public class HeadController : ApiController
    {
        [HttpPost]
        [Route("HeadList")]
        public ExpandoObject HeadList(Head model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.Heads
                           where (model.HeadId == d1.HeadId || model.HeadId == 0)
                           && (model.Status == d1.Status || model.Status == 0)
                           orderby d1.HeadName
                           select new
                           {
                               d1.HeadId,
                               d1.HeadName,
                               d1.IsCompulsory,
                               d1.Status,
                               StatusName = Enum.GetName(typeof(Status), d1.Status),
                           };

                ResponseMessage.HeadList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("saveHead")]
        public ExpandoObject SaveHead(Head model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Head Head = null;
                if (model.HeadId > 0)
                {
                    Head = dataContext.Heads.Where(x => x.HeadId == model.HeadId).First();
                    Head.UpdatedBy = model.UpdatedBy;
                    Head.UpdatedDate = DateTime.Now;
                }
                else
                    Head = new Head();

                Head.HeadName = model.HeadName;
                Head.IsCompulsory = model.IsCompulsory;
                Head.Status = model.Status;

                if (Head.HeadId == 0)
                    dataContext.Heads.InsertOnSubmit(Head);
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
        [Route("deleteHead")]
        public ExpandoObject DeleteHead(Head model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var Head = dataContext.Heads.Where(x => x.HeadId == model.HeadId).First();
                dataContext.Heads.DeleteOnSubmit(Head);
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
