/**
 * Created by Administrator on 2016/10/20.
 */
angular.module("myApp",[])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/home',{
                templateUrl:"../temp/ng-home.html"
            })
            .when('/login',{
                templateUrl:"../temp/ng-login.html",
                //controller:'loginController'
            }).when('/total',{
            templateUrl:"../temp/ng-totle.html",
            //controller:'totleController'
        }).otherwise({
            redirectTo:'/home'
        })
    }]);