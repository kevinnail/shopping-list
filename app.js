/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import {
    createListItem,
    getGroceryItems,
    completeBuyItem,
    deleteAll,
    deleteItem,
} from './fetch-utils.js';
import { renderItem } from './render-utils.js';
/* Get DOM Elements */
const addItemForm = document.getElementById('add-item-form');

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
    if (error) {
        displayError();
    } else {
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

removeButton.addEventListener('click', async () => {
    const response = await deleteAll();
    error = response.error;
    if (error) {
        displayError();
    } else {
        items = [];
        displayGroceryList();
    }
});

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

        itemEl.addEventListener('click', async () => {
            const response = await completeBuyItem(item.id);
            error = response.error;
            const updatedItem = response.data;
            if (error) {
                displayError();
            } else {
                const index = items.indexOf(item);
                items[index] = updatedItem;
                displayGroceryList();
            }
        });

        const btnEl = document.createElement('button');
        btnEl.textContent = 'delete me';
        btnEl.classList.add('delete-button');
        groceryList.append(btnEl);

        btnEl.addEventListener('click', async () => {
            const response = await deleteItem(item.id);
            error = response.error;
            if (error) {
                displayError();
            } else {
                const index = items.indexOf(item);
                items.splice(index, 1);
                displayGroceryList();
            }
        });
    }
}
