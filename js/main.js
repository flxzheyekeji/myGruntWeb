/**
 * Created by Administrator on 2016/11/9.
 */
define(function(require,exports,module){

    require("js/angular.min");
    require("js/angular-route.min");
    require('js/controllers/base');
    require('js/factorys/base-factory');
    require('js/directives/base');


    var routeConfig = require("js/route");
    var loader = require("js/ng-load");

    angular.module("myApp",['ngRoute',"myApp.controllers","myApp.factory","myApp.directive"]).config(["$routeProvider",
        function($routeProvider){

            //var registerController = $controllerProvider.register;
            //var registerDirective = $compileProvider.directive;
            //var registerFilter = $filterProvider.register;
            //var registerFactory = $provide.factory;
            //var registerService = $provide.service;

        if (routeConfig.routes != undefined) {
            angular.forEach(routeConfig.routes, function(route, path) {
                console.log(route.dependencies);
                $routeProvider.when(path, {
                    templateUrl: route.templateUrl,
                    controller: route.controller,
                    // 设置每个路由的 resolve ， 使用 seajs 加载 controller 脚本
                    resolve: loader.load(route.dependencies)
                });
            });
        }

        if (routeConfig.defaultRoute != undefined) {
            $routeProvider.otherwise({ redirectTo: routeConfig.defaultRoute });
        }
    }]).run(["$rootScope","$location",function($rootScope,$location){
        $rootScope.logged = false;
        $rootScope.$on("$routeChangeStart",function(event,next,current){
            if(!$rootScope.logged){
                if(next.templateUrl === "../temp/ng-login.html"){
                }
                else{
                    $location.path('/login');
                }
            }
        })
    }])

    angular.bootstrap(document.body,['myApp']);
})

