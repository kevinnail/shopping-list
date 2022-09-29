/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createListItem } from './fetch-utils.js';

/* Get DOM Elements */
const addItemForm = document.getElementById('add-item-form');
const quantityOfItems = document.getElementById('quantity-input');
const groceryItem = document.getElementById('grocerty-item');
const addButton = document.getElementById('add-button');
const removeButton = document.getElementById('remove-button');
const groceryList = document.getElementById('grocery-list');
const errorDisplay = document.getElementById('error-display');

/* State */
let items = [];
let error = null;
/* Events */
addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addItemForm);
    const newItem = {
        item: formData.get('item'),
        quantity: formData.get('quantity'),
    };
    const response = await createListItem(newItem);
    error = response.error;
    const item = response.data;
    const quantity = response.data;
    console.log(item);
    console.log(quantity);

    if (error) {
        displayError();
    } else {
        items.push(item);
        items.push(quantity);
        displayGroceryList();
        addItemForm.reset();
    }
});

addButton.addEventListener('click', () => {});
removeButton.addEventListener('click', () => {});

/* Display Functions */

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayGroceryList() {}
