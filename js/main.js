let list = document.querySelector('#dynamic');

const links = [
    {
        label: "Week 1 Notes",
        url: "week1/notes.txt"
    },
    {
        label: "Week 1 Exercises",
        url: "week1/story-editor.html"
    },
    {
        label: "Week 2 Notes",
        url: "week2/notes.txt"
    },
    {
        label: "Week 3 Notes",
        url: "week3/notes.txt"
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