'use strict';

// Global because I'm going to need these all over the place.
var urlHome = "/app/index.html";
var p_tr = "";

//
// Fetch the test functions.
// 
// PROBLEM: After an hour of trying to just include a js file containing js 
//          functions and use them outside of an 'it', I'm giving up and just 
//          putting all the test functions in this one huge script. ;(
//
//$("head").append('<script type="text/javascript" src="testSteps.js"></script>');
//$("head").append('<script type="text/javascript" src="testScreens.js"></script>');
//
// ... or ...
// 
//document.write("<script type='text/javascript' src='testSteps.js'></scr"+"ipt>");
//document.write("<script type='text/javascript' src='testScreens.js'></scr"+"ipt>");
document.write("<script type='text/javascript' src='jquery-1.8.3.min.js'></script>");

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


//
//------------------------------------------------------------------------------
//
// STEP / CLICK TESTS.
//

// Click a voucher (thisSel) along the top of the home screen.
function c1(p_num){
    
    describe(p_tr + 'c1 : Clicking a coupon from the list in the home screen', function() {
        var elementSel = ".offers li a";

        if (p_num) {
            elementSel += ":eq(" + p_num + ")";
        };
    
        it('takes us to the expected screen', function() {
            element(elementSel).click();
            expect(browser().location().url()).toBe('/coupon/100');
        });
    });

};

// Click the "Read more" link on the coupon detail screen.
function c2(){
    describe(p_tr + 'c2 : The "Read more" link in the coupon detail screen', function() {
        it('takes you to the expected screen', function() {
            expect(element('.info .more').html()).toBe("Read more");
            element('.info a').click();
            expect(browser().location().url()).toBe('/');
        });
    });
};

// Click the coupon name link at the top of the coupon detail screen.
function c3(){
    describe(p_tr + 'c3 : The voucher name link in the header of the coupon detail screen', function() {
        it('takes you to the expected screen', function() {
            expect(element('.info .more').html()).toBe("Read more");
            element('header a').click();
            expect(browser().location().url()).toBe('/coupons');
        });
    });
};

// Click a coupon name in the coupons screen.
function c4(p_num){
    describe(p_tr + 'c4 : Clicking a coupon name in the coupons screen', function() {
        it('takes you to the expected screen', function() {
            var elementSel = ".card a";
    
            if (p_num) {
                elementSel += ":eq(" + p_num + ")";
            };
    
            // Compare coupon name in the link to coupon name on the next page.
            //
            element(elementSel).query(function(x, done) {
                x.each(function(idx,elm) {
                    
                    element(elementSel).click();
                    expect(binding('coupon.name')).toBe($(this).text().replace(/\n +/g,''));
                    
                    return false; // Only do this once.
                    
                });
                done();
            });
        });
    });
};

// Click the 'Coupons' link at the top of the coupons screen.
function c5(){
    describe(p_tr + 'c5 : Clicking the "Coupons" link in the coupons screen', function() {
        it('takes you to the expected screen', function() {
            element('header a').click();
            expect(browser().location().url()).toBe('/');
        });
    });
};

// Click the 'See all' link in the home screen.
function c6(){
    describe(p_tr + 'c6 : Clicking the "See all" link in the home screen', function() {
        it('takes you to the expected screen', function() {
            element('.show-all').click();
            expect(browser().location().url()).toBe('/coupons');
        });
    });
};

// Click the 'Money' link in the home screen.
function c7(){
    describe(p_tr + 'c7 : Clicking the "Money" link in the home screen', function() {
        it('takes you to the expected screen', function() {
            element('#money').click();
            expect(browser().location().url()).toBe('/');
        });
    });
};

// Click the 'Transactions' link in the home screen.
function c8(){
    describe(p_tr + 'c8 : Clicking the "Transactions" link in the home screen', function() {
        it('takes you to the expected screen', function() {
            element('#transaction').click();
            expect(browser().location().url()).toBe('/');
        });
    });
};

// Click the 'Messages' link in the home screen.
function c9(){
    describe(p_tr + 'c9 : Clicking the "Messages" link in the home screen', function() {
        it('takes you to the expected screen', function() {
            element('#message').click();
            expect(browser().location().url()).toBe('/');
        });
    });
};

