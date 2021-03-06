let list = document.querySelector('#dynamic');

const links = [
    {
        label: "Week 1 Notes",
        url: "week01/notes.txt"
    },
    {
        label: "Week 1 Exercises",
        url: "week01/story-editor.html"
    },
    {
        label: "Week 2 Notes",
        url: "week02/notes.txt"
    },
    {
        label: "Week 3 Notes",
        url: "week03/notes.txt"
    },
    {
        label: "Week 4 Notes",
        url: "week04/notes.txt"
    },
    {
        label: "Week 4 Exercises",
        url: "week04/hero.html"
    },
    {
        label: "Week 5 Notes",
        url: "week05/notes.txt"
    },
    {
        label: "Block 1 Challenge - To Do List",
        url: "week06/todo.html"
    },
    {
        label: "Week 7 Notes",
        url: "week07/notes.txt"
    },
    {
        label: "Week 8 Notes",
        url: "week08/notes.txt"
    },
    {
        label: "Week 9 Notes",
        url: "week09/notes.txt"
    },
    {
        label: "Week 10 Notes",
        url: "week10/notes.txt"
    },
    {
        label: "Block 2 Challenge - Bucket List Planner",
        url: "final-project/index.html"
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