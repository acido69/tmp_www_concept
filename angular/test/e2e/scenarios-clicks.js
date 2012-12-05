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


function testClick(arrIN){

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
