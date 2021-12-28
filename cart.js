const cartOpen = "#open-cart";
const cartItemsNo = "#cart-items";
const cartForm = ".cartform";
const cartListContainer = ".cartlist";
const cartEmptyMsg = ".cartemptystate";
const cartErrorMsg = ".carterrorstate";

const openCart = () => {
  $(cartOpen)[0].click();
};

const updateCartLength = (len = 0) => {
  $(cartItemsNo).text(len);
};

const renderCartItems = () => {
  const createItemEl = (cartItem) => {
    let { product_name: name, quantity, _id, product_img: img } = cartItem;

    const itemEl = document.createElement("div");
    itemEl.classList.add("cartitem");
    itemEl.classList.add("w-dyn-item");
    itemEl.setAttribute("role", "listitem");

    const itemElInner1 = document.createElement("div");
    const itemElInner2 = document.createElement("div");
    const itemElInner3 = document.createElement("div");
    itemElInner2.classList.add("w-layout-grid");
    itemElInner2.classList.add("grid-4");
    itemElInner3.classList.add("div-block-28");

    const imgDiv = document.createElement("div");
    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", img);
    imgEl.setAttribute("alt", name);
    imgEl.setAttribute("loading", "lazy");
    imgDiv.appendChild(imgEl);
    itemElInner2.appendChild(imgDiv);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("div-block-28");
    const cartInfoEl = document.createElement("div");
    cartInfoEl.classList.add("cartiteminfo");
    const cartNameEl = document.createElement("div");
    cartNameEl.classList.add("cartproductname");
    cartNameEl.innerHTML = `
    <div class="text-block-22">
      ${name}
    </div>
    `;
    cartNameEl.textContent = name;
    const removeEl = document.createElement("a");
    removeEl.classList.add("w-inline-block");
    removeEl.setAttribute("href", "#");
    removeEl.innerHTML = `
    <div>
      <div class="text-block-23">Remove</div>
    </div>`;
    removeEl.addEventListener("click", () => {
      const currCartLen = removeItemFromCart(_id);
      itemEl.remove();
      updateCartLength(currCartLen);
    });
    cartInfoEl.appendChild(cartNameEl);
    cartInfoEl.appendChild(removeEl);

    infoDiv.appendChild(cartInfoEl);

    const inputDiv = document.createElement("div");
    const formDiv = document.createElement("div");
    formDiv.classList.add("w-form");
    const formEl = document.createElement("form");
    formEl.classList.add("cartform");
    const inputEl = document.createElement("input");
    inputEl.classList.add("cartquantity");
    inputEl.classList.add("w-input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("placeholder", "Quantity");
    inputEl.setAttribute("required", "");
    inputEl.setAttribute("pattern", "^[0-9]+$");
    inputEl.setAttribute("inputmode", "numeric");
    inputEl.setAttribute("value", quantity);
    inputEl.addEventListener("input", (ev) => {
      const qty = Number(ev.target.value);
      if (!isNaN(qty)) {
        updateItemFromCart(_id, qty);
      }
    });
    formEl.appendChild(inputEl);
    formDiv.appendChild(formEl);
    inputDiv.appendChild(formDiv);

    itemElInner3.appendChild(cartInfoEl);
    itemElInner3.appendChild(inputDiv);
    itemElInner2.appendChild(itemElInner3);
    itemElInner1.appendChild(itemElInner2);
    itemEl.appendChild(itemElInner1);

    return itemEl;
  };

  const cartListEl = document.querySelector(cartListContainer);
  cartListEl
    .querySelectorAll("div.cartitem")
    .forEach((itemEl) => itemEl.remove());

  const cart = getCart() || [];
  if (cart.length > 0) {
    const cartEmptyEl = document.querySelector(cartEmptyMsg),
      cartErrorEl = document.querySelector(cartErrorMsg);

    if (cartEmptyEl) cartEmptyEl.remove();
    if (cartErrorEl) cartErrorEl.remove();
  }
  for (const cartItem of cart) {
    const itemEl = createItemEl(cartItem);
    cartListEl.appendChild(itemEl);
  }

  // document.querySelector(cartForm).style.display = "flex";
};

// Removing an item from cart
const removeItemFromCart = (itemId) => {
  const cart = getCart();

  if (!cart) {
    return -1;
  }

  setCart(cart.filter((item) => item._id !== itemId));

  return getCartSize();
};

// Updating the quantity of an item from cart
const updateItemFromCart = (itemId, newQty) => {
  const cart = getCart();

  if (!cart) {
    return;
  }

  const reqItemIdx = cart.findIndex((item) => item._id === itemId);

  if (reqItemIdx === -1) {
    return;
  }

  cart[reqItemIdx].quantity = newQty;

  setCart(cart);
};

// Getting the cart from localStorage
const getCart = () => {
  return JSON.parse(localStorage.getItem("cart") || null);
};

// Setting new cart in localStorage
const setCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Get no. of items in cart
const getCartSize = () => {
  const cart = getCart();

  if (cart === null) {
    return 0;
  }

  return cart.length;
};

// Clear cart items
const clearCart = () => localStorage.setItem("cart", "");

window.addEventListener("load", () => {
  const cartLength = getCartSize();
  updateCartLength(cartLength);

  // const callback1 = (mutationList, observer) => {
  //   mutationList.forEach((mutation) => {
  //     switch (mutation.type) {
  //       case "childList":
  //         observer.disconnect();
  //         updateCartLength(cartLength);
  //         break;
  //       default:
  //         break;
  //     }
  //   });
  // };
  // const targetNode1 = document.querySelector(cartItemsNo);
  // const observerOptions1 = {
  //   childList: true,
  // };
  // const observer1 = new MutationObserver(callback1);
  // observer1.observe(targetNode1, observerOptions1);

  renderCartItems();
  // const callback2 = (mutationList, observer) => {
  //   mutationList.forEach((mutation) => {
  //     console.log(mutation);
  //     switch (mutation.type) {
  //       case "childList":
  //         observer.disconnect();
  //         mutation.addedNodes.forEach((addedNode) => addedNode.remove());
  //         renderCartItems();
  //         break;
  //       default:
  //         break;
  //     }
  //   });
  // };
  // const targetNode2 = document.querySelector(cartListContainer);
  // const observerOptions2 = {
  //   childList: true,
  //   attributes: true,
  // };
  // const observer2 = new MutationObserver(callback2);
  // observer2.observe(targetNode2, observerOptions2);
});
