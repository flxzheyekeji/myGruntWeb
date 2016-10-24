/**
 * Created by Administrator on 2016/10/20.
 */
angular.module("myApp.factorys",[]).factory("gradesService",function($http){

    var getRecrode = function(){
        return $http({
            method:"GET",
            url:"../data/ng-data.json"
        })
    }

    return {
        getRecrode:getRecrode
    }

});