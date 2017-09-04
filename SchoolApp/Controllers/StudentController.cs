using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchoolApp.Controllers
{
    public class StudentController : Controller
    {
        // GET: Student
        public PartialViewResult List()
        {
            return PartialView();
        }
        public PartialViewResult Preview()
        {
            return PartialView();
        }

        public PartialViewResult Create()
        {
            return PartialView();
        }

        public PartialViewResult Details()
        {
            return PartialView();
        }

        public PartialViewResult Edit()
        {
            return PartialView();
        }


        // ===========================================================================================================================

    }
}