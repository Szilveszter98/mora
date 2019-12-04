/* // skapa variable
let cart = [];


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

let cartProducts = document.querySelector(".cart__products");

function addItemToCart() {
    let cartItemDIV = document.createElement("div");
    cartProducts.appendChild(cartItemDIV);
    cartItemDIV.classList.add("cart-item");
    let cart = Storage.getCart();

    for (const element of cart) {
        for (const property in element)
            cartItemDIV.innerHTML =
                `<span class="cart-item-title">${element.item}</span>
    <span class="cart-price">${element.price} kr</span>
    <input class="cart-quantity-input" type="number" min="1" value="1">
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
            if (amount <= 0) { alert("Amount måste större än 0") }
            else { cart[i].amount = amount; }
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
        return localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : [];
    }
}

<<<<<<< HEAD

 */




// javascript för faktura

// let fakturaDatum = document.querySelector(".fakturaDatum");
// let forfalloDatum = document.querySelector(".forfalloDatum");
// let kundnummer = document.querySelector(".kundnummer");
// let fakturaNummer = document.querySelector(".fakturaNummer");

// var today = new Date();


// let nummer= Number(Math.floor(Math.random() * 100000));
// fakturaNummer.innerHTML = nummer;

// Date.prototype.addDays = function (days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }
// fakturaDatum.innerHTML = today.toLocaleDateString("en-US");
// forfalloDatum.innerHTML = today.addDays(30).toLocaleDateString("en-US");
// kundnummer.innerHTML = today.valueOf();

// // print js
// const printFaktura = document.querySelector("#printFaktura");
// const fakturaContent = document.querySelector(".faktura");
// printFaktura.addEventListener("click", () => { window.print(fakturaContent) });

// Slut av javascript för faktura

function printDiv(printableArea) {
     var printContents = document.getElementById(printableArea).innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
}


var doc = new jsPDF();

doc.text('This is a test', 10, 10)
doc.viewerPreferences({'FitWindow': true}, true)
doc.save("viewerPreferences.pdf")




document.querySelector(".btn-pdf").addEventListener("click", function (){
    var doc = new jsPDF();

doc.text('This is a test', 10, 10)
doc.viewerPreferences({'FitWindow': true}, true)
doc.save("viewerPreferences.pdf")

})
/* var specialElementHandlers = {
    '#print-btn': function (element, renderer) {
        return true;
    }
};

$('#submit').click(function () {
    doc.fromHTML($('#printableArea').html(), 15, 15, {
        'width':     170,
            'elementHandlers': specialElementHandlers
    });
    doc.save('faktura.pdf');

}); */




=======
>>>>>>> f4d07b70409dc936997d855de36b7c875d17ff22
