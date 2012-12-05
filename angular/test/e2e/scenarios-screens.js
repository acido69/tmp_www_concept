
//==============================================================================
//
// Test functions.
// 
//------------------------------------------------------------------------------
//
// SCREEN TESTS.
//
function s0(){
    // Dummy function to just go to the home screen with no tests.
    describe(p_tr + 's0 : Go to home screen', function() {
        it('without any testing (for speed)', function() {
            browser().navigateTo(urlHome);
        }); 
    });
};

function s1(){
    
    describe(p_tr + 's1 : Home screen', function() {
    
        //
        // Run every test spec against this screen.
        //
        beforeEach(function() {
            // You have NO idea what I went through to get this code!
            browser().navigateTo(urlHome);
        });


        //
        // When you leave the screen test, make sure you are back in that screen!
        //
        // Something like THIS would be better ... if it worked! :(
        //afterEach(function() {
        //    // You have NO idea what I went through to get this code!
        //    browser().navigateTo(urlHome + '#:id', function(url) {
        //      return url.replace(':id', browser().location().url());
        //    });
        //});
        afterEach(function() {
            browser().navigateTo(urlHome);
        });
    
    
        // Check it has a scrollbar,if required.
        // This doesn't work - tested against the 'coupons' screen and it still
        // said everything was fine! :(
        //it('should have a scrollbar if required', function() {
        //    if ($(document).height() <= $(window).height())
        //        expect(browser().location().url()).toBe('No vertical scrollbar in screen 1');
        //});

        //
        // The 'COUPONS' along the top of the screen ...
        // 
        describe('has COUPON links along the top', function() {

            // This string identifies the 'coupons' (called 'offers' here?).
            var linkList = '.offers li a';

            it ('(count > 1)', function() {
                expect(repeater(linkList).count()).toBeGreaterThan(1);
            });

            // Check each coupon takes us to the expected page ...
            it ('which are all valid, working links', function() {
                element(linkList).query(function (selectedElements, done) {
                    selectedElements.each(function(idx,elm) {

                        var thisCoupon = '.offers li a:eq(' + idx + ')';

                        // Typo in the app says "vouncher" instead of "voucher".
                        expect(element(thisCoupon).html()).toContain('voucher when you spend');
                        //expect(element(thisCoupon).html()).toContain('vouncher when you spend');                    

                        // 
                        // Check oupon name in next screen matches the name in this screen.
                        //
                        element('.offers li span:eq(' + idx + ')').query(function(x, done) {
                            
                            // Clicking it should take you to the correct page.
                            element(thisCoupon).click();
                        
                            expect (binding('coupon.name')).toBe(x.text());
                            done();

                            // Now return back to the page we're testing here so we can test the rest.
                            browser().navigateTo(urlHome);
                        });
                    });
                    done();
                });
            });
        });

        describe('has a "See All" link', function() {
            it ('which displays all coupons', function() {
                expect(element('.show-all').html()).toContain("See all");
                element('.show-all').click();
                expect(browser().location().url()).toBe('/coupons');
            });
        });

        describe('has a "Money" link', function() {
            it ('which takes us home (at the moment)', function() {
                expect(element('#money').html()).toBe("Money");
                element('#money').click();
                expect(browser().location().url()).toBe('/');
            });
        });

        describe('has a "Transactions" link', function() {
            it ('which take us home (at the moment)', function() {
                expect(element('#transaction').html()).toBe("Transactions");
                element('#transaction').click();
                expect(browser().location().url()).toBe('/');
            });
        });

        describe('has a "Messages" link', function() {
            it ('which take us home (at the moment)', function() {
                expect(element('#message').html()).toBe("Messages");
                element('#message').click();
                expect(browser().location().url()).toBe('/');
            });
        });

        describe('has a "Payment" link', function() {
            it ('which takes us to the payment screen (credit cards)', function() {
console.log('s1: element "paryment" should be "payment".');
                expect(element('#paryment').html()).toBe("Payment");
                element('#paryment').click(); 
                expect(browser().location().url()).toBe('/payment');
            });
        });

        describe('has a "Loyalty" link', function() {
            it ('which takes us home (at the moment)', function() {
                expect(element('#loyalty').html()).toBe("Loyalty");
                element('#loyalty').click();
                expect(browser().location().url()).toBe('/');
            });
        });

        describe('has a "Coupons" link', function() {
            it ('which takes us to the coupons screen', function() {
                expect(element('#coupon').html()).toBe("Coupons");
                element('#coupon').click();
                expect(browser().location().url()).toBe('/coupons');
            });
        });
    });
};

function s2(p_name){

    describe(p_tr + 's2 : Coupon details screen', function() {
        
        // Check we are in the right screen type.
        it('- verify we are in the coupon detail screen', function() {
          expect(browser().location().url()).toContain('/coupon/');
        });
        
        it('has all expected bindings', function() {
            expect(binding('coupon.price')).toBeDefined();
            expect(binding('coupon.expire_date')).toBeDefined();
            expect(binding('coupon.info')).toBeDefined();
            expect(binding('coupon.categorie')).toBeDefined();
            expect(binding('coupon.location.addr')).toBeDefined();
            expect(binding('coupon.location.phone')).toBeDefined();
        });
    
        it('has bindings set to expected values', function() {
            expect(binding('coupon.name')).toBe(p_name);
        });
    
        describe('has a working link for', function() {

            afterEach(function() {
                // Have to hardcode just now because I can't figure
                // to store the url for this coupon!
                browser().navigateTo(urlHome + "#/coupon/100");
            });
        
            it('the "coupons" screen', function() {
                element('header h1 a').click();
                expect(browser().location().url()).toBe('/coupons');
            });

            it('"Read more"', function() {
                expect(element('.info .more').html()).toBe("Read more");
                element('.info .more').click();
                expect(browser().location().url()).toBe('/');
            });

            it('"More locations"', function() {
                expect(element('.location .more').html()).toContain("More locations");
                element('.location .more').click();
                expect(browser().location().url()).toBe('/');
            });
        
        });
    
    });
};

