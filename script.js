// 1. البحثlet cart = [];

function addToCart(name, price) {
    cart.push({name, price});
    
    // تحديث عدد العناصر في الأيقونة
    document.getElementById('cartCount').innerText = cart.length;
    
    // تحديث واجهة السلة
    updateCartUI();
    
    alert("تم إضافة " + name + " للسلة!");
}

function updateCartUI() {
    let cartItemsDiv = document.getElementById('cartItems');
    let total = 0;
    
    cartItemsDiv.innerHTML = ""; // تفريغ السلة قبل التحديث
    
    cart.forEach(item => {
        cartItemsDiv.innerHTML += `<p>${item.name} - ${item.price} ج.م</p>`;
        total += item.price;
    });
    
    document.getElementById('cartTotalPrice').innerText = total;
}

function openCart() {
    document.getElementById('cartBox').style.display = 'block';
}

function closeCart() {
    document.getElementById('cartBox').style.display = 'none';
}
}
