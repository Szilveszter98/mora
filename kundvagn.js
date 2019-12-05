
document.addEventListener("DOMContentLoaded", showCart)
let productLista = document.querySelector(".product-lista");

console.log("hej från kundvang")

function showCart() {
    let result = "";
    let cart = Storage.getCart();
    console.log(cart);
    for (const element of cart) {
        result += `<div class="product-single">
            <img src="${element.imgSrc}" alt="product image">
            <div class="product-center">
                <h3 class="product-title">${element.item}</h3>
                <p class="product-description">${element.description}</p>
                <input class="product-amount-input" type="number" min="1" value="${element.amount}">
            </div>
            <div class="product-right">
                <h3 class="product-price">${element.price} kr</h3>
                <button class="product-remove" type="button">REMOVE</button>
            </div>
        </div>
        <hr>`
    }
    productLista.innerHTML = result;
    let productTotal=document.querySelector(".product-total");
    productTotal.innerHTML=JSON.parse(localStorage.getItem("total"));
    let removeButtons = productLista.querySelectorAll(".product-remove");
    for (i = 0; i < removeButtons.length; i++) {
        let removeButton = removeButtons[i];
        removeButton.addEventListener("click", removeClicked);
        console.log(i);
    }
    let amountInputs = productLista.querySelectorAll(".product-amount-input");
    console.log(amountInputs);
    for (i = 0; i < amountInputs.length; i++) {
        let amountInput = amountInputs[i];
        console.log(amountInput);
        amountInput.addEventListener("change", uppdateAmount);
    }
}

function removeClicked(event) {
    console.log("hej")
    let removeButton = event.target;
    let removeItem = removeButton.parentElement.parentElement;
    let item = removeItem.querySelector(".product-title").innerText;
    let cart = Storage.getCart();
    for (i=0; i<cart.length; i++) {
        if (cart[i].item == item) {
            console.log(i);
            cart.splice(i, 1);
        }
    }
    Storage.saveCart(cart);
    removeItem.remove();
    uppdateTotal();
}

function uppdateAmount(event) {
    console.log("hejhej");
    let amountInput = event.target;
    let changeItem = amountInput.parentElement;
    let amount = changeItem.querySelector("input").value;
    let item = changeItem.querySelector(".product-title").innerText;
    let cart = Storage.getCart();
    for (i = 0; i < cart.length; i++) {
        if (cart[i].item == item) {
            if (amount <= 0) { alert("Amount måste större än 0") }
            else { cart[i].amount = amount; }
        }
    }
    Storage.saveCart(cart);
    uppdateTotal();
}

function uppdateTotal() {
    let total = 0;
    console.log("hej");
    let productSingleDIVs = document.querySelectorAll(".product-single");
    for (i = 0; i < productSingleDIVs.length; i++) {
        let priceText = productSingleDIVs[i].querySelector(".product-price").innerText;
        let price = Number(priceText.split(" ")[0]);
        let amount = Number(productSingleDIVs[i].querySelector(".product-amount-input").value);
        total += (amount * price);
    }
    let productTotal = document.querySelector(".product-total");
    productTotal.innerHTML = total;
    localStorage.setItem("total", JSON.stringify(total));
    if (total == 0) {
        btnFaktura.disabled = true
        btnFaktura.innerHTML = "Inga Tjänster"
        console.log("Disabled")

    } else {
        btnFaktura.disabled = false
        console.log("abled")
        btnFaktura.innerHTML = "Faktura"
    }
}


let btnFaktura = document.querySelector(".btn-faktura");
btnFaktura.addEventListener("click", uppdateCompanyInfo)

function uppdateCompanyInfo() {
    let referens = document.querySelector("#referens").value;
    let companyName = document.querySelector("#company_name").value;
    let companyAdress = document.querySelector("#company_adress").value;
    let kundInfo=[];
    kundInfo = [referens, companyName, companyAdress];
    localStorage.setItem("kundInfo", JSON.stringify(kundInfo));
    window.document.location = "./faktura.html";
}




class Storage {
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : [];
    }
}

