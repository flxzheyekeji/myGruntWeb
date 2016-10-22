/**
 * Created by Administrator on 2016/10/22.
 */
angular.module("myApp",["myApp.controllers"])
    .config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/home',{
            templateUrl:"../temp/ng-home.html"
        })
        .when('/login',{
            templateUrl:"../temp/ng-login.html",
            controller:'loginController'
        }).when('/total',{
        templateUrl:"../temp/ng-totle.html",
        controller:'totleController'
    }).otherwise({
        redirectTo:'/home'
    })
}]);