export function renderItem(item) {
    const li = document.createElement('li');
    if (item.bought) {
        li.classList.add('bought');
    }
    const p = document.createElement('p');
    p.textContent = item.quantity + ' ' + item.item;

    // const btnEl = document.createElement('button');
    // btnEl.textContent = 'delete me';
    // btnEl.classList.add('delete-button');
    // p.append(btnEl);
    li.append(p);

    return li;
}
