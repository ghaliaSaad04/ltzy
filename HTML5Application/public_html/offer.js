/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

document.addEventListener('DOMContentLoaded', function() {
    let offers = [
        { id: 'offer1', name: '20% Off Vitamins', image: 'images/offer1.jpg' },
        { id: 'offer2', name: 'Buy 1 Choco CRISPIES, Get 1 Free', image: 'images/offer2.jpg' },
        { id: 'offer3', name: '10% Off Apple Watch', image: 'images/offer3.jpg' },
        { id: 'offer4', name: 'Buy 2 Vitamins, Get 1 Free', image: 'images/offer4.jpg' },
        { id: 'offer5', name: 'iPhone Coming Soon', image: 'images/offer5.jpg' },
        { id: 'offer6', name: 'New Watch Arrived', image: 'images/offer6.jpg' },
    ];

    const offersList = document.getElementById('offersList');
    const deleteButton = document.querySelector('.delete-button');
    const addOfferForm = document.getElementById('addOfferForm');
    const offerNameInput = document.getElementById('offerName');
    const offerPhotoInput = document.getElementById('offerPhoto');
    const imagePreview = document.getElementById('imagePreview');

    // Function to render offers
    function renderOffers() {
        offersList.innerHTML = '';
        offers.forEach(offer => {
            const offerItem = document.createElement('li');
            offerItem.className = 'offer-item';
            offerItem.innerHTML = `
                <div class="offer-image">
                    <img src="${offer.image}" alt="${offer.name}">
                </div>
                <label class="offer-label" for="${offer.id}">${offer.name}</label>
                <input type="checkbox" class="checkbox" id="${offer.id}">
            `;
            offersList.appendChild(offerItem);
        });
    }

    // Initial render of offers
    renderOffers();

    // Handle delete action
    deleteButton.addEventListener('click', function() {
        const selectedOffers = Array.from(document.querySelectorAll('.checkbox:checked'));
        if (selectedOffers.length === 0) {
            alert('Please select at least one offer');
            return;
        }

        const confirmDelete = confirm('Are you sure you want to delete the selected offers?');
        if (confirmDelete) {
            selectedOffers.forEach(checkbox => {
                const offerId = checkbox.id;
                offers = offers.filter(offer => offer.id !== offerId);
            });
            renderOffers();
        }
    });

    // Handle adding a new offer
    addOfferForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission (page reload)

        const offerName = offerNameInput.value.trim(); // Get the offer name and trim spaces
        const offerPhoto = offerPhotoInput.files[0];  // Get the selected image

        // Debugging: Log values to the console
        console.log('Offer Name:', offerName);
        console.log('Offer Photo:', offerPhoto);

        // Validate the form (check if fields are empty)
        if (!offerName || !offerPhoto) {
            alert('Please fill in all fields');  // Show alert if any field is empty
            return;  // Prevent further execution if fields are empty
        }

        // Create a new offer object
        const newOffer = {
            id: `offer${offers.length + 1}`,
            name: offerName,
            image: URL.createObjectURL(offerPhoto)  // Create temporary URL for the image
        };

        // Add new offer to the offers array
        offers.push(newOffer);

        // Re-render the offers list
        renderOffers();

        // Reset the form
        addOfferForm.reset();
        imagePreview.style.display = 'none'; // Hide image preview
    });

    // Handle image preview when selecting a photo
    offerPhotoInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block'; // Show image preview
            };
            reader.readAsDataURL(file);
        }
    });
});
