const cartOpen = "#open-cart";
const cartItemsNo = "#cart-items";

const openCart = () => {
  $(cartOpen + " > a")[0].click();
};

const updateCartLength = (len = 0) => {
  $(cartItemsNo).text(len);
};

window.addEventListener("load", () => {
  const cartLength = getCartSize();
  updateCartLength(cartLength);
});
// Removing an item from cart
exports.removeItemFromCart = (itemId) => {
  const cart = getCart();

  if (!cart) {
    return -1;
  }

  setCart(cart.filter((item) => item._id !== itemId));

  return getCartSize();
};

// Updating the quantity of an item from cart
exports.updateItemFromCart = (itemId, newQty) => {
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
exports.getCart = () => {
  return JSON.parse(localStorage.getItem("cart") || null);
};

// Setting new cart in localStorage
exports.setCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Get no. of items in cart
exports.getCartSize = () => {
  const cart = getCart();

  if (cart === null) {
    return 0;
  }

  return cart.length;
};
