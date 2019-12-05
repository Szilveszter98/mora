// skapa variable
let cart = [];
let cartProducts = document.querySelector(".cart__products");
document.addEventListener("DOMContentLoaded", showIndexCart);

function showIndexCart() {
    let result = "";
    let cart = Storage.getCart();
    for (const element of cart) {
        result += `<div class="cart-item">
        <span class="cart-item-title">${element.item}</span>
        <span class="cart-price">${element.price} kr</span>
        <input class="cart-quantity-input" type="number" min="1" value="${element.amount}">
        <button class="btn-remove" type="button">REMOVE</button>
        </div>`
        cartProducts.innerHTML = result;
    }
    uppdateTotal();
    let removeButtons = document.querySelectorAll(".btn-remove");
    for (i = 0; i < removeButtons.length; i++) {
        let removeButton = removeButtons[i];
        removeButton.addEventListener("click", removeClicked);
    }
}

let addToCartButtons = document.querySelectorAll(".card_btn");
console.log(addToCartButtons)
    // loop alla köp button
for (i = 0; i < addToCartButtons.length; i++) {
    let addToCartbutton = addToCartButtons[i];
    addToCartbutton.addEventListener("click", addToCartClicked);

}

let product = {};

function addToCartClicked(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let item = shopItem.querySelector(".card_title").innerText;
    let cart = Storage.getCart();

    button.innerHTML = "I Kundvagn"



    for (i = 0; i < cart.length; i++) {
        if (item == cart[i].item) {
            console.log(i);
            cart[i].amount += 1;
            Storage.saveCart(cart);

            let items = document.querySelectorAll(".cart-item-title");
            for (i = 0; i < items.length; i++) {
                if (item == items[i].innerHTML) {
                    let cartitem = items[i].parentElement;
                    let amount = Number(cartitem.querySelector("input").value);
                    amount += 1;
                    cartitem.querySelector("input").value = amount;
                    uppdateTotal();
                }
            }
            return;
        }
    }
    let priceText = shopItem.querySelector(".price_text").innerText;
    let price = Number(priceText.split(" ")[1]);
    let descriptionText = shopItem.querySelector(".card_text").innerText;
    let description = descriptionText.split("•").join("");
    let imgSrc = shopItem.querySelector("img").src;
    product = {
        item,
        imgSrc,
        description,
        price,
        amount: 1
    }
    cart = [...cart, product];
    Storage.saveCart(cart);
    addItemToCart();
    uppdateTotal();
}

function addItemToCart() {
    let cartItemDIV = document.createElement("div");
    cartProducts.appendChild(cartItemDIV);
    cartItemDIV.classList.add("cart-item");
    let cart = Storage.getCart();
    for (const element of cart) {
        cartItemDIV.innerHTML =
            `<span class="cart-item-title">${element.item}</span>
    <span class="cart-price">${element.price} kr</span>
    <input class="cart-quantity-input" type="number" min="1" value="${element.amount}">
    <button class="btn-remove" type="button">REMOVE</button>`
    }

    let removeButtons = cartItemDIV.querySelectorAll(".btn-remove");
    for (i = 0; i < removeButtons.length; i++) {
        let removeButton = removeButtons[i];
        removeButton.addEventListener("click", removeClicked);
    }
    let amountInputs = cartProducts.querySelectorAll(".cart-quantity-input");
    console.log(amountInputs);
    for (i = 0; i < amountInputs.length; i++) {
        let amountInput = amountInputs[i];
        console.log(amountInput);
        amountInput.addEventListener("change", uppdateAmount);
    }
}

function removeClicked(event) {
    let removeButton = event.target;
    let removeItem = removeButton.parentElement;
    let item = removeItem.querySelector(".cart-item-title").innerText;
    let cart = Storage.getCart();
    for (i = 0; i < cart.length; i++) {
        if (cart[i].item == item) {
            cart.splice(i, 1);
        }
    }

    let mainMenuItems = document.querySelectorAll(".card_title")
    for (let i = 0; i < mainMenuItems.length; i++) {
        let mainMenuItem = mainMenuItems[i]
        console.log("loop through cards titles")
        if (mainMenuItem.innerHTML == item) {

            let mainMenuItemDiv = mainMenuItem.parentElement
            let cardBtn = mainMenuItemDiv.querySelector(".card_btn")
            cardBtn.innerHTML = "KÖP"
            console.log("card title match found")
        } else {
            console.log("card titles match is not found")
        }
    }


    Storage.saveCart(cart);
    removeItem.remove();
    uppdateTotal();
}


function uppdateTotal() {
    let total = 0;
    let cartItemDIVs = cartProducts.querySelectorAll(".cart-item");
    for (i = 0; i < cartItemDIVs.length; i++) {
        let priceText = cartItemDIVs[i].querySelector(".cart-price").innerText;
        let price = Number(priceText.split(" ")[0]);
        let amount = Number(cartItemDIVs[i].querySelector(".cart-quantity-input").value);
        total += (amount * price);
    }
    let cartSumma = document.querySelector("#cart__summa");
    cartSumma.innerHTML = total + " kr";
    localStorage.setItem("total", JSON.stringify(total));
}

function uppdateAmount(event) {
    console.log("hejhej");
    let amountInput = event.target;
    let changeItem = amountInput.parentElement;
    let amount = changeItem.querySelector(".cart-quantity-input").value;
    let item = changeItem.querySelector(".cart-item-title").innerText;
    let cart = Storage.getCart();
    for (i = 0; i < cart.length; i++) {
        if (cart[i].item == item) {
            if (amount <= 0) { alert("Amount måste större än 0") } else { cart[i].amount = amount; }
        }
    }
    Storage.saveCart(cart);
    uppdateTotal();
}


let checkoutButton = document.querySelector("#cart__chkout");
checkoutButton.addEventListener("click", checkoutToCart)

let productContainer = document.querySelector(".products-container");

function checkoutToCart() {
    window.document.location = "./kundvagn.html";
}


class Storage {
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem("cart") ?
            JSON.parse(localStorage.getItem("cart")) : [];
    }
}