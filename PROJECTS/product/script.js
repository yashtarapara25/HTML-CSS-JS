const products = [
  { id: 1, name: "Wireless Earbuds", price: 999, img: "earbuds.jpg" },
  { id: 2, name: "Smart Watch", price: 1499, img: "watch.jpg" },
  { id: 3, name: "USB Charger", price: 399, img: "charger.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || {};

const productContainer = document.getElementById("products");
const cartCount = document.getElementById("cart-count");
const cartBox = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function renderProducts() {
  productContainer.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productContainer.appendChild(div);
  });
}

function addToCart(id) {
  if (!cart[id]) {
    const product = products.find(p => p.id === id);
    cart[id] = { ...product, quantity: 1 };
  } else {
    cart[id].quantity += 1;
  }
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  Object.values(cart).forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <span>${item.name}</span>
      <div class="quantity">
        <button onclick="changeQty(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    `;
    cartItems.appendChild(itemDiv);
  });

  cartTotal.textContent = total;
  cartCount.textContent = count;
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].quantity += delta;
  if (cart[id].quantity <= 0) {
    delete cart[id];
  }
  saveCart();
  updateCartUI();
}

function toggleCart() {
  cartBox.classList.toggle("hidden");
}

function clearCart() {
  cart = {};
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Init
renderProducts();
updateCartUI();
