// ===============================
// MGstor Full Script
// ===============================

let cart = JSON.parse(localStorage.getItem("mg_cart")) || [];
let favorites = [];


// ===============================
// فتح وغلق السلة
// ===============================

function toggleCart(){

    let box = document.getElementById("cartBox");

    if(box){

        box.classList.toggle("active");

    }

}


function openCart(){

    let box = document.getElementById("cartBox");

    if(box){

        box.classList.add("active");

    }

}


function closeCart(){

    let box = document.getElementById("cartBox");

    if(box){

        box.classList.remove("active");

    }

}



// ===============================
// إضافة منتج للسلة
// ===============================

function addToCart(name, price, image){

    let oldProduct = cart.find(product => product.name === name);


    if(oldProduct){

        oldProduct.quantity++;

    }else{

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

        count.innerHTML = cart.reduce(
            (total,item)=> total + item.quantity,
            0
        );

    }



    let box = document.getElementById("cartItems");


    let totalBox = document.getElementById("cartTotalPrice");



    if(box){

        box.innerHTML = "";


        let total = 0;



        cart.forEach((item,index)=>{


            total += item.price * item.quantity;



            box.innerHTML += `

            <div class="cart-product">

                <img src="${item.image}" alt="${item.name}">

                <div>

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
                    ❌
                    </button>

                </div>

            </div>

            `;


        });



        if(totalBox){

            totalBox.innerHTML = total;

        }


    }


}



// ===============================
// تغيير الكمية
// ===============================

function changeQuantity(index,value){


    cart[index].quantity += value;


    if(cart[index].quantity <= 0){

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
// حفظ السلة
// ===============================

function saveCart(){

    localStorage.setItem(
        "mg_cart",
        JSON.stringify(cart)
    );

}



// ===============================
// تأكيد الطلب واتساب
// ===============================

function submitOrder(){


    if(cart.length === 0){

        showToast("السلة فارغة");

        return;

    }



    let message =
    "طلب جديد من MGstor%0A%0A";



    cart.forEach(item=>{


        message +=
        "المنتج: "+item.name+
        "%0Aالسعر: "+item.price+
        " جنيه%0Aالكمية: "+
        item.quantity+
        "%0A%0A";


    });



    let total = cart.reduce(
        (sum,item)=>
        sum+(item.price*item.quantity),
        0
    );



    message +=
    "الإجمالي: "+total+" جنيه";



    window.open(
        "https://wa.me/201000000000?text="+message,
        "_blank"
    );


}



// ===============================
// Toast
// ===============================

function showToast(text){


    let toast =
    document.querySelector(".toast");



    if(!toast){

        toast=document.createElement("div");

        toast.className="toast";

        document.body.appendChild(toast);

    }



    toast.innerHTML=text;


    toast.classList.add("show");


    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);


}



// ===============================
// تشغيل عند فتح الموقع
// ===============================

window.addEventListener("load",()=>{

    updateCart();

});