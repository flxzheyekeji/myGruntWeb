/**
 * Created by Administrator on 2016/11/12.
 */
define(function(require,expotrs,module){
     var contModule = require('js/controllers/base');
    contModule.registerController('totleController', ["$scope",function($scope){
        $scope.tot = {
            name:"jili",
            class:'yaogan',
            en:"50",
            cn:'60',
            math:'80'
        }
    }]);
});