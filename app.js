const SUPABASE_URL = "https://jqlcvgzivisddkmijqzs.supabase.co";
const SUPABASE_ANON_KEY = 'sb_publishable_6Rx3ZzmoLQ9JSCdS2Y0c0g_EXM1eQP8';

let products = [];
let favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")): [];
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
              <span class="badge">${product.category}</span>
              <span class="favorite ${favorites.includes(product.id) ? 'active':'' }" onclick="likeProduct(${product.id}, this)">
              ${favorites.includes(product.id) ? '♥':'♡' }</span>
          </div>

          <div class="brand">${product.brand}</div>

          <h2>
              ${product.title}
          </h2>

          <p>
              ${product.description}
          </p>

          <div class="price">
          ${product.discount_price ? `<span class="old-price">${product.price}₴</span>` : ''}${product.discount_price || product.price}₴
            <button class="add-to-cart"> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
          </svg> </button>
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

function likeProduct(productId, button) {
  favorites.push(productId);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  if (button.classList.contains('active')) {
    button.classList.remove('active');
    button.textContent = '♡';
  } else {
    button.classList.add('active');
    button.textContent = '♥';

  }


}


document.addEventListener("DOMContentLoaded", () => {
  fetchData();

})

