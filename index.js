const formId = "email-form",
  formFields = [
    {
      name: "productName",
      id: "product-name",
      slug: "product_name",
      validation: !0,
    },
    {
      name: "productImg",
      id: "product-img",
      slug: "product_img",
      validation: !0,
    },
    {
      name: "quantity",
      id: "quantity",
      slug: "quantity",
      validation: !1,
      isNumber: !0,
    },
    { name: "itemSlug", id: "item-slug", slug: "_id", validation: !0 },
    {
      name: "productSKU",
      id: "product-sku",
      slug: "product_sku",
      validation: !0,
    },
  ],
  addItemToCart = (a) => {
    const b = getCart();
    if (null === b) return setCart([a]), 1;
    const c = b.findIndex((b) => b._id === a._id);
    return -1 === c ? b.push(a) : (b[c] = a), setCart(b), getCartSize();
  },
  isFormValid = () => {
    let a = !0;
    for (const b of formFields)
      if (b.validation) {
        const c = document.getElementById(b.id);
        if (!c.checkValidity()) {
          a = !1;
          break;
        }
      }
    return a;
  };

window.addEventListener("load", () => {
  const formEl = document.getElementById(formId);
  formEl.addEventListener("submit", (ev) => {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    ev.stopPropagation();

    if (isFormValid()) {
      const formData = {};
      for (const field of formFields) {
        const { id, slug, isNumber } = field;

        formData[slug] = document.getElementById(id).value;
        if (isNumber) formData[slug] = +formData[slug];
      }
      // console.log(JSON.stringify(a));
      const newCartLength = addItemToCart(a);
      updateCartLength(newCartLength);
      openCart();
      renderCartItems();
    }
  });
});
