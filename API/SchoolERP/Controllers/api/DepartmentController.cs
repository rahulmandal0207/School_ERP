using SchoolClasses;
using System;
using System.Dynamic;
using System.Linq;
using System.Web.Http;

namespace SchoolERP.Controllers.api
{
    [RoutePrefix("api/Department")]
    public class DepartmentController : ApiController
    {

        [HttpPost]
        [Route("DepartmentList")]
        public ExpandoObject DepartmentList(Department model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var list = from d1 in dataContext.Departments
                           where (model.DepartmentId == d1.DepartmentId || model.DepartmentId == 0)
                           && (model.Status == d1.Status || model.Status == 0)
                           orderby d1.DepartmentName
                           select new
                           {
                               d1.DepartmentId,
                               d1.DepartmentName,
                               d1.Status,
                               StatusName = Enum.GetName(typeof(Status), d1.Status),
                           };

                ResponseMessage.DepartmentList = list.ToList();
                ResponseMessage.Message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                ResponseMessage.Message = ex.Message;
            }
            return ResponseMessage;
        }

        [HttpPost]
        [Route("saveDepartment")]
        public ExpandoObject SaveDepartment(Department model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                Department Department = null;
                if (model.DepartmentId > 0)
                    Department = dataContext.Departments.Where(x => x.DepartmentId == model.DepartmentId).First();
                else
                    Department = new Department();
                Department.DepartmentName = model.DepartmentName;
                Department.Status = model.Status;

                if (Department.DepartmentId == 0)
                    dataContext.Departments.InsertOnSubmit(Department);
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
        [Route("deleteDepartment")]
        public ExpandoObject DeleteDepartment(Department model)
        {
            dynamic ResponseMessage = new ExpandoObject();
            try
            {
                SchoolDataContext dataContext = new SchoolDataContext();
                var Department = dataContext.Departments.Where(x => x.DepartmentId == model.DepartmentId).First();
                dataContext.Departments.DeleteOnSubmit(Department);
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
