const SUPABASE_URL = "https://jqlcvgzivisddkmijqzs.supabase.co";
const SUPABASE_ANON_KEY = 'sb_publishable_6Rx3ZzmoLQ9JSCdS2Y0c0g_EXM1eQP8';

let products = [];
let cart = [];
const productsContainer = document.querySelector("#productsGrid");

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

function createProductCard(product) {
  return `
      <div class="card" style="width: 18rem;">
          <img src="img/${product.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">$${product.price}</p>
            <button type="button" class="btn btn-warning">
            <i class="bi bi-cart-plus"></i> В кошик </button>
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

