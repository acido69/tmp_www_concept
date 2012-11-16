App.Controller.Home = function($scope, $route, $routeParams, $location){
  $scope.messages = 9;
  $scope.offers = Service.Coupon();
  $scope.setScroll = function(){
    new iScroll(document.querySelector('#wrapper'), {
      snap: true,
      momentum: false,
      hScrollbar: false
    });
  };
  $scope.openOffer = function(){
    $location.path('/coupon/'+this.offer.id);
  };

  //@TODO change this method for set scroll, not a good idea to rely on the time
  setTimeout($scope.setScroll, 200);
};