const SUPABASE_URL = "https://jqlcvgzivisddkmijqzs.supabase.co";
const SUPABASE_ANON_KEY = 'sb_publishable_6Rx3ZzmoLQ9JSCdS2Y0c0g_EXM1eQP8';

// 1.Універсальна функція для збереження будь-яких даних (масивів/об'єктів) у
function getJsonCookie(cookieName) {
  const allCookies = document.cookie.split('; ');
  const targetCookie = allCookies.find(row => row.startsWith(cookieName +
      '='));
  if (targetCookie) {

      const encodedData = targetCookie.split('=')[1];
      return JSON.parse(decodeURIComponent(encodedData));
  }
  return null;
}

// 2. Універсальна функція для збереження будь-яких даних (масивів/об'єктів) у
function saveJsonCookie(cookieName, data, seconds) {
  const jsonString = JSON.stringify(data);
  const safeString = encodeURIComponent(jsonString);
  document.cookie = `${cookieName}=${safeString}; max-age=${seconds}; path=/; SameSite=Lax`;
}

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
    cart.push({ title: product.title, price: product.price, image: product.image,  quantity: 1 });
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
            <button onclick="addToCart(${product.id}, this)" class="add-to-cart"> <i class="bi bi-bag"></i> </button>
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

