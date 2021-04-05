if (1 == 2) {
    var observer;
    var observerSet = false;
    var qtyElem;
    var fullPriceElem;
    var discountedPriceElem;
    var customShippingPriceElems;
    var checkoutTotalElem;
    var discount;
    var qty;
    var price = 99;

    document.querySelector('.sb-Pricing__wrapper__item.sb-Pricing__title h3').innerHTML = 
        `Only&nbsp;<span class="strikethrough" style="user-select: auto;">R150.00</span>&nbsp;R99`;
    document.querySelector('.board-measure span').innerHTML = `
        20cm`;
    document.querySelector('.board-measure-vertical span').innerHTML = `
        20cm`;

    var footerButton = document.querySelector('.sb-Footer-button');
    footerButton.addEventListener('click', function(evt) {
        setTimeout(function() {
            console.log('Timeout fired, on the boards page');
            initialiseVariables();
            calculateRands();
            if (observerSet == false) {
                observeCheckout();    
                observerSet = true;        
            }
       }, 1000);
    });

    function initialiseVariables() {
        qtyElem = document.querySelector('.sb-CheckoutInfo-checkoutInfoWrapper-checkoutInfo p span');
        checkoutInfoElem = document.querySelector('.sb-CheckoutInfo-checkoutInfoWrapper-checkoutInfo');
        fullPriceElem = document.querySelector('.sb-CheckoutInfo-checkoutInfoWrapper-checkoutInfo-fullPrice');
        discountedPriceElem = checkoutInfoElem.querySelector('p span:nth-child(2)');
        customShippingPriceElems = checkoutInfoElem.querySelectorAll('.customshipping__option__price');
        checkoutTotalElem = checkoutInfoElem.querySelector('.sb-CheckoutInfo-checkoutInfoWrapper-checkoutInfo-total span');
    }

    function calculateDiscount() {
        if (checkoutInfoElem != null) {
            if (fullPriceElem.innerHTML.indexOf('$') > -1) {
                discPriceVal = parseInt(discountedPriceElem.innerHTML.replace('$','').trim());
                fullPriceVal = parseInt(fullPriceElem.innerHTML.replace('$','').trim());
                discount = 1-(discPriceVal/fullPriceVal);
            }
        }
        return discount;
    }

    function updateQty() {
        qty = qtyElem.innerHTML[0];
        return qty;
    }

    function calculateRands() {
        if (!discount) {
            calculateDiscount();
        }
        updateQty();
        fullPriceElem.innerHTML = 'R'  + qty*price.toFixed(2);
        discountedPriceElem.innerHTML = 'R' + qty*price*discount.toFixed(2);
        customShippingPriceElems.forEach(element => {
           if (element.innerHTML.indexOf('$') > -1) {
             element.innerHTML = 'R100';
           }
        });
        checkoutTotalElem.innerHTML = 'R' + qty*discount*price.toFixed(2);
    }

    function observeCheckout() {
        // Qty mutation observer
        var target = document.querySelector('.sb-CheckoutInfo-checkoutInfoWrapper-checkoutInfo p span');
        observer = new MutationObserver(function(mutations) {
            console.log('Observer fired');
            mutations.forEach(function(mutation) {
              console.log('A mutation');
              console.log(mutation);
              console.log(target);
            });
            calculateRands();
        });
        var config = {
             subtree:true,
             attributes: false,
             childList: false,
             characterData: true
        };
        observer.observe(target, config);
    }
}
