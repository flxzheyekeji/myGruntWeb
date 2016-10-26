/**
 * Created by Administrator on 2016/10/20.
 */

angular.module("myApp.controllers",["ngRoute","myApp.directive","myApp.factorys","ngPagination"])
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

}])
.controller("icheckController",["$scope",function($scope){
    $scope.check = {
        sum:true,
        reduce:"sanduo"
    }
}])
.controller("GradesController",["$scope","gradesService",function($scope,gradesService){

    gradesService.getRecrode().success(function(data,status,headers,config){
        pagination(data);
    }).error(function(data,status,headers,config){
        console.log("get grades with something wrong!");
    });

    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 4,
        pagesLength: 5,
        perPageOptions: [4, 8]
    };

    function pagination(studentList,size,index){
        if(!pagination.data){
            if(!_.isArray(studentList)){
               return;
            }
            pagination.data = studentList
            $scope.paginationConf.totalItems = studentList.length;
        }

        index = $scope.paginationConf.currentPage;
        size = $scope.paginationConf.itemsPerPage;
        $scope.students = _.chunk(pagination.data,size)[--index];
    }

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', pagination);
}]);


