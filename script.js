let cart = [];

// دالة لإضافة منتج للسلة
function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    updateCartUI();
    alert(`تم إضافة ${name} إلى السلة بنجاح!`);
}

// دالة لتحديث واجهة السلة
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
            <span>${item.name} (x${item.quantity})</span>
            <span>${item.price * item.quantity} جنيه 
                <button onclick="removeFromCart(${index})" style="background:#ff4a5a; color:white; border:none; padding:2px 6px; border-radius:3px; margin-right:5px; cursor:pointer; font-weight:bold;">X</button>
            </span>
        `;
        cartItems.appendChild(li);
    });

    cartCount.innerText = totalItems;
    cartTotalPrice.innerText = totalPrice;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// فتح وإغلاق السلة
function toggleCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.classList.toggle('hidden');
}

// دالة لفتح نافذة وصف المنتج
function openProductModal(name, price, imgSrc, description) {
    document.getElementById('modal-title').innerText = name;
    document.getElementById('modal-price').innerText = `${price} جنيه`;
    document.getElementById('modal-desc').innerText = description;
    document.getElementById('modal-img').src = imgSrc;
    
    const addBtn = document.getElementById('modal-add-btn');
    addBtn.onclick = function() {
        addToCart(name, price);
        closeProductModal();
    };

    document.getElementById('product-modal').classList.remove('hidden');
}

// دالة لإغلاق نافذة وصف المنتج
function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

// دالة إرسال الأوردر متضمناً بيانات العميل داخل الموقع
function submitOrder() {
    if (cart.length === 0) {
        alert('سلتك فارغة! يرجى إضافة منتجات أولاً قبل إتمام الطلب.');
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

    let phoneNumber = "201143343170"; // رقم الواتساب الخاص بك
    
    let message = "🛍️ *طلب جديد من متجر MGstor* 🛍️\n\n";
    message += "👤 *بيانات العميل:*\n";
    message += `- الاسم: ${name}\n`;
    message += `- الهاتف: ${phone}\n`;
    message += `- العنوان: ${address}\n`;
    message += `- المحافظة: ${city}\n\n`;
    
    message += "🛒 *المنتجات المطلوبة:*\n";
    let totalPrice = 0;
    cart.forEach(item => {
        message += `- ${item.name} (الكمية: ${item.quantity}) -> ${item.price * item.quantity} ج.م\n`;
        totalPrice += (item.price * item.quantity);
    });

    message += `\n💰 *إجمالي الحساب:* ${totalPrice} جنيه مصري`;
    
    let encodedMessage = encodeURIComponent(message);
    let whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}
