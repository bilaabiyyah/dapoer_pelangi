function calculateTotalItems() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  var totalItems = 0;

  for (var i = 0; i < cart.length; i++) {
    totalItems += Number(cart[i].quantity);
  }

  return totalItems;
}

function calculateShippingCost(totalItems) {
  return totalItems > 50 ? 10000 : 0;
}

function calculateTotalPrice() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  var totalPrice = 0;

  for (var i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }

  return totalPrice;
}

function loadCartFromLocalStorage() {
  var cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    return;
  }

  var pesananContent = document.querySelector(".pesanan-content");

  pesananContent.innerHTML = "";

  for (var i = 0; i < cart.length; i++) {
    var productDiv = document.createElement("div");
    productDiv.style.display = "flex";
    productDiv.style.border = "1px solid #ddd";
    productDiv.style.marginBottom = "20px";
    productDiv.style.padding = "10px";
    productDiv.style.borderRadius = "5px";
    productDiv.style.alignItems = "center";
    productDiv.style.backgroundColor = "#f5f5f5";

    var imgElement = document.createElement("img");
    imgElement.src = cart[i].img;
    imgElement.style.width = "70px";
    imgElement.style.height = "70px";
    imgElement.style.objectFit = "cover";
    imgElement.style.marginRight = "20px";
    imgElement.style.borderRadius = "10px";
    productDiv.appendChild(imgElement);

    var nameDiv = document.createElement("div");
    nameDiv.style.flexGrow = "1";
    nameDiv.style.marginRight = "20px";

    var titleDiv = document.createElement("div");
    titleDiv.innerText = cart[i].title;
    titleDiv.style.fontWeight = "bold";
    nameDiv.appendChild(titleDiv);

    var quantityDiv = document.createElement("div");
    quantityDiv.innerText = "Quantity: " + cart[i].quantity;
    nameDiv.appendChild(quantityDiv);

    productDiv.appendChild(nameDiv);

    var priceDiv = document.createElement("div");
    priceDiv.innerText = "Rp." + cart[i].price * cart[i].quantity + "/Pcs";
    priceDiv.style.fontWeight = "bold";
    productDiv.appendChild(priceDiv);

    pesananContent.appendChild(productDiv);
  }

  var totalItems = calculateTotalItems();
  var shippingCost = calculateShippingCost(totalItems);
  var totalPrice = calculateTotalPrice() + shippingCost;

  var totalItemsDiv = document.createElement("div");
  totalItemsDiv.style.marginTop = "5px";
  totalItemsDiv.style.padding = "10px";
  totalItemsDiv.style.fontWeight = "bold";
  totalItemsDiv.style.wordSpacing = "1px";
  totalItemsDiv.innerText = "Total Items  : " + totalItems;
  pesananContent.appendChild(totalItemsDiv);

  var totalPriceDiv = document.createElement("div");
  totalPriceDiv.style.marginTop = "5px";
  totalPriceDiv.style.padding = "10px";
  totalPriceDiv.style.fontWeight = "bold";
  totalPriceDiv.style.wordSpacing = "1px";
  totalPriceDiv.innerText = "Total Price  : Rp." + totalPrice;
  pesananContent.appendChild(totalPriceDiv);

  var shippingCostDiv = document.createElement("div");
  shippingCostDiv.style.marginTop = "5px";
  shippingCostDiv.style.padding = "10px";
  shippingCostDiv.style.fontWeight = "bold";
  shippingCostDiv.style.wordSpacing = "1px";
  shippingCostDiv.innerText = "Ongkos Kirim : Rp." + shippingCost;
  pesananContent.appendChild(shippingCostDiv);

  // calculate grand total
  var grandTotal = totalPrice + shippingCost;

  var grandTotalDiv = document.createElement("div");
  grandTotalDiv.style.marginTop = "5px";
  grandTotalDiv.style.padding = "10px";
  grandTotalDiv.style.fontWeight = "bold";
  grandTotalDiv.innerText = "TOTAL    : Rp." + grandTotal;
  pesananContent.appendChild(grandTotalDiv);
}

loadCartFromLocalStorage();
