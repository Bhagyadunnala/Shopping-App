// Initialize cart from localStorage or set to an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in the header
function updateCartCount() {
    document.querySelectorAll("#cartCount").forEach(el => {
        el.textContent = cart.length;
    });
}

// Add item to the cart
function addToCart(product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Item added to cart!");
}

// Show cart items on the cart page and display total price
function displayCart() {
    const cartContents = document.getElementById("cartContents");
    const totalAmount = document.getElementById("totalAmount");
    if (cartContents) {
        cartContents.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <p>${item.name}</p>
                <p>${item.price}</p>
                <p>Size: ${item.size}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `).join('');
        
        // Calculate the total amount
        let total = 0;
        cart.forEach(item => {
            let price = parseInt(item.price.replace('₹', '').replace(',', ''));
            total += price;
        });
        totalAmount.textContent = total.toLocaleString(); // format the number with commas
    }
}

// Remove item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem("cart", JSON.stringify(cart)); // Update the cart in localStorage
    updateCartCount();
    displayCart(); // Refresh the cart display
}

// Initialize carousel on the homepage
function startCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    let activeIndex = 0;

    setInterval(() => {
        // Remove 'active' class from all items
        carouselItems.forEach(item => item.classList.remove('active'));

        // Set the next item to 'active'
        activeIndex = (activeIndex + 1) % carouselItems.length;
        carouselItems[activeIndex].classList.add('active');
    }, 3000); // Change image every 3 seconds
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    displayCart();

    // Add to Cart button on product page
    const addToBagButton = document.querySelector("#addToBagButton");
    if (addToBagButton) {
        addToBagButton.addEventListener("click", () => {
            const product = {
                name: "Item",
                price: "₹799",
                size: document.getElementById("sizeSelection").value
            };
            addToCart(product);
        });
    }

    // Start carousel if on the home page
    if (document.querySelector('.carousel')) {
        startCarousel();
    }
});

