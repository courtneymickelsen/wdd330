// get elements from dom and store them in variables for later use
const listItemDiv = document.getElementById('listItemDiv');
const newItemDiv = document.getElementById('newItemDiv');
const newIdeaDiv = document.getElementById('newIdeaDiv');
const newItemButton = document.getElementById('newItemButton');
const addItemButton = document.getElementById('addItemButton');
const getIdeaButton = document.getElementById('getIdeaButton');
const addIdeaButton = document.getElementById('addIdeaButton');
const form = document.getElementById('popupForm');
const titleInput = document.getElementById('titleInput');
const priceInput = document.getElementById('priceInput');
const locationInput = document.getElementById('locationInput');
const detailsInput = document.getElementById('detailsInput');

// add the correct event listeners to each button
newItemButton.addEventListener('click', togglePopupForm);
getIdeaButton.addEventListener('click', getIdea);
addItemButton.addEventListener('click', createItem);
addIdeaButton.addEventListener('click', saveIdea);

// display anything saved before
displayMemoryItems();

// show or hide the popup form for creating an idea
function togglePopupForm(title, price = '', location = '', details = ''){
    // if the title isn't a string, it's the click object from the event...
    // we only want to put it in the form if it's the actual title (a string)
    if(typeof(title) == 'string'){
        titleInput.value = title;
    } else {
        titleInput.value = '';
    }
    // make sure inputs are set back to empty
    priceInput.value = price;
    locationInput.value = location;
    detailsInput.value = details;
    // show or hide the form
    form.classList.toggle('hidden');
    if (!(newItemButton.textContent == "Cancel")){
        newItemButton.textContent = "Cancel";
    } else {
        newItemButton.textContent = "Create a New Item";
    }
}

// make a list item display as html elements
function displayItem(item){
    // create elements
    let section = document.createElement('section');
    let title = document.createElement('h3');
    let price = document.createElement('p');
    let location = document.createElement('p');
    let details = document.createElement('p');
    let deleteButton = document.createElement('button');
    let editButton = document.createElement('button');

    // set values for elements
    title.innerText = item.title;
    price.innerText = "Price: $" + (item.price || "0");
    location.innerText = "Location: " + (item.location || "N/A");
    details.innerText = "Other Details: " + (item.details || "N/A");
    deleteButton.innerText = "Delete";
    editButton.innerText = "Edit";

    // add id to section so we can find it later
    section.setAttribute('id', item.title);

    // add elements to the dom to actually show up
    section.appendChild(title);
    section.appendChild(price);
    section.appendChild(location);
    section.appendChild(details);
    section.appendChild(deleteButton);
    section.appendChild(editButton);
    listItemDiv.appendChild(section);

    deleteButton.addEventListener('click', deleteItem);
    editButton.addEventListener('click', editItem);
}

// create a new list item based on form values
function createItem(){
    jsonItem = {};
    jsonItem.title = titleInput.value;
    jsonItem.price = priceInput.value;
    jsonItem.location = locationInput.value;
    jsonItem.details = detailsInput.value;

    // make item show up after getting the values
    displayItem(jsonItem);
    // add item to local storage so it will show up later
    storeItem(jsonItem);
    // hide popup form after using it
    togglePopupForm();
}

// get items from local storage and display them at each refresh
function displayMemoryItems(){
    // get all the keys for storage items
    let storageKeys = Object.keys(localStorage);
    // use each key to get the item and display it
    storageKeys.forEach(keyName => {
        item = JSON.parse(window.localStorage.getItem(keyName));
        displayItem(item);
    });
}

// add item to local storage
function storeItem(jsonItem){
    window.localStorage.setItem(`${jsonItem["title"]}`, JSON.stringify(jsonItem));
}

// get a new idea from bored API
function getIdea(){
    fetch('http://www.boredapi.com/api/activity/')
    .then(response => response.json())
    .then(idea => displayNewIdea(idea));
}

// display the new idea to the screen
function displayNewIdea(idea){
    // get html elements
    let header = document.getElementById('newIdeaHeader');
    let addIdeaButton = document.getElementById('addIdeaButton');
    // set text content to the new idea
    header.textContent = idea['activity'];
    // show button
    addIdeaButton.classList.remove('hidden');
    header.classList.remove('hidden');
}

function saveIdea(){
    // get the idea in text form
    let ideaHeader = document.getElementById('newIdeaHeader');
    let ideaTitle = ideaHeader.textContent;
    // make sure it won't hide the form if it's already up
    if (!(form.classList.contains('hidden'))){
        form.classList.add('hidden');
    }
    // add idea to form to be added to list
    togglePopupForm(ideaTitle);
    // hide the button and reset the idea
    addIdeaButton.classList.add('hidden');
    ideaHeader.textContent = '';
    ideaHeader.classList.add('hidden');
}

// delete an item from the list
function deleteItem(clickObject) {
    // get clicked object
    let button = clickObject.target;
    let section= button.parentNode;
    // get item from local storage and delete it
    window.localStorage.removeItem(section.id);
    // delete html elements
    section.remove();
}

// edit an item on the list
function editItem(clickObject) {
    // get clicked object
    let button = clickObject.target;
    let section= button.parentNode;
    let children = section.children;
    console.log(children);
    // get item from local storage and save info
    let storageItem = JSON.parse(window.localStorage.getItem(section.id));
    let title = storageItem['title'];
    let price = storageItem['price'];
    let location = storageItem['location'];
    let details = storageItem['details'];

    // delete everything and put the info in the popup form to recreate
    deleteItem(clickObject);
    window.localStorage.removeItem(section.id);
    togglePopupForm(title, price, location, details);
    // edit html elements
}