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

  if (!cart) {
    return;
  }

  const itemIndex = cart.findIndex((item) => item._id === newItem._id);

  itemIndex !== -1 ? (cart[itemIndex] = newItem) : cart.push(newItem);

  setCart(cart);
};

// Removing an item from cart
const removeItemFromCart = (removedItem) => {
  const cart = getCart();

  if (!cart) {
    return;
  }

  const newCart = cart.filter((item) => item._id !== removedItem._id);

  setCart(newCart);
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
  return getCart().length;
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
      const postData = {};
      for (const formField of formFields) {
        const { id, slug } = formField;
        postData[slug] = document.getElementById(id).value;
      }

      console.log(JSON.stringify(postData));
      addItemToCart(postData);
    }
  });
});
