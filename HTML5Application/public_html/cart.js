/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

// Function to render cart items from local storage
function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTableBody = document.querySelector(".Gcart-items tbody");
    cartTableBody.innerHTML = ""; // Clear existing content

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="Gth-td">
                <div class="Gproduct-info">
                    <img class="Gimage-placeholder" src="${item.image}" alt="${item.name}">
                </div>
            </td>
            <td class="Gth-td">${item.name}</td>
            <td class="Gth-td">${item.price.toFixed(2)}SR</td>
            <td class="Gth-td">
                <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input">
            </td>
            <td class="Gth-td">${itemTotal.toFixed(2)}SR</td>
            <td class="Gth-td"><button class="Gdelete-btn" data-index="${index}">🗑️</button></td>
        `;

        cartTableBody.appendChild(row);
    });

    document.querySelector(".Gorder-summary #first p").innerText = `Total Price: ${totalPrice.toFixed(2)}SR`;
    const tax = totalPrice * 0.10;
    document.querySelector(".Gorder-summary .Gorder-text:nth-of-type(2) p").innerText = `Tax (10%): ${tax.toFixed(2)}SR`;
    document.querySelector(".Gorder-summary .Gorder-text:last-child p").innerText = `Total: ${(totalPrice + tax).toFixed(2)}SR`;

    // Add event listeners for delete buttons and quantity inputs
    document.querySelectorAll(".Gdelete-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            removeItemFromCart(index);
        });
    });

    document.querySelectorAll(".quantity-input").forEach(input => {
        input.addEventListener("change", (event) => {
            const index = event.target.getAttribute("data-index");
            updateQuantity(index, parseInt(event.target.value));
        });
    });
}

// Function to remove item from cart
function removeItemFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems(); // Re-render cart items
}

// Function to update item quantity
function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[index].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems(); // Re-render cart items
}

// Event listener for empty cart button
document.querySelector(".Gempty-cart").addEventListener("click", () => {
    localStorage.removeItem("cart");
    renderCartItems();
});

// Event listener for check out button
document.querySelector(".Gcheckout").addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!"); // Check if cart is empty
        return;
    }
    
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = totalPrice * 0.10;
    const totalCost = (totalPrice + tax).toFixed(2);
    
    // Display acknowledgment with total cost and ask if user wants to proceed
    const userConfirmed = confirm(`Thank you for your purchase! The total cost is ${totalCost} SR. Click OK to proceed to the evaluation page.`);
    
    // Redirect to evaluation page if user clicks "OK"
    if (userConfirmed) {
        window.location.href = "evalpage.html";
    }
});

// Render items on page load
document.addEventListener("DOMContentLoaded", renderCartItems);
