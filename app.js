/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createListItem, getGroceryItems } from './fetch-utils.js';
import { renderItem } from './render-utils.js';
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

window.addEventListener('load', async () => {
    const response = await getGroceryItems();
    error = response.error;
    items = response.data;
    // console.log(response);
    if (error) {
        displayError();
    } else {
        // console.log('window event listener, "else" (no error ');
        displayGroceryList();
    }
});

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
    // const quantity = response.data;

    if (error) {
        displayError();
    } else {
        items.push(item);
        // items.push(quantity);
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

function displayGroceryList() {
    groceryList.innerHTML = '';
    for (const item of items) {
        const itemEl = renderItem(item);
        groceryList.append(itemEl);
        console.log(itemEl);
    }
}
