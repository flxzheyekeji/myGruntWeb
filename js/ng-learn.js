/**
 * Created by Administrator on 2016/10/18.
 */
//angular.module("myApp",[])
//.controller("MyController",function($scope){
//    $scope.clock ={
//        now:new Date()
//    };
//
//    var updataClock = function(){
//        $scope.clock.now = new Date();
//    };
//
//    setInterval(function(){
//        $scope.$apply(updataClock);
//    },1000);
//
//    updataClock();
//
//}).directive('tot',function(){
//        return {
//            restrict:"E",
//            templateUrl:"../temp/ng-totle.html",
//            replace:true,
//            controller:"MyController"
//    }
//})

angular.module("myApp",["ngRoute"])
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
}])
.controller("MyController",function($scope,$location){
    $scope.$on("$viewContentLoaded",function(){
        console.log("ng-view content loaded!");
    });

    $scope.$on("$routeChangeStart",function(event,next,current){
        //event.preventDefault(); //cancel url change
        console.log("route change start!");
    });
})
.controller("loginController",function($scope){
    $scope.click = function(){

    }
})
.controller("totleController",function($scope){
    $scope.tot = {
        name:"jili",
        class:'yaogan',
        en:"50",
        cn:'60',
        math:'80'
    }
})