/**
 * Created by Administrator on 2016/10/28.
 */
angular.module("myApp.directive",[]).directive("datePicker",function(){
    return{
        restrict : 'AE',
        require : 'ngModel',
        link:function($scope, $element, $attrs, $ngModel){
            if (!$ngModel) {
                return;
            }
            $($element).daterangepicker({
                singleDatePicker: true,
                timePicker: true,
                timePickerIncrement: 30,
                format: 'MM/DD/YYYY h:mm A'
            },function(start, end, label){
                $scope.$apply(function() {
                    $ngModel.$setViewValue($attrs.value);
                });
            });
        }
    }
});