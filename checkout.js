const formId = "email-form";

const renderItems = () => {
  const createItemEl = (item) => {
    const itemDiv = document.createElement("div");
    for (const key of Object.keys(item)) {
      const fieldDiv = document.createElement("div");
      const labelEl = document.createElement("label");
      labelEl.textContent = key;
      const inputEl = document.createElement("input");
      inputEl.value = item[key];

      fieldDiv.appendChild(labelEl);
      fieldDiv.appendChild(inputEl);
      itemDiv.appendChild(fieldDiv);
    }

    return itemDiv;
  };

  const cart = getCart();
  const formEl = document.getElementById(formId);
  cart.forEach((cartItem) => {
    const itemDiv = createItemEl(cartItem);
    formEl.appendChild(itemDiv);
  });
};

window.addEventListener("load", function () {
  renderItems();
});
