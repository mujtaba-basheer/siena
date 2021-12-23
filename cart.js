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
