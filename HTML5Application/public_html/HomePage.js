/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
// Display today's date
const currentWeekElement = document.querySelector('.current-week');
const currentDate = new Date();
const dayOfWeek = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
const sundayDate = new Date(currentDate);
sundayDate.setDate(currentDate.getDate() - dayOfWeek); // Set to the most recent Sunday

// Format the date to "7 February"
const options = { day: 'numeric', month: 'long' };
const formattedDate = sundayDate.toLocaleDateString('en-US', options);
currentWeekElement.innerHTML = `This week starts at Sunday, ${formattedDate}`;
        // Show more offers
        document.getElementById('more-offers').addEventListener('click', function() {
            const hiddenOffers = document.querySelectorAll('.offer.hidden');
            hiddenOffers.forEach(offer => {
                offer.classList.remove('hidden');
            });
            this.style.display = 'none'; // Hide the button after showing all offers
        });

        // Display review hover information
        const hoverDiv = document.querySelector('.review-hover');
        document.querySelectorAll('.review').forEach(review => {
            review.addEventListener('mouseenter', () => {
                hoverDiv.innerHTML = `
                    <strong>Name:</strong> ${review.dataset.name}<br>
                    <strong>Product:</strong> ${review.dataset.product}<br>
                    <strong>Rating:</strong> ${review.dataset.rate} stars<br>
                    <strong>Feedback:</strong> ${review.dataset.feedback}
                `;
                hoverDiv.style.display = 'block';
                hoverDiv.style.top = `${review.offsetTop}px`;
                hoverDiv.style.left = `${review.offsetLeft + review.offsetWidth}px`;
            });
            review.addEventListener('mouseleave', () => {
                hoverDiv.style.display = 'none';
            });
        });

   
        
        document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const nav = document.querySelector('nav');
    nav.classList.toggle('dark-mode');
    
    // Toggle dark mode for offers and reviews
    document.querySelectorAll('.offer, .review').forEach(item => {
        item.classList.toggle('dark-mode');
    });
    
    // Toggle dark mode for footer
    const footerTop = document.querySelector('.footer-top');
    const footerBottom = document.querySelector('.footer-bottom');
    footerTop.classList.toggle('dark-mode');
    footerBottom.classList.toggle('dark-mode');
});