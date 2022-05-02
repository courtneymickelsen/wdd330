let list = document.querySelector('#dynamic');

const links = [
    {
        label: "Week 1 Notes",
        url: "week1/notes.html"
    },
    {
        label: "Week 1 Exercises",
        url: "week1/story-editor.html"
    }
];

links.forEach(function(item) {
    let label = item.label;
    let url = item.url;
    let listItem = document.createElement('li');
    let link = document.createElement('a');

    link.textContent = `${label}`;
    link.setAttribute('href', `${url}`);
    listItem.appendChild(link);
    list.appendChild(listItem);
    }
);