// Click the 'Loyalty' link in the home screen.
function c10(){
    describe(p_tr + 'c10 : Clicking the "Loyalty" link in the home screen', function() {
        it('takes you to the expected screen', function() {
            element('#loyalty').click();
            expect(browser().location().url()).toBe('/');
        });
    });
};

// Click the 'Coupons' link in the home screen.
function c11(){
    describe(p_tr + 'c11 : Clicking the "Coupons" link in the home screen', function() {
        it('takes you to the expected screen', function() {
            element('#coupon').click();
            expect(browser().location().url()).toBe('/coupons');
        });
    });
};

// Click the 'Payment' link in the home screen.
function c12(){
    console.log("c12: '#paryment' should be '#payment'.");
    describe(p_tr + 'c12 : Clicking the "Payment" link in the home screen', function() {
        it('takes you to the expected screen', function() {
            element('#paryment').click();
            expect(browser().location().url()).toBe('/payment');
        });
    });
};

// Click the 'Payment' link in the payment screen.
function c13(){
    describe(p_tr + 'c13 : Clicking the "Payment" link in the payment screen', function() {
        it('takes you to the expected screen', function() {
            element('header a').click();
            expect(browser().location().url()).toBe('/');
        });
    });
};

// Click a card in the payment screen.
function c14(p_num){
    describe(p_tr + 'c14 : Clicking a card in the payment screen', function() {
        
        var elementSel = "li a";

        if (p_num) {
            elementSel += ":eq(" + p_num + ")";
        };
    
        it('takes you to the expected screen', function() {
            expect(browser().location().url()).toBe('/payment');

            element(elementSel).query(function (selectedElements, done) {
                selectedElements.each(function(idx,elm) {
                    var clickedHref = $(this).attr("href").replace(/./,'/');
                    element(elementSel).click();
                    expect(browser().location().url()).toBe(clickedHref);
                    
                    return false; // We only need to do this once.
                });
                done();
            });
        });
    });
};

// Click the card number at the top of the payment/:id screen.
function c15(){
    describe(p_tr + 'c15 : Clicking the card number at the top of the payment/:id screen', function() {
        it('takes you to the expected screen', function() {
            element('header a').click();
            expect(browser().location().url()).toBe('/payment');
        });
    });
};

// Click the "Balance" link in the payment/:id screen.
function c16(){
    describe(p_tr + 'c16 : Clicking the "Balance" link in the payment/:id screen', function() {
        it('takes you to the expected screen', function() {

            expect(browser().location().url()).toContain('/payment');
            
            var elementSel = 'li a';
            element(elementSel).query(function (selectedElements, done) {
                selectedElements.each(function(idx,elm) {
                    if ( $(this).text() === "Balance" ) { // Only interested in this one.
                        var clickedHref = $(this).attr("href").replace(/./,'/');
                        element('li a:eq(' + idx + ')').click();
                        expect(browser().location().url()).toBe(clickedHref);
                    }
                });
                done();
            });
        });
    });
};

// Click the "Go to Bank" link in the payment/:id screen.
function c17(){
    describe(p_tr + 'c17 : Clicking the "Go to Bank" link in the payment/:id screen', function() {
        it('takes you to the expected screen', function() {

            expect(browser().location().url()).toContain('/payment');
            
            var elementSel = 'li a';
            element(elementSel).query(function (selectedElements, done) {
                selectedElements.each(function(idx,elm) {
                    if ( $(this).text() === "Go to Bank" ) { // Only interested in this one.
                        var clickedHref = $(this).attr("href").replace(/./,'/');
                        element('li a:eq(' + idx + ')').click();
                        expect(browser().location().url()).toBe(clickedHref);
                    }
                });
                done();
            });
        });
    });
};

// Click the "Settings" link in the payment/:id screen.
function c18(){
    describe(p_tr + 'c18 : Clicking the "Settings" link in the payment/:id screen', function() {
        it('takes you to the expected screen', function() {

            expect(browser().location().url()).toContain('/payment');
            
            var elementSel = 'li a:eq(0)';
            element(elementSel).query(function (selectedElements, done) {
                selectedElements.each(function(idx,elm) {
                    if ( $(this).text() === "Settings" ) { // Only interested in this one.
                        var clickedHref = $(this).attr("href").replace(/./,'/');
                        element('li a:eq(' + idx + ')').click();
                        expect(browser().location().url()).toBe(clickedHref);
                    }
                });
                done();
            });
        });
    });
};

