const cart = document.getElementById("cart");
const items = document.querySelectorAll(".item");
const checkoutBtn = document.getElementById("checkout");
let cartItems = 0;
const maxItemsInRow = 3;
const overlapPercentage = 50;

const isMobile = /Mobi|Android/i.test(navigator.userAgent);

items.forEach((item) => {
  if (!isMobile) {
    item.addEventListener("dragstart", dragStart);
  } else {
    item.addEventListener("click", handleClick);
  }
});

cart.addEventListener("dragover", dragOver);
cart.addEventListener("drop", dropItem);

function dragStart(event) {
  event.dataTransfer.setData("item-id", event.target.id);
}

function dragOver(event) {
  event.preventDefault();
}

function dropItem(event) {
  event.preventDefault();
  const itemId = event.dataTransfer.getData("item-id");
  const originalItem = document.getElementById(itemId);

  if (originalItem) {
    originalItem.style.visibility = "hidden";
  }

  addItemToCart(originalItem.src);
}

function handleClick(event) {
  const originalItem = event.target;
  addItemToCart(originalItem.src);
  originalItem.style.visibility = "hidden";
}

function addItemToCart(itemSrc) {
  const newItem = document.createElement("img");
  newItem.src = itemSrc;
  newItem.classList.add("item-in-cart");
  cart.appendChild(newItem);

  positionItemInCart(newItem);
  cartItems++;

  if (cartItems >= 3) {
    checkoutBtn.style.display = "block";
  }
}

function positionItemInCart(item) {
  const itemWidth = 80;
  const overlapWidth = itemWidth * (overlapPercentage / 100);

  if (cartItems < maxItemsInRow) {
    const leftPosition = (itemWidth - overlapWidth) * cartItems;
    item.style.position = "absolute";
    item.style.left = `${leftPosition}px`;
    item.style.bottom = "20%";
  } else {
    const randomLeft = Math.random() * (100 - itemWidth);
    item.style.position = "absolute";
    item.style.left = `${randomLeft}%`;
    item.style.bottom = "20%";
  }

  item.style.transform = "translateX(-50%)";
}

checkoutBtn.addEventListener("click", () => {
  window.location.href = "https://lavka.yandex.ru/";
});
