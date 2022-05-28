const list = document.getElementById('list');
const addButton = document.getElementById('addButton');
const listItemText = document.getElementById('listItemText');
const allFilterButton = document.getElementById('allFilterButton');
const activeFilterButton = document.getElementById('activeFilterButton');
const completedFilterButton = document.getElementById('completedFilterButton');

addButton.addEventListener('click', createListItem);
allFilterButton.addEventListener('click', allFilter);
activeFilterButton.addEventListener('click', activeFilter);
completedFilterButton.addEventListener('click', completedFilter);

function createListItem() {
    let section = document.createElement('section');
    section.classList.add('active');

    let completedButton = document.createElement('button');
    completedButton.innerHTML = '&#10003;';
    completedButton.addEventListener('click', toggleCompleted);

    let listItem = document.createElement('li');
    listItem.textContent = listItemText.value;
    
    let removeButton = document.createElement('button');
    removeButton.innerHTML = '&#10007;';
    removeButton.addEventListener('click', removeListItem);
    
    section.appendChild(completedButton);
    section.appendChild(listItem);
    section.appendChild(removeButton);
    list.appendChild(section);
    listItemText.value = '';
}

function removeListItem(returnItem) {
    let section = returnItem.target.parentNode;
    section.remove();
}

function toggleCompleted(returnItem) {
    let section = returnItem.target.parentNode;
    section.classList.toggle('completed');
    section.classList.toggle('active');
}

function activeFilter() {
    let completedItems = document.querySelectorAll('.completed');
    completedItems.forEach((item) => item.classList.add('hidden'));
    let activeItems = document.querySelectorAll('.active');
    activeItems.forEach((item) => item.classList.remove('hidden'));
}

function completedFilter() {
    let activeItems = document.querySelectorAll('.active');
    activeItems.forEach((item) => item.classList.add('hidden'));
    let completedItems = document.querySelectorAll('.completed');
    completedItems.forEach((item) => item.classList.remove('hidden'));
}

function allFilter() {
    let allItems = document.querySelectorAll('.hidden');
    allItems.forEach((item) => item.classList.remove('hidden'));
}