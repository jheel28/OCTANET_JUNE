const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", loadTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", handleTodoClick);
filterOption.addEventListener("change", filterTodos);

function createTodoElement(todoText) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoText;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    return todoDiv;
}

function addTodo(event) {
    event.preventDefault();
    if (todoInput.value.trim()) {
        const todoDiv = createTodoElement(todoInput.value);
        todoList.appendChild(todoDiv);
        saveLocalTodos(todoInput.value);
        todoInput.value = "";
    }
}

function handleTodoClick(e) {
    const item = e.target.closest("button");
    if (!item) return;

    const todo = item.parentElement;
    if (item.classList.contains("trash-btn")) {
        todo.classList.add("slide");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", () => todo.remove());
    } else if (item.classList.contains("complete-btn")) {
        todo.classList.toggle("completed");
    }
}

function filterTodos(e) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                todo.style.display = todo.classList.contains("completed") ? "flex" : "none";
                break;
            case "incomplete":
                todo.style.display = !todo.classList.contains("completed") ? "flex" : "none";
                break;
        }
    });
}

function saveLocalTodos(todo) {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.forEach(todo => {
        const todoDiv = createTodoElement(todo);
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    const todoText = todo.querySelector(".todo-item").innerText;
    const updatedTodos = todos.filter(t => t !== todoText);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
}
