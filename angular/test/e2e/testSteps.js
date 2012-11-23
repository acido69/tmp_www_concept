'use strict';

// Click a voucher (thisSel) along the top of the home screen.
function testStep_1(urlHome, thisSel, thisURL){
    // Start at 'home' ...
    browser().navigateTo(urlHome);
    
    // ... then click the current voucher to start testing.
    element(thisSel).click();
    expect(browser().location().url()).toBe(thisURL);

};

// Click the "Read more" link on the voucher screen.
function testStep_2(urlHome, thisSel, thisURL){
    // Check the link's there as expected, then click it.
    expect(element('.info a').html()).toBe("Read more");
    element('.info a').click();

    // Takes you home at the moment.
        expect(browser().location().url()).toBe('/');
};

// Click the voucher name link at the top of the voucher screen.
function testStep_3(urlHome, thisSel, thisURL){
    
    // Takes you to the voucher list screen.
};

// Click the a voucher name in the voucher list screen.
function testStep_4(urlHome, thisSel, thisURL){
    
    // Takes you to the voucher screen for that voucher.
};

// Click the 'Coupons' link at the top of the voucher list screen.
function testStep_5(urlHome, thisSel, thisURL){
    
    // Takes you home at the moment.
};

// Click the 'See all' link in the home screen.
function testStep_6(urlHome, thisSel, thisURL){    
    // Start at 'home' ...
    browser().navigateTo(urlHome);
    
    // Takes you to the voucher list screen.
};


function testSteps(arrIN, urlHome, thisSel, thisURL){

    for (var i = 0; i < arrIN.length; i++) {
        switch(arrIN[i]) {
            case 1: testStep_1(urlHome, thisSel, thisURL); break;
            case 2: testStep_2(urlHome, thisSel, thisURL); break;
            case 3: testStep_2(urlHome, thisSel, thisURL); break;
            case 4: testStep_2(urlHome, thisSel, thisURL); break;
            case 5: testStep_2(urlHome, thisSel, thisURL); break;
            case 6: testStep_2(urlHome, thisSel, thisURL); break;
        };
    };

    // Always end back at the beginning.
    browser().navigateTo(urlHome);
};

