App.Controller.Coupons = function($scope, $route, $routeParams, $location) {
  $scope.coupons = Service.Coupon();
  $scope.setScroll = function(){
    new iScroll(document.querySelector('#list-wraper'), {
      snap: true,
      momentum: false
    });
  };

  $scope.openCoupon = function(){
    $location.path('/coupon/'+this.coupon.id);
  };
  //@TODO change this method for set scroll, not a good idea to rely on the time
  setTimeout($scope.setScroll, 200);
};