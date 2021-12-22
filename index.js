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
