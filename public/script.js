/* Image Filter Section */

const allFilterItems = document.querySelectorAll('.filter-item');
const allFilterBtns = document.querySelectorAll('.filter-btn');

window.addEventListener('DOMContentLoaded', () => {
    allFilterBtns[1].classList.add('active-btn');
});

allFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        showFilteredContent(btn);
    });
});

function showFilteredContent(btn){
    allFilterItems.forEach((item) => {
        if(item.classList.contains(btn.id)){
            resetActiveBtn();
            btn.classList.add('active-btn');
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function resetActiveBtn(){
    allFilterBtns.forEach((btn) => {
        btn.classList.remove('active-btn');
    });
}


/* Shopping Cart Section */
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded' , ready);
}

else{
    ready();
}


 function ready(){
    var removeCartItemButton = document.getElementsByClassName('btn-danger');
    for (var i = 0 ; i < removeCartItemButton.length; i++){
        var button = removeCartItemButton[i];
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0 ;i < quantityInputs.length ; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    
    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for(var i = 0; i< addToCartButtons.length; i++){
        var button = addToCartButtons[i];
        button.addEventListener('click',addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
 /* Call loadCartFromLocalStorage in your ready function to populate the cart with previously saved data. */
 loadCartFromLocalStorage(); // Load cart from local storage
}


 function purchaseClicked(){
     alert('Thank you for your purchase!!!');
     var cartItems = document.getElementsByClassName('cart-items')[0];
     while(cartItems.hasChildNodes()){
         cartItems.removeChild(cartItems.firstChild)
     }
     /* Save to local storage */
     saveCartToLocalStorage(); // Save state to local storage
     updateCartTotal();
 }

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    /* Research code to save to local storage */
    saveCartToLocalStorage(); // Save state to local storage
    updateCartTotal();
    
}

function  quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0 ){
        input.value = 1;
    }
    /* Save to local storage */
    saveCartToLocalStorage(); // Save state to local storage
    updateCartTotal();
}


function addToCartClicked(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title,price,imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('tr');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');

    for (i = 0; i< cartItemNames.length ; i++){
        if(cartItemNames[i].innerText == title){
            alert('This item already has added to the cart!');
            return
        }
    }
    var cartRowContents = `

        <td class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="50" height="50">
            <span class="cart-item-title">${title}</span>                  
        </td>
        <td class="cart-item cart-column">
            <span class="cart-price cart-column">${price}</span>
        </td>
        <td class="cart-item cart-column">
            <input class="cart-quantity-input" type="number" value="1" style="width: 50px">
            <button class="btn btn-danger" type="button">Remove</button>
        </td>        
    `;
     
            
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    /*Section of 2  */
    saveCartToLocalStorage(); // Save state to local storage
}
/*  Code to Save on local storage so we can access fuctions on all webpages chatGpt  */
function saveCartToLocalStorage() {
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItems.getElementsByClassName('cart-row');
    var cartArray = [];

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var title = cartRow.getElementsByClassName('cart-item-title')[0].innerText;
        var price = cartRow.getElementsByClassName('cart-price')[0].innerText.replace('R ', '');
        var quantity = cartRow.getElementsByClassName('cart-quantity-input')[0].value;
        var imageSrc = cartRow.getElementsByClassName('cart-item-image')[0].src;

        cartArray.push({ title, price, quantity, imageSrc });
    }

    localStorage.setItem('cart', JSON.stringify(cartArray));
}

/*  End of first section */
/* Second Section */
function loadCartFromLocalStorage() {
    var cartArray = JSON.parse(localStorage.getItem('cart')) || [];

    cartArray.forEach(item => {
        addItemToCart(item.title, item.price, item.imageSrc, item.quantity);
    });
}
/* End of Second section */

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0 ; i< cartRows.length ; i++){
        var cartRow =cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('R ' , ''))
        var quantity = quantityElement.value;
        total = total + (price * quantity);
         
    }
    total = Math.round(total * 100 )/100;
    document.getElementsByClassName('cart-total-price')[0].innerText = 'R '+ total + '.00';

}

/* Notes */
/*
Save Cart to Local Storage: Add items, remove items, 
or update quantities, and then save the cart state.
Load Cart from Local Storage: When the page loads, 
populate the cart with previously saved items.
With these changes, your cart data will persist 
across page reloads, making for a more robust 
user experience.

*/
