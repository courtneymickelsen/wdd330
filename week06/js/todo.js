// get all elements from DOM that we need for operation
const list = document.getElementById('list');
const addButton = document.getElementById('addButton');
const listItemText = document.getElementById('listItemText');
const allFilterButton = document.getElementById('allFilterButton');
const activeFilterButton = document.getElementById('activeFilterButton');
const completedFilterButton = document.getElementById('completedFilterButton');

// add event listeners to create and filter list items
addButton.addEventListener('click', addLSItem);
addButton.addEventListener('click', createListItem);
allFilterButton.addEventListener('click', allFilter);
activeFilterButton.addEventListener('click', activeFilter);
completedFilterButton.addEventListener('click', completedFilter);

// load the items from local storage
loadList();

function getLSList() {
    // get list from local storage
    let lsList = localStorage.getItem('toDoList');

    // convert it to a JSON Object
    let jsonList = [];
    if (lsList) {
        jsonList = JSON.parse(lsList);
    }

    // return it
    return jsonList;
}

function loadList() {
    // make sure it's empty so we don't duplicate
    list.innerHTML = '';

    // get the list from local storage and put it on the screen
    let jsonList = getLSList();
    jsonList.forEach(createListItem);
}

function addLSItem() {
    // get the list from local storage
    let lsList = getLSList();

    // create a list item and add it to the list
    let lsItem = {id: Date.now(), content: listItemText.value, completed: false}
    lsList.push(lsItem);
    
    // reset the local storage list to inlcude the new item
    localStorage.setItem('toDoList', JSON.stringify(lsList));
}

function createListItem(passedItem = {id: Date.now(), content: "", completed: false}) {

    // create elements and give them the right classes, content, and event listeners
    let section = document.createElement('section');
    section.classList.add('active');
    section.setAttribute('id', passedItem['id']);

    let completedButton = document.createElement('button');
    completedButton.innerHTML = '&#10003;';
    completedButton.addEventListener('click', toggleCompleted);

    let listItem = document.createElement('li');
    let textValue = listItemText.value || passedItem['content'];
    listItem.textContent = textValue;
    
    let removeButton = document.createElement('button');
    removeButton.innerHTML = '&#10007;';
    removeButton.addEventListener('click', removeListItem);
    
    // add all items to the dom
    section.appendChild(completedButton);
    section.appendChild(listItem);
    section.appendChild(removeButton);
    list.appendChild(section);

    // if the item is completed, include the right classes
    if (passedItem['completed'] == true) {
        section.classList.add('completed');
        section.classList.remove('active');
    }

    // clear the text input area
    listItemText.value = '';
}

function removeListItem(returnItem) {
    let section = returnItem.target.parentNode;
    let sectionId = section.id.toString();
    section.remove();
    
    let lsList = getLSList();
    let newList = lsList.filter(item => item.id != sectionId);
    localStorage.setItem('toDoList', JSON.stringify(newList));
}

function toggleCompleted(returnItem) {
    // get section
    let section = returnItem.target.parentNode;

    // if it's complete it's not active
    section.classList.toggle('completed');
    section.classList.toggle('active');

    // update localStorage
    let lsList = getLSList();
    let sectionId = section.id;

    lsList.forEach((item) => {
        let itemId = item['id'].toString();
        if (itemId == sectionId){
            item['completed'] = true;
        }
    })
    localStorage.setItem('toDoList', JSON.stringify(lsList));
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