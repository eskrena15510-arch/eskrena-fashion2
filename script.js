// 1. البحث
function searchProducts() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
        let name = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = name.includes(input) ? "block" : "none";
    });
}

// 2. التصنيفات
function filterProducts(category) {
    document.querySelectorAll('.card').forEach(card => {
        card.style.display = (category === 'all' || card.classList.contains(category)) ? "block" : "none";
    });
}

// 3. السلة
let cart = [];
let total = 0;
function addToCart(name, price) {
    cart.push({name, price});
    total += price;
    document.getElementById('cartCount').innerText = cart.length;
    document.getElementById('cartTotalPrice').innerText = total;
    document.getElementById('cartItems').innerHTML += `<p>${name}: ${price} ج.م</p>`;
    alert("تمت إضافة " + name + " للسلة!");
}

function openCart() { document.getElementById('cartBox').style.display = 'block'; }
function closeCart() { document.getElementById('cartBox').style.display = 'none'; }

function submitOrder() {
    let name = document.getElementById('client-name').value;
    let phone = document.getElementById('client-phone').value;
    let msg = `طلب جديد من: ${name}%0Aالهاتف: ${phone}%0Aالمنتجات: ${cart.map(i=>i.name).join(', ')}%0Aالإجمالي: ${total} ج.م`;
    window.open(`https://wa.me/201064031909?text=${msg}`, '_blank');
}
