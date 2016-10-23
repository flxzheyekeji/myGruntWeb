/**
 * Created by Administrator on 2016/10/20.
 */
angular.module("myApp.factorys",[]).factory("gradesService",function($http){
    $http({
       method:"GET",
        url:"../data/ng-data.json"
    }).success(function(data,status,headers,config){
        return {getRecrode:function(username){
            if(username!=="flx"){
                return null;
            }
            return data;
        }}
    }).error(function(data,status,headers,config){
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
    });
});