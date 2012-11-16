describe('Wallet App :: ', function() {

  describe('Home / ', function() {

    beforeEach(function() {
      browser().navigateTo('/app/index.html');
    });

    it('should show all offers', function() {
      expect(repeater('.offers li').count()).toBe(6);
    });

    describe('Check navigation link...', function() {

      it('goto payment list', function() {
        element('.payment').click();
        expect(browser().location().url()).toBe('/payment');
        
        // Roy - check count of payment items.
        expect(repeater('li').count()).toBe(6);
        
        // Roy - check clicking on etakes you to the correct payment.
        element('li a').click();
        expect(browser().location().url()).toBe('/payment/100');
        browser().navigateTo('/app/index.html');
      });
      it('goto coupon list', function() {
        element('.coupons').click();
        expect(browser().location().url()).toBe('/coupons');
      });
      it('go to offer list', function() {
        element('.offers li a').click();
        //esto es una tranpa porque lo mando a cupones
        expect(browser().location().url()).toBe('/coupon/100');
        browser().navigateTo('/app/index.html');
      });

    });

  });

  describe('Coupon List / ', function() {

    beforeEach(function() {
      browser().navigateTo('/app/index.html#/coupons');
    });

    it('should show all coupons', function() {
      expect(repeater('#coupon-list li').count()).toBe(6);
    });

    describe('Check navigation link...', function() {

      it('goto Home with back button', function() {
        element('header a').click();
        expect(browser().location().url()).toBe('/');
      });

      it('goto Coupon detail fron list', function() {
        element('#coupon-list li a').click();
        expect(browser().location().url()).toBe('/coupon/100');
      });
    });

  });

  describe('Coupon Detail / ', function() {

    beforeEach(function() {
      browser().navigateTo('/app/index.html#/coupon/100');
    });


    describe('Check navigation link...', function() {

      it('goto Home with back button', function() {
        element('header a').click();
        expect(browser().location().url()).toBe('/coupons');
      });

    });

  });

  describe('Payment List/ ', function() {

    beforeEach(function() {
      browser().navigateTo('/app/index.html#/payment');
    });

    it('should show all payments', function() {
      expect(repeater('#payment-list li').count()).toBe(6);
    });

    describe('Check navigation link...', function() {

      it('goto Home with back button', function() {
        element('header a').click();
        expect(browser().location().url()).toBe('/');
      });

      it('goto payment detail fron list', function() {
        element('#payment-list li a').click();
        expect(browser().location().url()).toBe('/payment/100');
      });
    });

  });

  describe('Payment Detail / ', function() {

    beforeEach(function() {
      browser().navigateTo('/app/index.html#/payment/100');
    });


    describe('Check navigation link...', function() {

      it('goto Home with back button', function() {
        element('header a').click();
        expect(browser().location().url()).toBe('/payment');
      });

    });

  });





});