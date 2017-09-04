using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace SchoolApp.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //if (false /* Session["SystemUserLoginData"] == null */ )
            //    return RedirectToAction("Login", "Account");

            return View();
        }
        public PartialViewResult DashBoard()
        {
            return PartialView();
        }
        public PartialViewResult About()
        {
            return PartialView();
        }
        public PartialViewResult Contact()
        {
            return PartialView();
        }
    }
}