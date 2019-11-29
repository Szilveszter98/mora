
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
                <input class="product-amount-input" type="number" value="${element.amount}">
            </div>
            <div class="product-right">
                <h3 class="product-price">${element.price} kr</h3>
                <button class="product-remove" type="button">REMOVE</button>
            </div>
        </div>
        <hr>`
    }
    productLista.innerHTML = result;
}


let btnFaktura = document.querySelector(".btn-faktura");
btnFaktura.addEventListener("click", uppdateCompanyInfo)

function uppdateCompanyInfo() {
    let referens = document.querySelector("#referens").value;
    let companyName = document.querySelector("#company_name").value;
    let companyAdress = document.querySelector("#company_adress").value;
    let cart = Storage.getCart()
    cart = [...cart, referens, companyName, companyAdress];
    Storage.saveCart(cart);
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

