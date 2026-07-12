// ===============================
// MGstor Script
// ===============================

let cart = [];
let favorites = [];


// ===============================
// فتح وقفل السلة
// ===============================

function openCart(){

    let cartBox = document.getElementById("cartBox");

    if(cartBox){
        cartBox.classList.add("active");
    }

}


function closeCart(){

    let cartBox = document.getElementById("cartBox");

    if(cartBox){
        cartBox.classList.remove("active");
    }

}


function toggleCart(){

    let cartBox = document.getElementById("cartBox");

    if(cartBox){

        cartBox.classList.toggle("active");

    }

}



// ===============================
// إضافة للسلة
// ===============================

function addToCart(name, price, image){


    let product = cart.find(item => item.name === name);


    if(product){

        product.quantity++;

    }

    else{

        cart.push({

            name:name,

            price:Number(price),

            image:image,

            quantity:1

        });

    }


    saveCart();

    updateCart();

    showToast("تم إضافة المنتج للسلة 🛒");

}



// ===============================
// تحديث السلة
// ===============================

function updateCart(){


    let count = document.getElementById("cartCount");


    if(count){

        count.innerText = cart.reduce((a,b)=>a+b.quantity,0);

    }



    let items = document.getElementById("cartItems");


    let total = document.getElementById("cartTotalPrice");



    if(items){


        items.innerHTML="";


        let sum = 0;



        cart.forEach((item,index)=>{


            sum += item.price * item.quantity;



            items.innerHTML += `

            <div class="cart-product">


                <img src="${item.image}">


                <h4>${item.name}</h4>


                <p>${item.price} جنيه</p>


                <button onclick="changeQuantity(${index},-1)">
                -
                </button>


                <span>
                ${item.quantity}
                </span>


                <button onclick="changeQuantity(${index},1)">
                +
                </button>


                <button onclick="removeCart(${index})">
                🗑️
                </button>


            </div>

            `;


        });



        if(total){

            total.innerText=sum;

        }


    }

}



// ===============================
// التحكم في الكمية
// ===============================

function changeQuantity(index,value){


    cart[index].quantity += value;



    if(cart[index].quantity <=0){

        cart.splice(index,1);

    }



    saveCart();

    updateCart();


}



// ===============================
// حذف منتج
// ===============================

function removeCart(index){


    cart.splice(index,1);


    saveCart();

    updateCart();


}



// ===============================
// حفظ البيانات
// ===============================

function saveCart(){

    localStorage.setItem(
        "mg_cart",
        JSON.stringify(cart)
    );

}



// ===============================
// تحميل السلة
// ===============================

window.onload=function(){


    let oldCart = localStorage.getItem("mg_cart");


    if(oldCart){

        cart = JSON.parse(oldCart);

    }


    updateCart();


}



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