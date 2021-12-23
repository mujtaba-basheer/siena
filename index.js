const { getCart, setCart, getCartSize } = require("./cart");

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
const modalCloseBtn = "#close-modal";

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

  return getCartSize();
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

      const itemsNo = addItemToCart(formData);

      // closing modal
      $(modalCloseBtn)[0].click();
      updateCartLength(itemsNo);
      openCart();
    }
  });
});
