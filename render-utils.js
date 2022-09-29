export function renderItem(item) {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = item.item;
    li.append(p);

    return li;
}
