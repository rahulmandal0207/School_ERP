using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolClasses
{
    public class AppData
    {
        public static string GenerateStaffCode(SchoolDataContext dataContext)
        {
            int SlNo = 0;
            var data = dataContext.Staffs.OrderByDescending(x => x.StaffId);
            if (data.Any())
                SlNo = Convert.ToInt32(data.First().StaffCode.Substring(4));
            SlNo += 1;
            return "STF" + SlNo.ToString("D10");
        }
    }
}
