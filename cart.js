const cartContainer = document.getElementById("cartItems")

function getJsonCookie(cookieName) {
    const allCookies = document.cookie.split('; ');
    const targetCookie = allCookies.find(row => row.startsWith(cookieName +
        '='));
    if(targetCookie) {

        const encodeData = targetCookie.split('=')[1];
        return JSON.parse(decodeURIComponent(encodeData));
    }
    return null;
}

let cart = getJsonCookie("cart") || [];

function createCartItemElement(item) {
    return 
}




function displayCartItems() {
    cartContainer.innerHTML = "";
    if (cart.length === 0){
        cartContainer.innerHTML = "<p>Кошик порожній</p>";
        return;
    }
    cart.forEach(item => {
        cartContainer.innerHTML += createCartItemElement(item);
    });
    
    
}

document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();
});