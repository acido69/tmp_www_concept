'use strict';

//
// Fetch the test functions used for stepping through the application.
//
document.write("<script type='text/javascript' src='testSteps.js'></scr"+"ipt>");

//
// Now begin the tests ...
//
describe('Wallet App :: ', function() {

    var urlHome = "/app/index.html";
    
    // Always start at the top ...
    beforeEach(function() {
        browser().navigateTo(urlHome);
    });

    // Home page
    describe('HOME page', function() {
        it ('should contain some clickable coupons (offers?) along the top', function() {
            expect(repeater('.offers li a').count()).toBeGreaterThan(1);
        });
    });

    // VOUCHERS along the top.
    describe('VOUCHER links along the top', function() {
        
        it ('for each voucher', function() {
                       
            // Identifies the 'vouchers' (called 'offers' here?).
            var linkList = '.offers li a';
            
            // Run tests against each voucher listed across the top of the screen ...
            console.log('NEED TO FIND A WAY TO CHECK FOR SCROLLBAR!!');
            element(linkList).query(function (selectedElements, done) {
                
                selectedElements.each(function(idx,elm) {
            
                    //
                    // We need this info for all testSteps, so define them
                    // here and pass them in.
                    // 
                    
                    // create a jQuery selector string that will match this current voucher.
                    var thisVoucherSel = linkList + ':eq(' + idx + ')';
                    
                    // Typo in the app says "vouncher" instead of "voucher".
                    //expect(element(strElement).html()).toContain('voucher when you spend');
                    expect(element(thisVoucherSel).html()).toContain('vouncher when you spend');                    

                    // Clicking it should take you to the correct page.
                    // Get the last partof the path.
                    // ( 'this' is shorthand for 'selectElements[idx]' )
                    var thisVoucherURLFull = new String(this);
                    var thisVoucherURL = thisVoucherURLFull.slice(thisVoucherURLFull.indexOf("#")+1);

                    //
                    // Now run the test steps to cover every e2e possibility.
                    //
                    function runTests(arrIn){
                        testSteps(arrIn, urlHome, thisVoucherSel, thisVoucherURL);
                    };
                
                    runTests([1,2]); 
//                    runTests([1,3,5]);
//                    runTests([1,3,4,2]);
//                    runTests([1,3,4,3,5]);
//                    runTests([6,4,2]);
//                    runTests([6,4,3,5]);
//                    runTests([6,5]);
                        
                    // Return to the home level so we can try the next coupon.
                    browser().navigateTo(urlHome);
                });
                done();
            });
        });
    });
});