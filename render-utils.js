export function renderItem(item) {
    const li = document.createElement('li');
    if (item.bought) {
        li.classList.add('bought', 'rotate');
    }
    const p = document.createElement('p');
    p.textContent = item.quantity + ' ' + item.item;

    li.append(p);

    return li;
}
