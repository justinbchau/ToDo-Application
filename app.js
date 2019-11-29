//Empty array to push our items into
let todoItems = [];

//Creates a new Object and pushes it into the Array
function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    //Pushes into the array
    todoItems.push(todo);
    
    //Renders the list items
    const list = document.querySelector('.list');

    //Markup for the list items that will be rendered
    list.insertAdjacentHTML('beforeend', `
        <li class="todo-item" data-key="${todo.id}">
            <input id="${todo.id}" type="checkbox">
            <label for="${todo.id}" class="tick js-tick"></label>
            <span>${todo.text}</span>
            <button class="delete-todo js-delete-todo">Remove</button>
        </li>
    `);
}

//Toggle function
function toggleDone(key) {
    //Finds the item by the ID using findIndex method
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;

    const item = document.querySelector(`[data-key='${key}']`);
    if (todoItems[index].checked) {
        item.classList.add('done');
    } else {
        item.classList.remove('done');
    }
}

//Delete function
function deleteTodo(key) {
    todoItems = todoItems.filter(item => item.id !== Number(key));
    const item = document.querySelector(`[data-key='${key}']`);
    item.remove();
}

const form = document.querySelector('.form');
form.addEventListener('submit', e => {
    //Prevents Form from refreshing the page
    e.preventDefault();
    const input = document.querySelector('.team');

    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
});

//Toggles the list item as done or not
const list = document.querySelector('.list');
    list.addEventListener('click', e => {
        if (e.target.classList.contains('js-tick')) {
            const itemKey = e.target.parentElement.dataset.key;
            toggleDone(itemKey);
        }

        //Removes the targeted list item
        if (e.target.classList.contains('js-delete-todo')) {
            const itemKey = e.target.parentElement.dataset.key;
            deleteTodo(itemKey);
        }
    });


