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
  const a = document.getElementById(formId);
  a.addEventListener("submit", (a) => {
    if (
      (a.preventDefault(),
      a.stopImmediatePropagation(),
      a.stopPropagation(),
      isFormValid())
    ) {
      const a = {};
      for (const b of formFields) {
        const { id: c, slug: d, isNumber: e } = b;
        (a[d] = document.getElementById(c).value), e && (a[d] = +a[d]);
      }
      const b = addItemToCart(a);
      updateCartLength(b), openCart(), renderCartItems();
    }
  });
});
