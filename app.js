const SUPABASE_URL = "https://jqlcvgzivisddkmijqzs.supabase.co";
const SUPABASE_ANON_KEY = 'sb_publishable_6Rx3ZzmoLQ9JSCdS2Y0c0g_EXM1eQP8';

let products = [];
let cart = [];
const productsContainer = document.querySelector(".products");

async function fetchData() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }
  });

  const data = await response.json();
  console.log(data);
  products = data;
  displayProducts(products)
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const cartProduct = cart.find(p => p.id === productId);
  if (cartProduct) {
    cartProduct.quantity += 1;
  } else {
    cart.push({ title: product.title, price: product.price, image: quantity });
  }
  saveJsonCookie("cart", cart, 3600 * 24 * 7);
  console.log("Додано в кошик:", cart);
}


function createProductCard(product) {
  return `
          <div class="product-card">

          <div class="product-image" style="background-image: url('images/${product.image}');">
              <span class="badge">Бестселер</span>
              <span class="favorite">♡</span>
          </div>

          <div class="brand">${product.brand}</div>

          <h2>
              ${product.title}
          </h2>

          <p>
              ${product.description}
          </p>

          <div class="price">
              ${product.price}₴
          </div>

        </div>
            `

}


function displayProducts(products) {
  productsContainer.innerHTML = "";
  products.forEach(product => {
    const productCard = createProductCard(product);
    productsContainer.innerHTML += productCard;

  })
}


document.addEventListener("DOMContentLoaded", () => {
  fetchData();

})

