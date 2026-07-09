let cart = 0;

function addToCart() {
    cart++;

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart;
    }

    alert("✅ تمت إضافة المنتج إلى السلة");
}