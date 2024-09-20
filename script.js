document.addEventListener("DOMContentLoaded", () => {
    // Variables to keep track of cart items and cart count
    const cart = [];
    const cartCountElement = document.getElementById("cart-count");
    const cartItemsElement = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    // Function to add an item to the cart
    function addToCart(product) {
        // Check if item is already in cart
        const item = cart.find(cartItem => cartItem.name === product.name);
        if (item) {
            item.quantity++;
        } else {
            cart.push({
                name: product.name,
                price: product.price,
                quantity: 1,
                img: product.img
            });
        }
        updateCart();
    }

    // Function to update the cart count and display
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCountElement.textContent = totalItems;

        // Update cart items display
        cartItemsElement.innerHTML = "";
        let totalCost = 0;
        cart.forEach(item => {
            totalCost += item.price * item.quantity;
            const li = document.createElement("li");
            li.innerHTML = `
                <span><img src="images/${item.img}" alt="${item.name}" width="50"> ${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItemsElement.appendChild(li);
        });

        // Update total price display
        cartTotalElement.textContent = `Total: $${totalCost.toFixed(2)}`;
    }

    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productCard = button.closest(".product-card");
            const product = {
                name: productCard.dataset.name,
                price: parseFloat(productCard.dataset.price),
                img: productCard.dataset.img
            };
            addToCart(product);
        });
    });

    // Cart modal functionality
    const cartLink = document.getElementById("cart-link");
    const modal = document.getElementById("cart-modal");
    const closeModal = document.querySelector(".close");

    cartLink.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });
});
