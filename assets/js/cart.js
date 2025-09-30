const displayCartItems = () => {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const productsTotal = document.getElementById("products-total");

  if (!cartItemsContainer) return;

  if (cartData.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <h2 style="font-size: 2.5rem; color: #666; margin-bottom: 30px; font-weight: 300;">Your Cart is Empty</h2>
        <button onclick="window.location.href='products.html'" style="
          background-color: #f8f9fa; 
          border: 2px solid #ddd; 
          padding: 12px 25px; 
          border-radius: 5px; 
          font-size: 16px; 
          cursor: pointer; 
          color: #666;
          transition: all 0.3s ease;
        " onmouseover="this.style.backgroundColor='#e9ecef'; this.style.borderColor='#adb5bd';" onmouseout="this.style.backgroundColor='#f8f9fa'; this.style.borderColor='#ddd';">
          <i class="fas fa-arrow-left" style="margin-right: 8px;"></i>Continue Shopping
        </button>
      </div>
    `;
    if (cartTotal) cartTotal.textContent = "$30.00";
    if (productsTotal) productsTotal.textContent = "$0.00";
    return;
  }

  let total = 0;
  cartItemsContainer.innerHTML = "";

  cartData.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = `
      <div class="item-card">
        <img src="${item.image}" alt="${item.title}" style="width: 80px; height: 80px; object-fit: cover;">
        <p><strong>${item.title}</strong></p>
        <div class="right">
          <p>
            <button onclick="updateCartQuantity(${index}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateCartQuantity(${index}, 1)">+</button>
          </p>
          <p>${item.quantity} x $${item.price}</p>
        </div>
      </div>
    `;

    cartItemsContainer.innerHTML += cartItem;
  });

  const shipping = 30.0;
  const finalTotal = total + shipping;

  if (productsTotal) productsTotal.textContent = `$${total.toFixed(2)}`;
  if (cartTotal) cartTotal.textContent = `$${finalTotal.toFixed(2)}`;
};

const updateCartQuantity = (index, change) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index]) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    if (typeof updateCartCount === "function") {
      updateCartCount();
    }
  }
};

window.updateCartQuantity = updateCartQuantity;

document.addEventListener("DOMContentLoaded", () => {
  if (
    window.location.pathname.includes("cart.html") ||
    document.getElementById("cart-items")
  ) {
    displayCartItems();
  }
  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
});

window.addEventListener("load", () => {
  if (document.getElementById("cart-items")) {
    displayCartItems();
  }
});
