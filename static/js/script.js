let cartCount = 0;

function goToShop() {
    window.location.href = "/shop/";
}

document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".add-to-cart");
    const cartCounter = document.getElementById("cartCount");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            cartCount++;
            cartCounter.textContent = cartCount;

            button.textContent = "Added ✓";
            button.disabled = true;
        });
    });

});
