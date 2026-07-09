let cart = [];

function changeImage(imgId, imgArray, direction) {
    const imgElement = document.getElementById(imgId);
    let currentSrc = imgElement.src.split('/').pop();
    currentSrc = decodeURIComponent(currentSrc);
    
    let currentIndex = imgArray.indexOf(currentSrc);
    if (currentIndex === -1) currentIndex = 0;
    
    currentIndex += direction;
    
    if (currentIndex >= imgArray.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = imgArray.length - 1;
    
    imgElement.src = imgArray[currentIndex];
}

function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    updateCartUI();
    alert(`تم إضافة "${name}" إلى السلة بنجاح!`);
}

// تعديل دالة بناء السلة لإضافة زر الـ X المطور للحذف من نفس المكان
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    cartItems.innerHTML = '';
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalItems += item.quantity;
        totalPrice += (item.price * item.quantity);

        let li = document.createElement('li');
        li.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 2px;">
                <span style="font-weight: 600; color: #000;">${item.name}</span>
                <span style="font-size: 0.85rem; color: #666;">الكمية: ${item.quantity} × ${item.price} ج.م</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-weight: 700; color: #ff4a7a;">${item.price * item.quantity} ج.م</span>
                <button onclick="event.stopPropagation(); removeFromCart(${index})" 
                        style="background: #ff4d4d; color: white; border: none; width: 24px; height: 24px; border-radius: 50%; cursor: pointer; font-weight: bold; font-size: 12px; display: flex; align-items: center; justify-content: center; transition: background 0.2s;"
                        title="مسح من السلة">
                    ✕
                </button>
            </div>
        `;
        cartItems.appendChild(li);
    });

    cartCount.innerText = totalItems;
    cartTotalPrice.innerText = totalPrice;
}

// دالة مسح المنتج المباشر وإعادة الحساب فوراً
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function toggleCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.classList.toggle('hidden');
}

function submitOrder() {
    if (cart.length === 0) {
        alert('سلتك فارغة!');
        return;
    }

    const name = document.getElementById('client-name').value.trim();
    const phone = document.getElementById('client-phone').value.trim();
    const address = document.getElementById('client-address').value.trim();
    const city = document.getElementById('client-city').value.trim();

    if (!name || !phone || !address || !city) {
        alert('من فضلك قم بملء جميع بيانات الشحن لإتمام طلبك!');
        return;
    }

    let phoneNumber = "201064031909";
    let message = "🛍️ *طلب جديد من متجر MGstor* 🛍️\n\n";
    message += "👤 *بيانات العميل:*\n";
    message += `- الاسم: ${name}\n- الهاتف: ${phone}\n- العنوان: ${address}\n- المحافظة: ${city}\n\n`;
    
    message += "🛒 *المنتجات المطلوبة:*\n";
    let totalPrice = 0;
    cart.forEach(item => {
        message += `- ${item.name} (الكمية: ${item.quantity}) -> ${item.price * item.quantity} ج.م\n`;
        totalPrice += (item.price * item.quantity);
    });

    message += `\n💰 *إجمالي الحساب:* ${totalPrice} جنيه مصري`;
    
    let encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}
