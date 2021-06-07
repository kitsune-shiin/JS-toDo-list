const todoInput = document.querySelector('.todo-input'); //ищем поле ввода
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteChecked);
filterOption.addEventListener('click', filterTodo);


function addTodo(event) {
    event.preventDefault(); // не дает форме обновлятся

    const todoDiv = document.createElement('div'); //создаем новый div
    todoDiv.classList.add('todo'); // добавляем class=todo для div

    const newTodo = document.createElement('li'); // создаем li
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item'); // добавляем класс для li
    todoDiv.appendChild(newTodo); //помещаем li в div

    saveLocalTodos(todoInput.value); //сохраняем в local storage

    const checkedButton = document.createElement('button'); //создаем кнопку для checked
    checkedButton.innerHTML = '<i class="fas fa-check"></i>';
    checkedButton.classList.add('checked-btn');
    todoDiv.appendChild(checkedButton); //помещаем кнопку в div

    const trashButton = document.createElement('button'); 
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton); 

    todoList.appendChild(todoDiv);

    todoInput.value = ''; // очищает Input 
}

function deleteChecked(e) {
     const item = e.target;
    if(item.classList[0] === 'trash-btn') { // ПОЧЕМУ ЗДЕСЬ 0? 
        const todo = item.parentElement; // удаляем родительский эл-т

        todo.classList.add('fall'); // класс для анимации удаления
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
           todo.remove();
       })
    }
    if(item.classList[0] === 'checked-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed') //Если класс у элемента есть, метод classList.toggle ведёт себя как classList.remove и класс у элемента убирает. А если указанного класса у элемента нет, то classList.toggle, как и classList.add, добавляет элементу этот класс.
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
       switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {

        const todoDiv = document.createElement('div'); 
        todoDiv.classList.add('todo'); 

        const newTodo = document.createElement('li'); 
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item'); 
        todoDiv.appendChild(newTodo); 

        const checkedButton = document.createElement('button'); 
        checkedButton.innerHTML = '<i class="fas fa-check"></i>';
        checkedButton.classList.add('checked-btn');
        todoDiv.appendChild(checkedButton); //помещаем кнопку в div

        const trashButton = document.createElement('button'); 
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton); 

        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText; //получаем индекс в массиве
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}