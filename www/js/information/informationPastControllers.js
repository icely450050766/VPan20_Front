/**
 * Created by Administrator on 2016/3/17.
 */
angular.module('VPan20_Front')
  .controller('informationPastControllers', ['$scope', '$ionicHistory','$location', 'testService',function($scope, $ionicHistory, $location,testService) {
        $scope.moredata=false;
        $scope.Bygone=[];

        var _time;
        var _pageno=0;
        var _pagesize=4;

        $scope.loadMore = function() {
            _pageno +=1 ;
            var _b=testService.getBygoneInformation(_pageno,_pagesize);
            console.log(_b);
            _b.then(function(data){
                $scope.Bygone=$scope.Bygone.concat(data);
                if (data.length == 0) {
                    $scope.moredata = true;
                };
                $scope.$broadcast('scroll.infiniteScrollComplete');
            },function(){

            });
        }

        $scope.publishtime=function convertDate(Time){
            return new Date(Time).toLocaleDateString();
        }

        $scope.goTodayInformationDetails = function(formType,pubId){
            $location.path('/tab/information-details/' + formType + '/' + pubId );
        }

        $scope.goBack = function(){
            $ionicHistory.goBack();
        }

}])
