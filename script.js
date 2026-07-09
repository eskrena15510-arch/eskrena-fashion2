// ===== MGstor Shopping Cart =====

let cart = [];

// إضافة منتج للسلة
function addToCart(productName) {
    cart.push(productName);

    // تحديث عداد السلة
    document.getElementById("cart-count").textContent = cart.length;

    // تحديث قائمة المنتجات داخل السلة
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item}
            <button onclick="removeItem(${index})">❌</button>
        `;
        cartItems.appendChild(li);
    });

    alert("✅ تمت إضافة المنتج إلى السلة");
}

// حذف منتج
function removeItem(index) {
    cart.splice(index, 1);

    document.getElementById("cart-count").textContent = cart.length;

    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    cart.forEach((item, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item}
            <button onclick="removeItem(${i})">❌</button>
        `;
        cartItems.appendChild(li);
    });
}

// فتح وإغلاق السلة
function toggleCart() {
    const cartBox = document.getElementById("cart");

    if (cartBox.style.display === "block") {
        cartBox.style.display = "none";
    } else {
        cartBox.style.display = "block";
    }
}