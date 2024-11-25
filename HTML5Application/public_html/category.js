
// تحديد القائمة المنسدلة الخاصة بالترتيبconst sortSelect = document.getElementById('sort');
// عنصر select المسؤول عن خيار الفرز
const sortSelect = document.getElementById('sort');

// عند تغيير خيار الفرز
sortSelect.addEventListener('change', function () {
    const sortBy = sortSelect.value;
    sortProducts(sortBy);
});

// دالة الفرز
function sortProducts(sortBy) {
    // الحصول على جميع المنتجات داخل الحاوية الرئيسية
    const productContainer = document.querySelector('.container');
    const products = Array.from(document.querySelectorAll('.product-item1'));

    // ترتيب المنتجات بناءً على الخيار المحدد
    products.sort((a, b) => {
        const nameA = a.querySelector('h3').innerText;
        const nameB = b.querySelector('h3').innerText;
        const priceA = parseInt(a.querySelector('p strong').innerText.replace('SR', ''));
        const priceB = parseInt(b.querySelector('p strong').innerText.replace('SR', ''));

        switch (sortBy) {
            case 'a-z':
                return nameA.localeCompare(nameB); // ترتيب أبجدي من A-Z
            case 'z-a':
                return nameB.localeCompare(nameA); // ترتيب أبجدي من Z-A
            case 'low-to-high':
                return priceA - priceB; // ترتيب من السعر الأقل إلى الأعلى
            case 'high-to-low':
                return priceB - priceA; // ترتيب من السعر الأعلى إلى الأقل
        }
    });

    // تحديث DOM بترتيب المنتجات
    products.forEach(product => productContainer.appendChild(product));
}

// تعريف السلة لتخزين المنتجات
const cart = [];

// دالة لتحديث الكمية عند النقر على أزرار "+" و "−"
function updateQuantity(button, increase = true) {
    const productItem = button.closest('.product-item1');
    const quantityElement = productItem.querySelector('.quantity1');
    let currentQuantity = parseInt(quantityElement.innerText);

    // زيادة أو نقصان الكمية
    currentQuantity = increase ? currentQuantity + 1 : Math.max(1, currentQuantity - 1);

    // تحديث عرض الكمية
    quantityElement.innerText = currentQuantity;
}

// إضافة أحداث لأزرار "+" و "−"
document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', () => updateQuantity(button, true));
});

document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', () => updateQuantity(button, false));
});





// Function to add product to cart in Local Storage
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += product.quantity; // increase quantity if item already in cart
    } else {
        cart.push(product); // add new item if not in cart
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to show notification
function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.innerText = message;

    // Add the notification to the document body
    document.body.appendChild(notification);

    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event listener for add-to-cart buttons
document.querySelectorAll('.cart-icon1 button').forEach((button, index) => {
    button.addEventListener('click', () => {
        const productItem = button.closest('.product-item1');
        const productName = productItem.querySelector('h3').innerText;
        const productPrice = parseFloat(productItem.querySelector('p strong').innerText.replace("SR", ""));
        const productQuantity = parseInt(productItem.querySelector('.quantity1').innerText);
        const productImage = productItem.querySelector('.product-image1 img').src;

        const product = {
            name: productName,
            price: productPrice,
            quantity: productQuantity,
            image: productImage
        };

        // Add the product to the cart
        addToCart(product);

        // Show notification instead of redirecting
        showNotification(`${productName} has been added to the cart!`);
    });
});








