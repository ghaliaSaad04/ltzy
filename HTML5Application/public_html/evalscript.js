/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("evalForm");
    const orderSelect = document.getElementById("order");
    const logisticRatings = document.getElementsByName("rating");
    const product1Ratings = document.getElementsByName("rating1");
    const product2Ratings = document.getElementsByName("rating2");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        // Validate order selection
        const selectedOrder = orderSelect.value;
        if (!selectedOrder) {
            alert("Please choose an order.");
            return;
        }

        // Validate logistic service rating
        const logisticRating = Array.from(logisticRatings).find(radio => radio.checked)?.value;
        if (!logisticRating) {
            alert("Make sure to choose at least one star for logistic services.");
            return;
        }

        // Validate Product #1 rating
        const product1Rating = Array.from(product1Ratings).find(radio => radio.checked)?.value;
        if (!product1Rating) {
            alert("Make sure to choose at least one star for Product #1 (iPad).");
            return;
        }

        // Validate Product #2 rating
        const product2Rating = Array.from(product2Ratings).find(radio => radio.checked)?.value;
        if (!product2Rating) {
            alert("Make sure to choose at least one star for Product #2 (Apple Pencil).");
            return;
        }

        // Display alert with detailed feedback
        alert(`Thank you for your feedback!
Your rating for Order #${selectedOrder}:
- Logistic Service: ${logisticRating}
- Product #1 (iPad): ${product1Rating}
- Product #2 (Apple Pencil): ${product2Rating}`);

        // Redirect to Home page
        window.location.href = "HomePage.html";
    });
});
