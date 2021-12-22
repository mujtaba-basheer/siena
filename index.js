const formId = "email-form";
const formFields = [
  {
    name: "projectName",
    id: "projectname",
    slug: "project_name",
    validation: true,
  },
  {
    name: "projectType",
    id: "projecttype",
    slug: "project_type",
    validation: true,
  },
  {
    name: "projectPhase",
    id: "projectphase",
    slug: "project_phase",
    validation: true,
  },
  {
    name: "projectDescription",
    id: "description",
    slug: "project_description",
    validation: false,
  },
  {
    name: "quantity",
    id: "quantity",
    slug: "quantity",
    validation: false,
    isNumber: true,
  },
  {
    name: "itemId",
    id: "item-id",
    slug: "_id",
    validation: true,
  },
];

// Adding an item to cart
const addItemToCart = (newItem) => {
  const cart = getCart();

  if (cart === null) {
    setCart([newItem]);
    return 1;
  }

  const itemIndex = cart.findIndex((item) => item._id === newItem._id);

  itemIndex !== -1 ? (cart[itemIndex] = newItem) : cart.push(newItem);

  setCart(cart);

  return cart.length;
};

// Removing an item from cart
const removeItemFromCart = (itemId) => {
  const cart = getCart();

  if (!cart) {
    return -1;
  }

  const newCart = cart.filter((item) => item._id !== itemId);

  setCart(newCart);

  return newCart.length;
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

const isFormValid = () => {
  let flag = true;

  for (const formField of formFields) {
    if (formField.validation) {
      const inputEl = document.getElementById(formField.id);
      if (!inputEl.checkValidity()) {
        flag = false;
        break;
      }
    }
  }

  return flag;
};

window.addEventListener("load", () => {
  const formEl = document.getElementById(formId);

  formEl.addEventListener("submit", (ev) => {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    ev.stopPropagation();

    if (isFormValid) {
      const formData = {};
      for (const formField of formFields) {
        const { id, slug, isNumber } = formField;
        formData[slug] = document.getElementById(id).value;
        if (isNumber) formData[slug] = Number(formData[slug]);
      }

      console.log(JSON.stringify(formData));
      addItemToCart(formData);
    }
  });
});
