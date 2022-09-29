/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';

/* Get DOM Elements */
const addItemForm = document.getElementById('add-item-form');
const quantityOfItems = document.getElementById('quantity-input');
const groceryItem = document.getElementById('grocerty-item');
const addButton = document.getElementById('add-button');
const removeButton = document.getElementById('remove-button');
/* State */

/* Events */
addButton.addEventListener('click', () => {
    alert('hi');
});
removeButton.addEventListener('click', () => {
    alert('hi');
});

/* Display Functions */
