App.Controller.Coupon = function($scope, $route, $routeParams, $location) {
  $scope.coupon = Service.Coupon($routeParams['couponId']);
  console.log($scope.coupon);
};