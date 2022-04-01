{
  let test4 = document.getElementsByClassName("customer-tab");
  for (let a = 0; a < test4.length; a++) {
    test4[a].addEventListener("click", (eventA) => {
      test4[a].querySelector(".customer-tabs-circle").style.backgroundColor =
        "red !important";
    });
  }
}
