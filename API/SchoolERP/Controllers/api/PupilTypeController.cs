using SchoolClasses;
using System;
using System.Dynamic;
using System.Linq;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/PupilType")]
    public class PupilTypeController : ApiController
    {
        [HttpPost]
        [Route("PupilTypeList")]
        public ExpandoObject PupilTypeList(PupilType model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.PupilTypes
                           where (model.PupilTypeId == d1.PupilTypeId || model.PupilTypeId == 0)
                           && (model.Status == d1.Status || model.Status == 0)
                           orderby d1.PupilTypeName
                           select new
                           {
                               d1.PupilTypeId,
                               d1.PupilTypeName,
                               d1.Status,
                               StatusName = Enum.GetName(typeof(Status), d1.Status),
                           };

                ResponseMessage.PupilTypeList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("savePupilType")]
        public ExpandoObject SavePupilType(PupilType model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                PupilType PupilType = null;
                if (model.PupilTypeId > 0)
                {
                    PupilType = dataContext.PupilTypes.Where(x => x.PupilTypeId == model.PupilTypeId).First();
                    PupilType.UpdatedBy = model.UpdatedBy;
                    PupilType.UpdatedDate = DateTime.Now;
                }
                else
                    PupilType = new PupilType();

                PupilType.PupilTypeName = model.PupilTypeName;
                PupilType.Status = model.Status;

                if (PupilType.PupilTypeId == 0)
                    dataContext.PupilTypes.InsertOnSubmit(PupilType);
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
        [Route("deletePupilType")]
        public ExpandoObject DeletePupilType(PupilType model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var PupilType = dataContext.PupilTypes.Where(x => x.PupilTypeId == model.PupilTypeId).First();
                dataContext.PupilTypes.DeleteOnSubmit(PupilType);
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
