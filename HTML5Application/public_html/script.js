/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

document.addEventListener("DOMContentLoaded", () => {
    displayProducts();

    const form = document.getElementById("product-form");
    if (form) {
        form.addEventListener("submit", addProduct);
    }

    const photoInput = document.getElementById("product-photo");
    const imagePreview = document.getElementById("image-preview");

    if (photoInput && imagePreview) {
        photoInput.addEventListener("change", function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
function displayProducts() {
    const groceriesContainer = document.getElementById("groceries-products");
    const healthContainer = document.getElementById("health-products");
    const electronicsContainer = document.getElementById("electronics-products");

    if (!groceriesContainer ||!healthContainer  || !electronicsContainer) {
        console.error("One or more product containers not found.");
        return;
    }

    groceriesContainer.innerHTML = "";
    healthContainer.innerHTML = "";
    electronicsContainer.innerHTML = "";

    const products = JSON.parse(localStorage.getItem("products")) || [];

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("productSD");

        productDiv.innerHTML = `
            <img src="${product.photo}" alt="${product.name} Image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
        `;

        if (product.category === "Groceries") {
            groceriesContainer.appendChild(productDiv);
        } else if (product.category === "Health") {
            healthContainer.appendChild(productDiv);
        } else if (product.category === "Electronics") {
            electronicsContainer.appendChild(productDiv);
        }
    });
}

function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById("product-name").value.trim();
    const price = document.getElementById("product-price").value.trim();
    const category = document.getElementById("product-category").value.trim();
    const quantity = document.getElementById("product-quantity").value.trim();
    const photo = document.getElementById("product-photo").files[0];
    const description = document.getElementById("description").value.trim();

    let errorMessages = [];

    if (!name) {
        errorMessages.push("Product name is required.");
    }

    if (!price) {
        errorMessages.push("Price is required.");
    }

    if (!category) {
        errorMessages.push("Category is required.");
    }

    if (!quantity) {
        errorMessages.push("Quantity is required.");
    }

    if (!photo) {
        errorMessages.push("Product photo is required.");
    }

    if (!description) {
        errorMessages.push("Description is required.");
    }

    if (name && /^\d/.test(name)) {
        errorMessages.push("The product name cannot start with a number.");
    }

    // Check if price is a valid number
    if (price && isNaN(parseFloat(price))) {
        errorMessages.push("Price must be a valid number.");
    }

    // Check if quantity is a valid number
    if (quantity && isNaN(parseInt(quantity))) {
        errorMessages.push("Quantity must be a valid number.");
    }

    if (errorMessages.length > 0) {
        alert(errorMessages.join("\n"));
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const product = {
            name: name,
            price: price,
            category: category,
            quantity: quantity,
            photo: event.target.result,
            description: description
        };

        const products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));

        alert(`The product ${name} has been added successfully.`);

        document.querySelector("form").reset();  
        const imagePreview = document.getElementById("image-preview");
        if (imagePreview) {
            imagePreview.style.display = "none";  
        }

        const photoInput = document.getElementById("product-photo");
        if (photoInput) {
            photoInput.value = '';  
        }

        displayProducts();
    };

    reader.readAsDataURL(photo);
}