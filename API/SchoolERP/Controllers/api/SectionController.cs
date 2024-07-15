using SchoolClasses;
using System;
using System.Dynamic;
using System.Linq;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/Section")]
    public class SectionController : ApiController
    {
        [HttpPost]
        [Route("SectionList")]
        public ExpandoObject SectionList(Section model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.Sections
                           join d2 in dataContext.Classes on d1.ClassId equals d2.ClassId
                           where (model.SectionId == d1.SectionId || model.SectionId == 0)
                           && (model.Status == d1.Status || model.Status == 0)
                           orderby d1.SectionName
                           select new
                           {
                               d1.SectionId,
                               d2.ClassId,
                               d2.ClassName,
                               d1.SectionName,
                               d1.Status,
                               StatusName = Enum.GetName(typeof(Status), d1.Status),
                           };

                ResponseMessage.SectionList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("saveSection")]
        public ExpandoObject SaveSection(Section model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Section Section = null;
                if (model.SectionId > 0)
                {
                    Section = dataContext.Sections.Where(x => x.SectionId == model.SectionId).First();
                    Section.UpdatedBy = model.UpdatedBy;
                    Section.UpdatedDate = DateTime.Now;
                }
                else
                    Section = new Section();

                Section.SectionName = model.SectionName;
                Section.ClassId = model.ClassId;
                Section.Status = model.Status;

                if (Section.SectionId == 0)
                    dataContext.Sections.InsertOnSubmit(Section);
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
        [Route("deleteSection")]
        public ExpandoObject DeleteSection(Section model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var Section = dataContext.Sections.Where(x => x.SectionId == model.SectionId).First();
                dataContext.Sections.DeleteOnSubmit(Section);
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
