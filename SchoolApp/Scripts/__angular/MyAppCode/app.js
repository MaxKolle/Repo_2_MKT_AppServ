'use strict';

var appSchool = angular.module('appSchool', ['ui.router',

    // MKT Directives Modules

    // MKT Business Logic Modules
    'appSchool.Home', 'appSchool.Student'

]);

appSchool.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
           .state('home', {
               url: '/home',
               template: Utility_GetHtmlTemplate('/Home/DashBoard')
           })
            .state('about', {
                url: '/about',
                template: Utility_GetHtmlTemplate('/Home/About')
            })
            .state('contact', {
                url: '/contact',
                template: Utility_GetHtmlTemplate('/Home/Contact')
            })

    // START - state for Student =========================================

        .state('student', {
            url: '/student',
            abstract: true,
            template: '<div ui-view></div>'
        })
        .state('student.list', {
            url: '/list/:params',
            template: Utility_GetHtmlTemplate('/Student/List')
        })
        .state('student.create', {
            url: '/create',
            template: Utility_GetHtmlTemplate('/Student/Create')
        })
        .state('student.preview', {
            url: '/preview',
            template: Utility_GetHtmlTemplate('/Student/Preview')
        })
        .state('student.details', {
            url: '/details/:params',
            template: Utility_GetHtmlTemplate('/Student/Details')
        })
        .state('student.edit', {
            url: '/edit/:facility_FacilityID',
            template: Utility_GetHtmlTemplate('/Student/Edit')
        })

    // END - state for Student ============================================

}]);

