const cartContainer = document.getElementById("cartItems")

let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];

console.log(cart);

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");


function showCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>
                Ваш кошик порожній
            </p>
        `;

        cartTotal.textContent = "0₴";

        return;
    }


    let total = 0;


    cart.forEach(function (item) {

        total += item.price * item.quantity;


        const product = document.createElement("div");

        product.className = "cart-item";


        product.innerHTML = `

            <h3>
                ${item.title}
            </h3>

            <p>
                Ціна: ${item.price}₴
            </p>

            <p>
                Кількість: ${item.quantity}
            </p>

            <button
                onclick="changeQuantity('${item.id}', -1)"
            >
                -
            </button>

            <button
                onclick="changeQuantity('${item.id}', 1)"
            >
                +
            </button>

            <button
                onclick="removeProduct('${item.id}')"
            >
                Видалити
            </button>

            <hr>
        `;


        cartItems.append(product);

    });


    cartTotal.textContent = total + "₴";
}


function changeQuantity(id, change) {

    const item = cart.find(function (item) {
        return item.id == id;
    });


    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        cart = cart.filter(function (item) {
            return item.id !== id;
        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    showCart();
}


function removeProduct(id) {

    cart = cart.filter(function (item) {
        return item.id != id;
    });


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    showCart();
}





document.addEventListener("DOMContentLoaded", () => {
    showCart();
    
});