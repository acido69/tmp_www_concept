'use strict';

angular.module('wallet', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', {templateUrl: 'tpl/home.html',   controller: App.Controller.Home}).
      when('/coupons', {templateUrl: 'tpl/coupon_list.html',   controller: App.Controller.Coupons}).
      when('/coupon/:couponId', {templateUrl: 'tpl/coupon_detail.html', controller: App.Controller.Coupon }).
      when('/payment', {templateUrl: 'tpl/payment_list.html',   controller: App.Controller.Payments}).
      when('/payment/:paymentId', {templateUrl: 'tpl/payment_detail.html', controller: App.Controller.Payment }).
      otherwise({redirectTo: '/'});
  }]);