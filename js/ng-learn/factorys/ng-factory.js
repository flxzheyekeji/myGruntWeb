/**
 * Created by Administrator on 2016/10/20.
 */
angular.module("myApp.factorys",[])
    .factory("gradesService",function($http){
        return {
            getRecrode:function(){
                return $http({
                    method:"GET",
                    url:"../data/ng-data.json"
                })
            }
        }
    })
    .factory("logonService",function($http){
        return {
            getUser:function(){
                return  $http({
                    method:"GET",
                    url:"../data/user_message.json"
                })
            }
        }
    });
