let cartIcon = document.querySelector(".cart-icon");
let cart = document.querySelector(".cart");
let cartClose = document.querySelector(".close-cart");

//Cart Open
cartIcon.onclick = () => {
  cart.classList.add("active");
};

//Cart Close
cartClose.onclick = () => {
  cart.classList.remove("active");
};
//Cart Working JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//making function
function ready() {
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //quantity changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  //add to cart
  var addCart = document.getElementsByClassName("cart-btn");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  //buy button work
  document
    .getElementsByClassName("btn-co")[0]
    .addEventListener("click", buyButtonClicked);

  populateCart();
}

function populateCart() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    for (var i = 0; i < cart.length; i++) {
      var item = cart[i];
      addProductToCart(item.title, item.price, item.img, item.quantity);
    }
    updateTotal();
  }
}

//buy button
function buyButtonClicked() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}
//remove item from cart
function removeCartItem(event) {
  var buttonClicked = event.target;

  // Get the title of the item to be removed
  var itemTitle =
    buttonClicked.parentElement.getElementsByClassName("cart-product-title")[0]
      .innerText;

  // Remove the item from the DOM
  buttonClicked.parentElement.remove();

  // Get the cart from localStorage
  var cart = JSON.parse(localStorage.getItem("cart"));

  // Find the index of the item with the same title as the item to be removed
  var itemIndex = cart.findIndex((item) => item.title === itemTitle);

  // If the item was found in the cart
  if (itemIndex > -1) {
    // Remove the item from the cart
    cart.splice(itemIndex, 1);
  }

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the total
  updateTotal();
}

function updateCartQuantityDisplay() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  var totalQuantity = 0;

  for (var i = 0; i < cart.length; i++) {
    totalQuantity += parseInt(cart[i].quantity);
  }

  var quantityDisplay = document.querySelector(".quantity");
  quantityDisplay.innerText = totalQuantity;
}

//QUantity Changes
function quantityChanged(event) {
  var input = event.target;

  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }

  // Get the title of the item to be updated
  var itemTitle =
    input.parentElement.getElementsByClassName("cart-product-title")[0]
      .innerText;

  // Get the cart from localStorage
  var cart = JSON.parse(localStorage.getItem("cart"));

  // Find the index of the item with the same title as the item to be updated
  var itemIndex = cart.findIndex((item) => item.title === itemTitle);

  // If the item was found in the cart
  if (itemIndex > -1) {
    // Update the quantity of the item
    cart[itemIndex].quantity = input.value;
  }

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  updateTotal();
}

//add to cart
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("role-name")[0].innerText;
  var price = shopProducts.getElementsByClassName("role-price")[0].innerText;
  var img = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, img);
  updateTotal();

  saveCartToLocalStorage();
  updateCartQuantityDisplay();
}
function addProductToCart(title, price, img) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("Produk yang anda pilih sudah masuk kedalam keranjang");
      return;
    }
  }

  var cartBoxContent = `
                        <img src="${img}" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class='bx bxs-trash-alt cart-remove'></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

function saveCartToLocalStorage() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var cart = [];
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var imgElement = cartBox.getElementsByClassName("cart-img")[0]; // Get image element
    var title = titleElement.innerText;
    var price = parseFloat(priceElement.innerText.replace("Rp.", ""));
    var quantity = quantityElement.value;
    var imgSrc = imgElement.src; // Get image source URL
    cart.push({
      title: title,
      price: price,
      quantity: quantity,
      img: imgSrc, // Include image source URL in the cart object
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

//update total
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("Rp.", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "Rp." + total;
}

var popupViews = document.querySelectorAll(".popup-view");
var popupBtns = document.querySelectorAll(".popup-btn");
var closeBtns = document.querySelectorAll(".icon-close");

var popup = function (popupClick) {
  popupViews[popupClick].classList.add("active");
};

popupBtns.forEach((popupBtn, i) => {
  popupBtn.addEventListener("click", () => {
    popup(i);
  });
});

closeBtns.forEach((iconClose) => {
  iconClose.addEventListener("click", () => {
    popupViews.forEach((popupView) => {
      popupView.classList.remove("active");
    });
  });
});
