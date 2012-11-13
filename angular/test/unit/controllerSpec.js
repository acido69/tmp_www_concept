describe('Wallet controllers', function(){

  describe('App.Controller.Home',  function(){
    var ctrl,
      scope,
      routeParams={};

    beforeEach(function() {
      scope   = {},
      ctrl    = new App.Controller.Home(scope, routeParams);
    });
    //spec
    it("Messages is defined", function(){
      expect(scope.messages).toBeDefined();
    });

    it("Offers couunt defined", function(){
      expect(scope.offers).toBeDefined();
    });

  });

  describe('App.Controller.Coupon',  function(){
    var ctrl,
      scope,
      routeParams={couponId:100};

    beforeEach(function() {
      scope   = {},
      ctrl    = new App.Controller.Coupon(scope, routeParams);
    });
    //spec
    it("Coupon data is defined", function(){
      expect(scope.coupon).toBeDefined();
    });
    it("Coupon data is object", function(){
      expect( angular.isObject(scope.coupon)).toEqual(true);
    });
    it("Coupon id", function(){
      expect( scope.coupon['id']).toEqual(routeParams.couponId);
    });

  });

  describe('App.Controller.Coupons',  function(){
    var ctrl, scope;

    beforeEach(function() {
      scope   = {},
      ctrl    = new App.Controller.Coupons(scope);
    });
    //spec
    it("Coupons data is defined", function(){
      expect(scope.coupons).toBeDefined();
    });
    it("Coupons data is array", function(){
      expect( angular.isArray(scope.coupons)).toEqual(true);
    });
  });

  describe('App.Controller.Payment',  function(){
    var ctrl,
      scope,
      routeParams={paymentId:100};

    beforeEach(function() {
      scope   = {},
      ctrl    = new App.Controller.Payment(scope, routeParams);
    });
    //spec
    it("Payment data is defined", function(){
      expect(scope.payment).toBeDefined();
    });
    it("Payment data is object", function(){
      expect( angular.isObject(scope.payment)).toEqual(true);
    });
    it("Payment id", function(){
      expect( scope.payment['id']).toEqual(routeParams.paymentId);
    });
  });

  describe('App.Controller.Payments',  function(){
    var ctrl, scope;

    beforeEach(function() {
      scope   = {},
      ctrl    = new App.Controller.Payments(scope);
    });
    //spec
    it("Payments data is defined", function(){
      expect(scope.payments).toBeDefined();
    });
    it("Payments data is array", function(){
      expect( angular.isArray(scope.payments)).toEqual(true);
    });
  });

});