function s3(){

    describe(p_tr + 's3 : Coupons screen', function() {
        
        // Check we are in the right screen type.
        it('- verify we are in the coupons screen', function() {
          expect(browser().location().url()).toBe('/coupons');
        });
        
        it('has all expected bindings', function() {
            expect(binding('coupon.name')).toBeDefined();
            expect(binding('coupon.price')).toBeDefined();
            expect(binding('coupon.categorie')).toBeDefined();
            expect(binding('coupon.expire_date')).toBeDefined();
        });

        describe('has a working link for', function() {

            afterEach(function() {
                // Have to hardcode just now because I can't figure
                // to store the url for this coupon!
                browser().navigateTo(urlHome + "#/coupons");
            });
        
            it('the "coupons" screen', function() {
                element('header a').click();
                expect(browser().location().url()).toBe('/');
            });
        
            //
            // Loop through all coupons and check each one takes us to the
            // correct coupon detail page.
            //
            it('the coupon name', function() {
                element('.card a').query(function (selectedElements2, done) {
                    selectedElements2.each(function(idx,elm) {
                        var x = '.card a:eq(' + idx + ')';
                        var clickedLinkText = $(this).text().replace(/\n +/g,'');
                        var clickedHref = $(this).attr("href").replace(/./, '/');
                        element(x).click();
                        expect(binding('coupon.name')).toBe(clickedLinkText); //Removes "\n      " from the element text field.
                        expect(browser().location().url()).toBe(clickedHref);
                        browser().navigateTo(urlHome + "#/coupons");
                    });
                    done();
                });
            });
        });
    });
};

function s4(){
    describe(p_tr + 's4 : Payment list screen', function() {
        
        afterEach(function() {
            browser().navigateTo(urlHome + "#/payment");
        });

        describe('has a working link for', function() {
            it('the "Payment" screen', function() {
                element('header a').click();
                expect(browser().location().url()).toBe('/');
            });
        
            it ('"some" working payment options', function() {
                var listSel = 'li a';
                expect(repeater(listSel).count()).toBeGreaterThan(1);
                
                element(listSel).query(function (selectedElements, done) {
                    selectedElements.each(function(idx,elm) {

                        var thisPayment = listSel + ':eq(' + idx + ')';

                        element('li a img:eq(' + idx + ')').query(function (selectedElements2, done) {
                            selectedElements2.each(function(idx2,elm2) {
                                var thisPaymentNumber = $(this).attr('alt');

                                // Start at the payment page before each click.
                                browser().navigateTo(urlHome + "#/payment");

                                // 
                                // Check the payment number (card number) in the payment detail screen 
                                // matches the card clicked in the payment list screen.
                                //
                                element(thisPayment).click();
                                expect(browser().location().url()).toBe('/payment/100');
                                expect(binding('payment.number')).toBe(thisPaymentNumber); 
                                
                                return false; // Make sure we only ever bother with the first 'img' (in case there's > 1 in this 'a').
                            });
                            
                            done();
                        });                        
                    });
                    done();
                });
            });
        });
    });
};

function s5(){
    describe(p_tr + 's5 : Payment detail screen', function() {
        
        // Check we are in the right screen type.
        it('- verify we are in the payment detail screen', function() {
          expect(browser().location().url()).toContain('/payment');
        });

        it('has all expected bindings', function() {
            expect(binding('payment.number')).toBeDefined();        
        });
    
        describe('has a working link for', function() {
            afterEach(function() {
console.log("s5: hardcoded url for payment detail screen!");
                browser().navigateTo(urlHome + "#/payment/100");
            });
        
            it('the "Payment detail" screen', function() {
                element('header a').click();
                expect(browser().location().url()).toBe('/payment');
            });
        
            it ('Balance', function() {
                element('li a:eq(0)').click();
                expect(browser().location().url()).toBe('/');
            });
        
            it ('Go to Bank', function() {
                element('li a:eq(1)').click();
                expect(browser().location().url()).toBe('/');
            });
        
console.log("s5: not running test against 'messages' (can't trap 404 errors at the moment)!");
            xit ('Messages', function() {
                element('li a:eq(2)').click();
                expect(browser().location().url()).toBe('/');
            });
        
            it ('Settings', function() {
                element('li a:eq(3)').click();
                expect(browser().location().url()).toBe('/');
            });
        });   
    });
};

//
// Entry point - always assumes we are now in the screen we want to test.
//
// (NOTE: parameters always become strings when passed in like this, i.e.
//        boolean values must be checked against "true" and "false",
//        not true and false.)
//
function testScreen(arrIN){

    var screenNum = arrIN[0];
    var params = arrIN[1];
    
    switch(screenNum) {
        case "0": s0(params); break;
        case "1": s1(params); break;
        case "2": s2(params); break;
        case "3": s3(params); break;
        case "4": s4(params); break;
        case "5": s5(params); break;
    };
};