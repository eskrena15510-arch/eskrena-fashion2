let cart = [];
function changeImage(imgId, imgArray, direction) {
    const imgElement = document.getElementById(imgId);
    let currentSrc = imgElement.src.split('/').pop();
    currentSrc = decodeURIComponent(currentSrc);
    let currentIndex = imgArray.indexOf(currentSrc);
    currentIndex = (currentIndex + direction + imgArray.length) % imgArray.length;
    imgElement.src = imgArray[currentIndex];
}
function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    item ? item.quantity++ : cart.push({ name, price, quantity: 1 });
    updateCartUI();
}
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let totalItems = 0, totalPrice = 0;
    cart.forEach((item, index) => {
        totalItems += item.quantity;
        totalPrice += (item.price * item.quantity);
        let li = document.createElement('li');
        li.innerHTML = `${item.name} (${item.quantity}) - ${item.price * item.quantity} ج <button onclick="removeFromCart(${index})">✕</button>`;
        cartItems.appendChild(li);
    });
    document.getElementById('cart-count').innerText = totalItems;
    document.getElementById('cart-total-price').innerText = totalPrice;
}
function removeFromCart(index) { cart.splice(index, 1); updateCartUI(); }
function toggleCart() { document.getElementById('cart').classList.toggle('hidden'); }
function submitOrder() {
    let phone = "201064031909";
    let msg = "طلب جديد: ";
    cart.forEach(i => msg += `${i.name} (x${i.quantity}) `);
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}
