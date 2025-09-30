const navlinksul = document.getElementById("navlinks");

const title = document.getElementById("title");
title.addEventListener("click", () => {
  window.location.href = "./index.html";
});

let navtabs = ["Home", "Products", "About", "Contact"];

navtabs.map((link) => {
  const list_item = document.createElement("li");
  const anchor = document.createElement("a");
  anchor.innerText = link;

  let href =
    link.toLowerCase() === "home"
      ? "./index.html"
      : `./${link.toLowerCase()}.html`;

  anchor.setAttribute("href", href);

  if (window.location.pathname.endsWith(href.replace("./", ""))) {
    anchor.addEventListener("click", (e) => e.preventDefault());
  }
  list_item.append(anchor);
  navlinksul.appendChild(list_item);
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let allProducts = [];

const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Cart saved to localStorage:", cart);

  updateCartCount();
};

const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const uniqueProducts = cart.length;

  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = uniqueProducts;
  }
};

const addProductEventListeners = () => {
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      try {
        const productId = parseInt(e.target.getAttribute("data-product-id"));
        const product = allProducts.find((p) => p.id === productId);
        if (product) {
          addToCart(product);
        } else {
          console.error("Product not found with ID:", productId);
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    });
  });
  const detailsBtns = document.querySelectorAll(".details-btn");
  detailsBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-product-id");
      showProductDetails(productId);
    });
  });
};

const escapeHtml = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

const decodeHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const showProductDetails = (productId) => {
  window.location.href = `./product-details.html?id=${productId}`;
};

const url = `https://fakestoreapi.com/products`;
const displayProducts = async () => {
  const response = await fetch(url);
  const data = await response.json();
  allProducts = data;
  const productsContainer =
    document.getElementsByClassName("products-container")[0];
  data.map((product) => {
    const product_name = product.title.split(" ").slice(0, 3).join(" ");

    const product_card = `
            <div class="product-card">
                <img src=${product.image} alt="${escapeHtml(product.title)}">
                <h4>${product_name}</h4>
                <p class="product-desc">${product.description}</p>
                <hr>
                <p>$${product.price}</p>
                <div>
                    <button class="details-btn" data-product-id="${
                      product.id
                    }">Details</button>
                    <button class="add-to-cart-btn" data-product-id="${
                      product.id
                    }">Add to Cart</button>
                </div>
            </div>
        `;
    productsContainer.innerHTML += product_card;
  });
  addProductEventListeners();
};

window.onload = () => {
  displayProducts();
  updateCartCount();
};

let filteredProducts = [];

const filterCategories = document.querySelectorAll(".products-category>li");

const allCategory = [...filterCategories].find(
  (category) => category.innerText === "All"
);
if (allCategory) {
  allCategory.addEventListener("click", () => {
    const productsContainer =
      document.getElementsByClassName("products-container")[0];
    productsContainer.innerHTML = "";
    displayProducts();
  });
}

filterCategories.forEach((category) => {
  if (category.innerText == "All") return;
  category.addEventListener("click", async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      const filteredArray = data.filter((d) => {
        if (category.innerText.toLowerCase() === "men's clothing") {
          return d.category === "men's clothing";
        }
        return d.category
          .toLowerCase()
          .includes(category.innerText.toLowerCase());
      });

      const productsContainer =
        document.getElementsByClassName("products-container")[0];
      productsContainer.innerHTML = "";

      filteredArray.map((product) => {
        const product_name = product.title.split(" ").slice(0, 3).join(" ");

        const product_card = `
                    <div class="product-card">
                        <img src=${product.image} alt="${escapeHtml(
          product.title
        )}">
                        <h4>${product_name}</h4>
                        <p class="product-desc">${product.description}</p>
                        <hr>
                        <p>$${product.price}</p>
                        <div>
                            <button class="details-btn" data-product-id="${
                              product.id
                            }">Details</button>
                            <button class="add-to-cart-btn" data-product-id="${
                              product.id
                            }">Add to Cart</button>
                        </div>
                    </div>
                `;
        productsContainer.innerHTML += product_card;
      });
      addProductEventListeners();
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  });
});

const categories = [
  {
    img: "./assets/images/womens_clothing.jpeg",
    title: "Women's Clothing",
  },
  {
    img: "./assets/images/mens_clothing.jpeg",
    title: "Men's Clothing",
  },
  {
    img: "./assets/images/jeweleries.webp",
    title: "Jewelery",
  },
  {
    img: "./assets/images/electronics.jpeg",
    title: "Electronics",
  },
];

const productsDiv = document.getElementById("productCategory");

if (productsDiv) {
  categories.map((c) => {
    const card = `
      <div class="card">
          <img src=${c.img} alt=${c.title}>
          <p>${c.title}</p>
      </div>
    `;

    productsDiv.innerHTML += card;
  });
}

const getCartData = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

const clearCart = () => {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
};
