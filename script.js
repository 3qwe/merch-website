document.addEventListener("DOMContentLoaded", () => {
    // Cart-related elements
    let cart = [];
    const cartButton = document.getElementById("cart-button");
    const cartPopup = document.getElementById("cart-popup");
    const cartCountElement = document.getElementById("cart-count");
    const cartTableBody = document.querySelector("#cart-table tbody");
    const cartTotalElement = document.getElementById("cart-total");
    const closeCart = document.getElementById("close-cart");

    // Function to add items to the cart
    function addToCart(product) {
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({...product, quantity: 1});
        }
        updateCart();
    }

    // Function to update the cart display
    function updateCart() {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCountElement.textContent = totalItems;

        // Clear the current cart display
        cartTableBody.innerHTML = "";
        let totalCost = 0;

        // Add items to the cart table
        cart.forEach((item, index) => {
            totalCost += item.price * item.quantity;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="images/${item.img}" alt="${item.name}"> ${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <button class="decrease" data-index="${index}">-</button>
                    ${item.quantity}
                    <button class="increase" data-index="${index}">+</button>
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="remove" data-index="${index}">Remove</button></td>
            `;
            cartTableBody.appendChild(row);
        });

        // Update total price display
        cartTotalElement.textContent = `Total: $${totalCost.toFixed(2)}`;

        // Add event listeners for increase, decrease, and remove buttons
        const increaseButtons = document.querySelectorAll(".increase");
        const decreaseButtons = document.querySelectorAll(".decrease");
        const removeButtons = document.querySelectorAll(".remove");

        increaseButtons.forEach(button => {
            button.addEventListener("click", () => changeQuantity(button.dataset.index, 1));
        });

        decreaseButtons.forEach(button => {
            button.addEventListener("click", () => changeQuantity(button.dataset.index, -1));
        });

        removeButtons.forEach(button => {
            button.addEventListener("click", () => removeItem(button.dataset.index));
        });
    }

    // Function to change the quantity of an item in the cart
    function changeQuantity(index, amount) {
        cart[index].quantity += amount;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        updateCart();
    }

    // Function to remove an item from the cart
    function removeItem(index) {
        cart.splice(index, 1);
        updateCart();
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

    // Show cart popup when cart button is clicked
    cartButton.addEventListener("click", () => {
        cartPopup.style.display = cartPopup.style.display === "block" ? "none" : "block";
    });

    // Close cart popup when close button is clicked
    closeCart.addEventListener("click", () => {
        cartPopup.style.display = "none";
    });

    // Hide cart popup when clicking outside of it
    window.addEventListener("click", (e) => {
        if (!cartPopup.contains(e.target) && e.target !== cartButton) {
            cartPopup.style.display = "none";
        }
    });

    // Carousel Functionality
    document.querySelectorAll('.carousel').forEach(carousel => {
        const carouselInner = carousel.querySelector('.carousel-inner');
        const images = carouselInner.querySelectorAll('img');
        let currentIndex = 0;

        const updateCarousel = () => {
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        carousel.querySelector('.next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
        });

        carousel.querySelector('.prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateCarousel();
        });
    });
});
