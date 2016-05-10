/**
 * Created by Administrator on 2016/3/17.
 */
angular.module('VPan20_Front')
  .controller('informationIndexControllers',['$scope','$location','testService',function($scope,$location,testService) {
        $scope.informationList=[];
        $scope.operationList=[];
        $scope.columnList=[];

        function init(){
            var _t=testService.getTodayInformation();
            console.log(_t);
            _t.then(function(data){
                $scope.informationList=data;
            },function(){

            });
            var _o=testService.getOperation();
            console.log(_o);
            _o.then(function(data){
                $scope.operationList=data;
            },function(){

            });
            var _c=testService.getColumn();
            console.log(_c);
            _c.then(function(data){
                $scope.columnList=data;
            },function(){

            });
        }

        $scope.doRefresh = function() {
            init();
            $scope.$broadcast('scroll.refreshComplete');
        };

        $scope.goTodayInformationDetails = function(formType,pubId){
            $location.path('/tab/information-details/' + formType + '/' + pubId );
        }

        init();
  }])
