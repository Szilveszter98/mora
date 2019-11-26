const addToCartButtons = document.getElementsByClassName('card_btn')
for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}

function addToCartClicked(event) {
    const button = event.target
    const shopItem = button.parentElement
    const itemTitle = shopItem.getElementsByClassName('card_title')[0].innerText
    const itemPrice = shopItem.getElementsByClassName('price_text')[0].innerText
    const itemText = shopItem.getElementsByClassName('card_text')[0].innerText
    const fullPathImg = shopItem.getElementsByClassName('card_image')[1].src
    const pos = fullPathImg.indexOf("public");
    const imageSrc = fullPathImg.slice(pos);

    addItemToCart(itemTitle, itemPrice, imageSrc, itemText);
    updateCartTotal()
}

function addItemToCart(itemTitle, itemPrice, imageSrc, itemText) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartProducts = document.getElementsByClassName('cart__products')[0]
    var cartItemNames = cartProducts.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == itemTitle) {
            alert('This item is already added to the cart')
            return
        }
    }

    var cartRowContents = `
    <div class="cart-item">
        <span class="cart-item-title">${itemTitle}</span>
        <span class="cart-price">${itemPrice}</span>
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn-remove" type="button">REMOVE</button>
    </div>`




    cartRow.innerHTML = cartRowContents
    cartProducts.append(cartRow)
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

}


function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart__products')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('kr', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart_summa')[0].innerText = total + " kr"
}



function toInoivePageClicked() {
    var cartItems = document.getElementsByClassName('cart__products')[0]

    //  cartItems.length
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
        window.location.href = "index_kundkorg.html";
    }
    updateCartTotal()
}

// javascript för faktura

let fakturaDatum=document.querySelector(".fakturaDatum");
let forfalloDatum=document.querySelector(".forfalloDatum");
let kundnummer=document.querySelector(".kundnummer");
var today=new Date();
Date.prototype.addDays = function(days){
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
fakturaDatum.innerHTML= today.toLocaleDateString("en-US");
forfalloDatum.innerHTML = today.addDays(30).toLocaleDateString("en-US");
kundnummer.innerHTML = today.valueOf();

// print js
const printFaktura=document.querySelector("#printFaktura");
const fakturaContent=document.querySelector(".faktura");
printFaktura.addEventListener("click",()=>{window.print(fakturaContent)});

// Slut av javascript för faktura
