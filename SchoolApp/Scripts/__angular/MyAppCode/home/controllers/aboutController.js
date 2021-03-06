﻿'use strict';

//debugger;

(function () {

    //debugger;

    var appSchool_Home = angular.module('appSchool.Home');

    appSchool_Home.controller('aboutController', ['$scope', '$window', function ($scope, $window) {

        var w = angular.element($window);

        $scope.version = "1.0.0";
        $scope.windowWidth = 0;
        $scope.windowHeight = 0;

        var setDimensions = function() {
            $scope.windowWidth = w.width();
            $scope.windowHeight = w.height();
        };

        w.bind('resize', function () {
            $scope.$apply(function () {
                setDimensions();
            });
        });
        setDimensions();

    }]);

}());