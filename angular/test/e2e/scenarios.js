'use strict';

// Global because I'm going to need these all over the place.
var urlHome = "/app/index.html";
var p_tr = "";


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
                case "c": testClick([Num, Params]);break;
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
    runTests(['s0','c12','c14','c19']); 
    // Screens ...
    runTests(['s0','c12','s4']);            // Payment list.
    runTests(['s0','c12','c14(1)','s5']);   // Payment detail.
});


console.log("FINISHED!");