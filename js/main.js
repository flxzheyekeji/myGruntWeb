/**
 * Created by Administrator on 2016/11/9.
 */
define(function(require, exports, module){
    //var $ = require("$");
    //var np = require("../plug/ng-progress/nprogress");
    var angular = require("angularjs");
    require('angular-route');
    require('js/ng-learn/controllers/ng-controller');

    angular.module('myApp',['ngRoute','myApp.controllers']).config(['$routeProvider',function($routeProvider){
            $routeProvider.when('/map',{
                    templateUrl:"../temp/ng-map.html"
                })
                .when('/login',{
                    templateUrl:"../temp/ng-login.html",
                    controller:'loginController'
                }).when('/total',{
                templateUrl:"../temp/ng-totle.html",
                controller:'totleController'
            }).when('/check',{
                templateUrl:"../temp/ng-icheck.html",
                controller:"icheckController"
            }).when('/grade',{
                templateUrl:"../temp/ng-table.html",
                controller:"GradesController"
            }).when('/multiple',{
                templateUrl:"../temp/ng-multiple.html"
            }).when('/print',{
                templateUrl:"../temp/ng-print.html"
            }).otherwise({
                redirectTo:'/login'
            })
        }]).run(["$rootScope","$location",function($rootScope,$location){
        $rootScope.logged = false;
        $rootScope.$on("$routeChangeStart",function(event,next,current){
            if(!$rootScope.logged){
                if(next.templateUrl === "../temp/ng-login.html"){
                }
                else{
                    $location.path('/login');
                }
            }
        })
    }])


    angular.bootstrap(document.body, ['myApp']);
});