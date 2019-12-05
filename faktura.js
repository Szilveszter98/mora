// javascript för faktura
let fakturaDatum = document.querySelector(".fakturaDatum");
let forfalloDatum = document.querySelector(".forfalloDatum");
let kundnummer = document.querySelector(".kundnummer");
let fakturaNummer = document.querySelector(".fakturaNummer");
let kunderNamn = document.querySelector(".kunderNamn");
let kundersReferens = document.querySelector(".kunder-referens");
let kunderAddress = document.querySelector(".kunderAddress");
let summanTop = document.querySelector(".summan-top");
let proList = document.querySelector(".prolist");
let summanTable = document.querySelector(".summan-table");
let summanForeMoms = document.querySelector(".summaForeMoms");
let totalMoms = document.querySelector(".totalMoms");

var today = new Date();
let nummer = Number(Math.floor(Math.random() * 100000));
kundnummer.innerHTML = nummer;

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
fakturaDatum.innerHTML = today.toLocaleDateString("en-US");
forfalloDatum.innerHTML = today.addDays(30).toLocaleDateString("en-US");
fakturaNummer.innerHTML = today.valueOf();

// show data from localStorage
document.addEventListener("DOMContentLoaded", showData);

function showData() {
    let result = "";
    let total = 0;
    let cart = Storage.getCart();
    console.log(cart);
    let kundInfo = JSON.parse(localStorage.getItem("kundInfo"));
    kundersReferens.innerHTML = kundInfo[0];
    kunderNamn.innerHTML = kundInfo[1];
    kunderAddress.innerHTML = kundInfo[2];
    for (const element of cart) {
        total += element.amount * element.price;
    };
    summanForeMoms.innerHTML = total + " kr";
    totalMoms.innerHTML = total * 0.25 + " kr";
    summanTable.innerHTML = total + total * 0.25 + " kr";
    summanTop.innerHTML = total + total * 0.25 + " kr";

    for (const element of cart) {
        result += `<tr>
      <td>${element.item}</td>
      <td>${element.amount}</td>
      <td>st</td>
      <td>${element.price}</td>
      <td>25%</td>
      <td>${element.price*element.amount*0.25} kr</td>
      <td>${element.price*element.amount + element.price*element.amount*0.25} kr</td>
  </tr>`;
    }
    proList.innerHTML = result;
}


// localStorage function
class Storage {
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem("cart") ?
            JSON.parse(localStorage.getItem("cart")) : [];
    }
}



// print js
/* const printFaktura = document.querySelector("#printFaktura");
const fakturaContent = document.querySelector(".faktura");
printFaktura.addEventListener("click", () => { window.print(fakturaContent) });
 */

/* Print Faktura*/
function printDiv(printableArea) {
    var printContents = document.getElementById(printableArea).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}
/*Download direkt pdf*/
document.querySelector(".btn-pdf").addEventListener("click", function() {
    var doc = new jsPDF();

    doc.getElementById("printableArea", 10, 10)
    doc.viewerPreferences({ 'FitWindow': true }, true)
    doc.save("viewerPreferences.pdf")

})

window.onbeforeunload = function() {
    localStorage.clear();
}