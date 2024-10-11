const cart = document.getElementById("cart");
const items = document.querySelectorAll(".item");
const checkoutBtn = document.getElementById("checkout");
let cartItems = 0;
const maxItemsInRow = 3;
const overlapPercentage = 50;
items.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
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

  const newItem = document.createElement("img");
  newItem.src = originalItem.src;
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
    const randomLeft = Math.random() * 50;
    item.style.position = "absolute";
    item.style.left = `${randomLeft}%`;
    item.style.bottom = "20%";
  }

  item.style.transform = "translateX(-50%)";
}

checkoutBtn.addEventListener("click", () => {
  window.location.href = "https://lavka.yandex.ru/";
});
