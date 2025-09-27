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

const url = `https://fakestoreapi.com/products`;
const displayProducts = async () => {
  const response = await fetch(url);
  const data = await response.json();
  const productsContainer =
    document.getElementsByClassName("products-container")[0];
  data.map((product) => {
    const product_name = product.title.split(" ").slice(0, 3).join(" ");

    const product_card = `
            <div class="product-card">
                <img src=${product.image} alt=${product.title}>
                <h4>${product_name}</h4>
                <p class="product-desc">${product.description}</p>
                <hr>
                <p>$${product.price}</p>
                <div>
                    <button>Details</button>
                    <button>Add to Cart</button>
                </div>
            </div>
        `;
    productsContainer.innerHTML += product_card;
  });
};

window.onload = displayProducts;

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
                        <img src=${product.image} alt=${product.title}>
                        <h4>${product_name}</h4>
                        <p class="product-desc">${product.description}</p>
                        <hr>
                        <p>$${product.price}</p>
                        <div>
                            <button>Details</button>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                `;
        productsContainer.innerHTML += product_card;
      });
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

categories.map((c) => {
  const card = `
    <div class="card">
        <img src=${c.img} alt=${c.title}>
        <p>${c.title}</p>
    </div>
  `;

  productsDiv.innerHTML += card;
});
