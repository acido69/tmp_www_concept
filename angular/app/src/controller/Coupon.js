App.Controller.Coupon = function($scope, $routeParams) {
  $scope.coupon = Service.Coupon($routeParams['couponId']);
};