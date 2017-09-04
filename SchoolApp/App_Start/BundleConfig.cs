using System.Web;
using System.Web.Optimization;

namespace SchoolApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;

            #region JavaScript Includes Section     

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*",
                        "~/Scripts/bootstrap/modernizr-2.6.2-respond-1.1.0.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            //=============================================================================================================================================================================================

            // JQuery Files
            bundles.Add(new ScriptBundle("~/bundles/FlatKitUI_jquery").Include(
                "~/Scripts/jquery-1.10.2.min.js",
                "~/Scripts/jquery-ui-1.10.3.min.js"));


            // FlatKitUI jQuery, Bootstrap, Core JS Files
            bundles.Add(new ScriptBundle("~/bundles/FlatKitUI_js").Include(
                // ------------ jQuery ---------------- >
                "~/libs/jquery/jquery/dist/jquery.js",
                // ------------ Bootstrap ---------------- >
                "~/libs/jquery/tether/dist/js/tether.min.js",
                "~/libs/jquery/bootstrap/dist/js/bootstrap.js",
                // ------------ Core ---------------- >
                "~/libs/jquery/underscore/underscore-min.js",
                "~/libs/jquery/jQuery-Storage-API/jquery.storageapi.min.js",
                "~/libs/jquery/PACE/pace.min.js",
                "~/Scripts/config.lazyload.js",
                "~/Scripts/palette.js",
                "~/Scripts/ui-load.js",
                "~/Scripts/ui-jp.js",
                "~/Scripts/ui-include.js",
                "~/Scripts/ui-device.js",
                "~/Scripts/ui-form.js",
                "~/Scripts/ui-nav.js",
                "~/Scripts/ui-screenfull.js",
                "~/Scripts/ui-scroll-to.js",
                "~/Scripts/ui-toggle-class.js",
                "~/Scripts/appTheme.js"
            ));

            // MBS Libraries
            bundles.Add(new ScriptBundle("~/bundles/MBS_Libs").Include(
                "~/Scripts/MoreScripts/MBS_Scripts/_MBS_JS_Utilities_LibraryRequestManagement.js",
                "~/Scripts/MoreScripts/MBS_Scripts/_MBS_JS_Utilities_ListManagement.js",

                "~/Scripts/MoreScripts/MBS_Scripts/_MBS_Utilities_Parsers.js",
                //"~/Scripts/MoreScripts/MBS_Scripts/_MBS_Utilities_JsonObjectMgt.js",
                //"~/Scripts/MoreScripts/MBS_Scripts/_MBS_UtilClass_TimedExecution.js",
                //"~/Scripts/MoreScripts/MBS_Scripts/_MBS_Utilities_DateTime.js",
                "~/Scripts/MoreScripts/MBS_Scripts/_MBS_Utilities_HTMLGetElement.js",
                "~/Scripts/MoreScripts/MBS_Scripts/_MBS_Class_LocalStorage.js",
                "~/Scripts/MoreScripts/MBS_Scripts/_MBS_Utilities_HTMLElementGenerator.js",
                "~/Scripts/MoreScripts/MBS_Scripts/_MBS_AgJs_Utilities_HTMLElementGenerator.js",
                "~/Scripts/MoreScripts/MBS_Scripts/_MBS_Utilities_StringArray.js",
                "~/Scripts/MoreScripts/MBS_Scripts/_MBS_UtilClass_SelectionChain_Ver1_1_2.js",
                "~/Scripts/MoreScripts/MBS_Scripts/_MBS_Utilities_String.js",
                //"~/Scripts/MoreScripts/MBS_Scripts/_MBS_UtilClass_InputTableBuilder_Ver1_1.js",
                //"~/Scripts/MoreScripts/MBS_Scripts/_MBS_Utilities_ObjectArray.js",
                //"~/Scripts/MoreScripts/MBS_Scripts/_MBS_Utilities_Validation.js",
                //"~/Scripts/MoreScripts/MBS_Scripts/_MBS_Utilities_Images.js",
                //"~/Scripts/MoreScripts/MBS_Scripts/_MBS_UtilClass_AsyncFileUpload_Ver1_3.js",
                "~/Scripts/MoreScripts/MBS_Scripts/_MBS_Class_SessionStorage.js",
                "~/Scripts/MoreScripts/MBS_Scripts/_MBS_Utilities_SearchDataStore.js",
                //"~/Scripts/MoreScripts/MBS_Scripts/_MBS_UtilClass_Location_Ver1_1_3.js",
                "~/Scripts/MoreScripts/MBS_Scripts/_MBS_Utilities_Miscellaneous.js",

                "~/Scripts/MoreScripts/MBS_Scripts/_MBS_FinalUITouches.js"

            // Due to its dynamic nature, the UI Caching Utility below has been removed from the bundling but rather included directly into the HTML page.
            //"~/Scripts/MoreScripts/MBS_Scripts/_MBS_Utilities_UI_HTML_Caching.js",



            //"~/Scripts/MoreScripts/JQuery_Scripts/jquery.PopupModalDialog/jquery.reveal.js"
            ));
            // AngularJS Libraries
            bundles.Add(new ScriptBundle("~/bundles/AngularJS_Libs").Include(
                "~/Scripts/__angular/__References/angular.min.js",
                "~/Scripts/__angular/__References/angular-ui-router.min.js"
                ));

            // My AngularJS Application Files
            bundles.Add(new ScriptBundle("~/bundles/AngularJS_MyApp").Include(

                // Main Application
                "~/Scripts/__angular/MyAppCode/app.js",
                //=============================================================================================================================================================================================
                // This service can be used anywhere in the application when needed.
                //"~/Scripts/__angular/MyAppCode/ShareServices/module.js",
                //"~/Scripts/__angular/MyAppCode/ShareServices/services/sharedDataService.js",
                //"~/Scripts/__angular/MyAppCode/ShareServices/services/sharedDataService_Ver2.js",

                //"~/Scripts/ngPrint.js",
                // Main Directives - BEGIN ========================================================================

                // Full Calendar Directives
                // "~/Scripts/__angular/MBS_References/FullCalendar/module.js",
                // "~/Scripts/__angular/MBS_References/FullCalendar/directives/fullCalendar.js",
                // // Main Directives - END ========================================================================

                // Home - Module
                "~/Scripts/__angular/MyAppCode/Home/module.js",

                // Home - Dashboard
                //"~/Scripts/__angular/MyAppCode/Home/services/dashboardService.js",
                "~/Scripts/__angular/MyAppCode/Home/controllers/dashboardController.js",

                // Home - About
                // "~/Scripts/__angular/MyAppCode/Home/services/aboutService.js",
                "~/Scripts/__angular/MyAppCode/Home/controllers/aboutController.js",

                // Home - Contact
                // "~/Scripts/__angular/MyAppCode/Home/services/contactService.js",
                "~/Scripts/__angular/MyAppCode/Home/controllers/contactController.js",


                // Student - Module
                "~/Scripts/__angular/MyAppCode/Student/module.js",

                // Student - List
                "~/Scripts/__angular/MyAppCode/Student/services/listService.js",
                "~/Scripts/__angular/MyAppCode/Student/controllers/listController.js",

                // Student - Create
                "~/Scripts/__angular/MyAppCode/Student/services/createService.js",
                "~/Scripts/__angular/MyAppCode/Student/controllers/createController.js",
                "~/Scripts/__angular/MyAppCode/Student/controllers/previewController.js",

                // Student -  Edit
                "~/Scripts/__angular/MyAppCode/Student/services/editService.js",
                "~/Scripts/__angular/MyAppCode/Student/controllers/editController.js",
                "~/Scripts/__angular/MyAppCode/Student/controllers/previewController.js",

                // Student - Details
                "~/Scripts/__angular/MyAppCode/Student/services/detailsService.js",
                "~/Scripts/__angular/MyAppCode/Student/controllers/detailsController.js"

               ));

            #endregion

            #region CSS Section

            // FlatKitUI Assets Libraries CSS Files
            bundles.Add(new StyleBundle("~/bundles/FlatKitUI_AssetsLibs").Include(
                "~/assets/animate.css/animate.min.css",
                "~/assets/animate.css/animate.min.css",
                "~/assets/glyphicons/glyphicons.css",
                "~/assets/font-awesome/css/font-awesome.min.css",
                "~/assets/material-design-icons/material-design-icons.css",
                "~/assets/bootstrap/dist/css/bootstrap.min.css",
                "~/assets/styles/app.css",
                "~/assets/styles/font.css"));

            #endregion
        }
    }
}
