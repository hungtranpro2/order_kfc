const items = [
  { name: "Pizza 001", quantity: 1, price: 7.99 },
  { name: "Pizza 002", quantity: 1, price: 7.99 },
  { name: "Pizza 003", quantity: 1, price: 7.99 },
];
const SHIPPING = 2;

function add() {
  items.push({
    name: `Pizza ${items.length + 1}`,
    quantity: 1,
    price: Math.floor(Math.random() * 10 + 1),
  });

  render();
}

function remove(index) {
  items.splice(index, 1);
  render();
}

function updateQuantity(index, quantity) {
  if (quantity < 1) {
    return;
  }

  items[index].quantity = quantity;
  render();
}

function render() {
  let subtotal = 0;
  items.forEach((item) => {
    subtotal += item.quantity * item.price;
  });
  const total = subtotal + SHIPPING;

  const html = items
    .map(
      (item) => `<li class="order-item">
  <span class="item-name">${item.name}</span>
  <span class="item-quantity">
    <button class="dec">-</button>
    <input type="number" class="quantity" value="${item.quantity}" />
    <button class="inc">+</button>
  </span>

  <span class="item-price">
    <span>$${item.price}</span>
    <button class="delete btn-delete">X</button>
  </span>
</li>`
    )
    .join("");
  document.getElementById("order-items").innerHTML = html;

  const deleteButtons = document.getElementsByClassName("delete");
  const decButtons = document.getElementsByClassName("dec");
  const incButtons = document.getElementsByClassName("inc");

  for (let i = 0; i < deleteButtons.length; i++) {
    decButtons[i].addEventListener("click", () => {
      updateQuantity(i, items[i].quantity - 1);
    });
    incButtons[i].addEventListener("click", () => {
      updateQuantity(i, items[i].quantity + 1);
    });
    deleteButtons[i].addEventListener("click", () => {
      remove(i);
    });
  }

  document.querySelector("#sub-total").innerHTML = `$${subtotal.toFixed(2)}`;
  document.querySelector("#shipping").innerHTML = `$${SHIPPING}`;
  document.querySelector("#total").innerHTML = `$${total.toFixed(2)}`;
}

document.getElementById("btn-add").addEventListener("click", add);
render();
