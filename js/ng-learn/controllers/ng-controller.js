/**
 * Created by Administrator on 2016/10/20.
 */
/*怎么将controller和route分到两个文件里呢，我草迷茫了。到底是他妈哪里错了。
* */

angular.module("myApp.controllers",["ngRoute","myApp.directive"])
.controller("MyController",function($scope,$location){
    $scope.$on("$viewContentLoaded",function(){
        console.log("ng-view content loaded!");
    });

    $scope.$on("$routeChangeStart",function(event,next,current){
        //event.preventDefault(); //cancel url change
        console.log("route change start!");
    });

    $scope.progress = function(){
        NProgress.start();
        setTimeout(NProgress.done,3500);
    };
})
.controller("loginController",function($scope){
    $scope.login = function(){

    }
})
.controller("totleController",["$scope",function($scope){

    $scope.tot = {
        name:"jili",
        class:'yaogan',
        en:"50",
        cn:'60',
        math:'80'
    }

}]);


