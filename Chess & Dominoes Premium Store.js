window.addEventListener("load", () => {

const loader = document.getElementById("loader");

setTimeout(() => {

loader.style.display = "none";

}, 1200);

});

// =========================
// Variables
// =========================

const cartBtn = document.getElementById("cartBtn");

const cart = document.getElementById("cart");

const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");

const totalPrice = document.getElementById("totalPrice");

const cartCount = document.getElementById("cartCount");

const overlay = document.getElementById("overlay");

const searchInput = document.getElementById("searchInput");

const filterButtons =
document.querySelectorAll(".filter-btn");

const products =
document.querySelectorAll(".card");

const checkoutButton =
document.querySelector(".checkout-btn");

const checkoutPage =
document.getElementById("checkoutPage");

const orderForm =
document.getElementById("orderForm");

const themeBtn =
document.getElementById("themeBtn");

let cartData =
JSON.parse(
localStorage.getItem("cart")
) || [];

// =========================
// Cart Functions
// =========================

function saveCart() {

localStorage.setItem(
"cart",
JSON.stringify(cartData)
);

}

function updateCart() {

cartItems.innerHTML = "";

let total = 0;

if (cartData.length === 0) {

cartItems.innerHTML =

`<p class="empty-cart">
السلة فارغة
</p>`;

}

cartData.forEach((item,index)=>{

total += item.price;

const div =
document.createElement("div");

div.classList.add("cart-item");

div.innerHTML = `

<div>

<h4>${item.name}</h4>

<p>${item.price}$</p>

</div>

<button
class="remove-btn"
data-index="${index}">

🗑️

</button>

`;

cartItems.appendChild(div);

});

totalPrice.textContent =
total + "$";

cartCount.textContent =
cartData.length;

saveCart();

}

// =========================
// Add To Cart
// =========================

document.querySelectorAll(".add-btn")
.forEach(button=>{

button.addEventListener(
"click",
()=>{

const name =
button.dataset.name;

const price =
parseFloat(
button.dataset.price
);

cartData.push({

name,
price

});

updateCart();

showToast(
name +
" تمت إضافته للسلة"
);

});

});

// =========================
// Remove Product
// =========================

cartItems.addEventListener(
"click",
e=>{

if(
e.target.classList.contains(
"remove-btn"
)
){

const index =
e.target.dataset.index;

cartData.splice(index,1);

updateCart();

}

});

// =========================
// Open Cart
// =========================

function openCart(){

cart.classList.add(
"active"
);

overlay.style.display =
"block";

}

function closeCartMenu(){

cart.classList.remove(
"active"
);

overlay.style.display =
"none";

}

cartBtn.addEventListener(
"click",
openCart
);

closeCart.addEventListener(
"click",
closeCartMenu
);

overlay.addEventListener(
"click",
closeCartMenu
);

// =========================
// Search
// =========================

searchInput.addEventListener(
"keyup",
()=>{

const value =
searchInput.value
.toLowerCase();

products.forEach(card=>{

const name =
card.dataset.name
.toLowerCase();

if(
name.includes(value)
){

card.style.display =
"block";

}else{

card.style.display =
"none";

}

});

});

// =========================
// Filters
// =========================

filterButtons.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

filterButtons.forEach(
b=>b.classList.remove(
"active"
)
);

btn.classList.add(
"active"
);

const filter =
btn.dataset.filter;

products.forEach(card=>{

if(
filter === "all"
){

card.style.display =
"block";

}else{

card.style.display =

card.dataset.category
=== filter

? "block"

: "none";

}

});

});

});

// =========================
// Checkout
// =========================

checkoutButton.addEventListener(
"click",
()=>{

if(
cartData.length === 0
){

showToast(
"السلة فارغة"
);

return;

}

checkoutPage.style.display =
"flex";

});

// =========================
// Form Submit
// =========================

orderForm.addEventListener(
"submit",
e=>{

e.preventDefault();

showToast(
"تم إرسال الطلب بنجاح سيتم التوهصل معك على الرقم أو الامال اللزي أرسلته"
);

cartData = [];

updateCart();

checkoutPage.style.display =
"none";

orderForm.reset();

});

// =========================
// Toast Notification
// =========================

function showToast(text){

const toast =
document.createElement("div");

toast.innerText = text;

toast.style.position =
"fixed";

toast.style.bottom =
"30px";

toast.style.left =
"30px";

toast.style.padding =
"15px 25px";

toast.style.background =
"#FFD700";

toast.style.color =
"#000";

toast.style.fontWeight =
"bold";

toast.style.borderRadius =
"15px";

toast.style.zIndex =
"99999";

document.body.appendChild(
toast
);

setTimeout(()=>{

toast.remove();

},2500);

}

// =========================
// Dark / Light Mode
// =========================

themeBtn.addEventListener(
"click",
()=>{

document.body.classList
.toggle("light");

});

// =========================
// Keyboard Shortcuts
// =========================

document.addEventListener(
"keydown",
e=>{

if(
e.key === "Escape"
){

closeCartMenu();

checkoutPage.style.display =
"none";

}

});

// =========================
// Scroll Animation
// =========================

const observer =
new IntersectionObserver(

entries=>{

entries.forEach(entry=>{

if(
entry.isIntersecting
){

entry.target.style.opacity =
"1";

entry.target.style.transform =
"translateY(0)";

}

});

}

);

products.forEach(card=>{

card.style.opacity =
"0";

card.style.transform =
"translateY(50px)";

card.style.transition =
".6s";

observer.observe(card);

});

// =========================
// Startup
// =========================

updateCart();