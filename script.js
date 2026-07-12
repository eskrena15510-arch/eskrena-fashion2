// ===============================
// MGstor V2
// ===============================

let cart = [];
let favorites = [];

// ===============================
// تغيير صور المنتج
// ===============================

function changeImage(imgId, images, direction) {

    const img = document.getElementById(imgId);

    if (!img) return;

    let current = images.indexOf(img.src.split("/").pop());

    if (current === -1) current = 0;

    current += direction;

    if (current >= images.length) current = 0;

    if (current < 0) current = images.length - 1;

    img.src = images[current];

}

// ===============================
// البحث
// ===============================

function searchProducts() {

    let input = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        let title = card
            .querySelector("h3")
            .innerText
            .toLowerCase();

        if (title.includes(input)) {

            card.style.display = "flex";

        } else {

            card.style.display = "none";

        }

    });

}

// ===============================
// الفلترة
// ===============================

function filterProducts(type){

    let cards=document.querySelectorAll(".card");

    cards.forEach(card=>{

        if(type==="all"){

            card.style.display="flex";

            return;

        }

        if(card.classList.contains(type)){

            card.style.display="flex";

        }

        else{

            card.style.display="none";

        }

    });

}

// ===============================
// المفضلة
// ===============================

document.addEventListener("click",function(e){

    if(e.target.classList.contains("favorite")){

        e.target.classList.toggle("active");

    }

});

// ===============================
// Toast
// ===============================

function showToast(message){

    let toast=document.querySelector(".toast");

    if(!toast){

        toast=document.createElement("div");

        toast.className="toast";

        document.body.appendChild(toast);

    }

    toast.innerText=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}
// ===============================
// السلة
// ===============================

function addToCart(name, price, image){

    let product = {
        name: name,
        price: price,
        image: image,
        quantity: 1
    };

    let exists = cart.find(item => item.name === name);

    if(exists){

        exists.quantity++;

    } else {

        cart.push(product);

    }

    updateCart();

    showToast("تم إضافة المنتج للسلة 🛒");

}


// ===============================
// تحديث السلة
// ===============================

function updateCart(){

    let cartCount = document.getElementById("cartCount");

    if(cartCount){

        let total = cart.reduce((sum,item)=>{

            return sum + item.quantity;

        },0);

        cartCount.innerText = total;

    }


    let cartItems = document.getElementById("cartItems");

    if(cartItems){

        cartItems.innerHTML="";


        cart.forEach((item,index)=>{

            cartItems.innerHTML += `

            <div class="cart-item">

                <img src="${item.image}">

                <div>

                    <h4>${item.name}</h4>

                    <p>${item.price} جنيه</p>

                    <span>
                    الكمية: ${item.quantity}
                    </span>

                </div>


                <button onclick="removeCart(${index})">
                    ❌
                </button>

            </div>

            `;

        });

    }

}


// ===============================
// حذف من السلة
// ===============================

function removeCart(index){

    cart.splice(index,1);

    updateCart();

    showToast("تم حذف المنتج");

}


// ===============================
// فتح وإغلاق السلة
// ===============================

function openCart(){

    let box=document.getElementById("cartBox");

    if(box){

        box.classList.add("active");

    }

}


function closeCart(){

    let box=document.getElementById("cartBox");

    if(box){

        box.classList.remove("active");

    }

}
// ===============================
// المفضلة
// ===============================

function addFavorite(name){

    if(!favorites.includes(name)){

        favorites.push(name);

        showToast("تمت الإضافة للمفضلة ❤️");

    }

    else{

        favorites = favorites.filter(item => item !== name);

        showToast("تم الحذف من المفضلة");

    }

}


// ===============================
// فتح تفاصيل المنتج
// ===============================

function openProduct(id){

    window.location.href = "product.html?id=" + id;

}


// ===============================
// زر القائمة في الموبايل
// ===============================

function toggleMenu(){

    let menu=document.querySelector(".menu");

    if(menu){

        menu.classList.toggle("active");

    }

}


// ===============================
// حفظ السلة والمفضلة
// ===============================

window.addEventListener("beforeunload",()=>{

    localStorage.setItem(
        "mg_cart",
        JSON.stringify(cart)
    );


    localStorage.setItem(
        "mg_favorites",
        JSON.stringify(favorites)
    );

});


// ===============================
// تحميل البيانات
// ===============================

window.addEventListener("load",()=>{


    let savedCart =
    localStorage.getItem("mg_cart");


    let savedFav =
    localStorage.getItem("mg_favorites");


    if(savedCart){

        cart = JSON.parse(savedCart);

    }


    if(savedFav){

        favorites = JSON.parse(savedFav);

    }


    updateCart();


});