// Click the "Messages" link in the payment/:id screen.
function c19(){
    describe(p_tr + 'c19 : Clicking the "Messages" link in the payment/:id screen', function() {
        it('takes you to the expected screen', function() {
        
            expect(browser().location().url()).toContain('/payment');
            
            var elementSel = 'li a';
            element(elementSel).query(function (selectedElements, done) {
                selectedElements.each(function(idx,elm) {
                    if ( $(this).text() === "Messages" ) { // Only interested in this one.
                        var clickedHref = $(this).attr("href").replace(/./,'/');
                        element('li a:eq(' + idx + ')').click();
                        expect(browser().location().url()).toBe(clickedHref);
                    }
                });
                done();
            });
        });
    });
};


function testStep(arrIN){

    var stepNum = arrIN[0];
    var params = arrIN[1];
    switch(stepNum) {
            case "1" : c1(params); break;
            case "2" : c2(params); break;
            case "3" : c3(params); break;
            case "4" : c4(params); break;
            case "5" : c5(params); break;
            case "6" : c6(params); break;
            case "7" : c7(params); break;
            case "8" : c8(params); break;
            case "9" : c9(params); break;
            case "10": c10(params); break;
            case "11": c11(params); break;
            case "12": c12(params); break;
            case "13": c13(params); break;
            case "14": c14(params); break;
            case "15": c15(params); break;
            case "16": c16(params); break;
            case "17": c17(params); break;
            case "18": c18(params); break;
            case "19": c19(params); break;
        };
};




//==============================================================================
//
// Now begin running the tests ...
//
describe('Wallet App :: ', function() {

    function runTests(arrIN){
        p_tr = "[" + arrIN + "] -> ";
        
        //
        // Step through each option and send it to the
        // corresponding test function ...
        //
        for (var i = 0; i < arrIN.length; i++) {
            var Type    = arrIN[i].charAt(0);
            var tmp     = arrIN[i].substr(1);
                tmp     = tmp.split("(");
            var Num     = tmp[0];
            var Params  = tmp[1] ? tmp[1].substr(0, tmp[1].length-1) : ""; // remove bracket.
            switch(Type) {
                case "c": testStep([Num, Params]);break;
                case "s": testScreen([Num, Params]);break;
            };
        };
    };

console.log('TODO 1: FIND A WAY TO CHECK FOR SCROLLBARS.');
console.log('TODO 2: FIND A WAY TO CHECK FOR "404 page not found".');


    //
    // Test e2e steps for every combination of lick clicks and screens.
    // (start in home screen each time).
    //
    // COUPONS
    // Links ...    
    runTests(['s0','c1(1)']);
    runTests(['s0','c1','c2']);
    runTests(['s0','c1','c3','c5']);
    runTests(['s0','c1','c3','c4','c2']);
    runTests(['s0','c1','c3','c4','c3','c5']);
    runTests(['s0','c6','c4','c2']);
    runTests(['s0','c6','c4','c3','c5']);
    runTests(['s0','c6','c5']);
    // Screens ...
    runTests(['s1']);                           // Home screen.
    runTests(['s0','c1(1)','s2(!YOU Sushi)']);  // Coupon detail screen.
    runTests(['s0','c6','s3']);                 // Coupons screen.

    // PAYMENTS
    // Links ...
    runTests(['s0','c7']);
    runTests(['s0','c8']);
    runTests(['s0','c9']);
    runTests(['s0','c10']);
    runTests(['s0','c12','c13']);
    runTests(['s0','c12','c14','c15']);
    runTests(['s0','c12','c14','c16']);
    runTests(['s0','c12','c14','c17']);
    runTests(['s0','c12','c14','c18']);
    runTests(['s1','c12','c14','c19']); 
    // Screens ...
    runTests(['s0','c12','s4']);            // Payment list.
    runTests(['s0','c12','c14(1)','s5']);   // Payment detail.
});


console.log("FINISHED!");