const formId = "";
const formFields = [
  {
    name: "projectName",
    id: "#project-name",
    slug: "project-name",
    validation: true,
  },
  {
    name: "projectType",
    id: "#project-type",
    slug: "project-type",
    validation: true,
  },
  {
    name: "projectPhase",
    id: "#project-phase",
    slug: "project-phase",
    validation: true,
  },
  {
    name: "projectDescription",
    id: "#project-description",
    slug: "project-description",
    validation: false,
  },
  {
    name: "itemId",
    id: "#item-id",
    slug: "item-id",
    validation: true,
  },
];

// Adding an item to cart
const addItemToCart = (newItem) => {
  const cart = getCart();

  if (!cart) {
    return;
  }

  const itemIndex = cart.findIndex(item => item._id === newItem._id);

  itemIndex !== -1 ? 
    (cart[itemIndex] = newItem) : 
    (cart.push(newItem));

  setCart(cart);
}

// Removing an item from cart
const removeItemFromCart = (removedItem) => {
  const cart = getCart();

  if (!cart) {
    return;
  }

  const newCart = cart.filter(item => item._id !== removedItem._id);

  setCart(newCart);
}

// Getting the cart from localStorage
const getCart = () => {
  return JSON.parse(localStorage.getItem("cart") || null);
}

// Setting new cart in localStorage
const setCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Get no. of items in cart
const getCartSize = () => {
  return getCart().length;
}

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

  formEl.addEventListener("submit", () => {
    if (isFormValid) {
      const postData = {};
      for (const formField of formFields) {
        const { id, slug } = formField;
        postData[slug] = document.getElementById(id).value;
      }

      fetch("http://localhost:5001/api/add-to-cart", {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify(postData),
      })
        .then((resp) => {
          if (resp.status === 200) return resp.json();
          else throw new Error(resp.statusText);
        })
        .then((data) => {
          console.log(data);
          formEl.reset();
        })
        .catch(console.error);
    }
  });
});
