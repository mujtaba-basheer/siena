const formId = "email-form";
const dataNameMap = {
  product_name: "Product Name",
  project_name: "Project Name",
  project_type: "Project Type",
  project_phase: "Project Phase",
  project_description: "Project Description",
  quantity: "Quantity",
  _id: "Product ID",
};

const renderItems = () => {
  const createItemEl = (item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item-div");
    for (const key of Object.keys(item)) {
      if (key === "product_img") continue;

      const fieldDiv = document.createElement("div");
      const labelEl = document.createElement("label");
      labelEl.textContent = key;
      const inputEl = document.createElement("input");
      inputEl.setAttribute("data-name", dataNameMap[key]);
      inputEl.classList.add("item-input");
      inputEl.value = item[key];

      fieldDiv.appendChild(labelEl);
      fieldDiv.appendChild(inputEl);
      itemDiv.appendChild(fieldDiv);
    }

    return itemDiv;
  };

  const cart = getCart() || [];
  const formEl = document.getElementById(formId);
  const itemsContainerDiv = document.createElement("div");
  itemsContainerDiv.style.display = "none";
  formEl.appendChild(itemsContainerDiv);

  cart.forEach((cartItem) => {
    const itemDiv = createItemEl(cartItem);
    itemsContainerDiv.appendChild(itemDiv);
  });
};

const getFormData = () => {
  const formData = {
    items: [],
  };
  const formEl = document.getElementById(formId);
  let fields = formEl.querySelectorAll("input:not(.item-input)");
  for (const field of fields) {
    const key = field.getAttribute("data-name");
    const val = field.value;
    formData[key] = val;
  }
  const fieldDivs = document.querySelectorAll("div.item-div");
  for (const fieldDiv of fieldDivs) {
    const itemData = {};
    fields = fieldDiv.querySelectorAll("input");
    for (const field of fields) {
      const key = field.getAttribute("data-name");
      const val = field.value;
      itemData[key] = val;
    }
    formData.items.push(itemData);
  }

  return formData;
};

const sendFormData = (formData) => {
  return new Promise((res, rej) => {
    fetch("https://hooks.zapier.com/hooks/catch/11470910/b18wemf/", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        throw new Error(resp.statusText);
      })
      .then((data) => {
        alert("Data Submitted Successfully! We'll contact you soon.");
        res(data);
      })
      .catch((err) => rej(err));
  });
};

window.addEventListener("load", function () {
  const formEl = document.getElementById(formId);
  formEl.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    ev.stopPropagation();

    const formData = getFormData();
    try {
      const resp = sendFormData(formData);
      formEl.reset();
      console.log(resp);
      clearCart();
      window.location.pathname = "/";
    } catch (error) {
      alert("Oops! There was some error! Please try again.");
    }
  });

  renderItems();
});
