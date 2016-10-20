/**
 * Created by Administrator on 2016/10/18.
 */
angular.module("myApp",[])
.controller("MyController",function($scope){
    $scope.clock ={
        now:new Date()
    };

    $scope.tot = {
        name:"联想",
        class:"遥感",
        en:"50",
        cn:"70",
        math:"80"
    }

    var updataClock = function(){
        $scope.clock.now = new Date();
    };

    setInterval(function(){
        $scope.$apply(updataClock);
    },1000);

    updataClock();

}).directive('tot',function(){
        return {
            restrict:"E",
            templateUrl:"../temp/ng-totle.html",
            replace:true,
            controller:"MyController"
    }
})




//function MyController($scope){
//
//}