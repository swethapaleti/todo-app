/* Follow the instructions found in the description to complete the JavaScript functionality.*/

let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getFromStorage() {
    let getValue = localStorage.getItem("todoList");
    let parsedValue = JSON.parse(getValue);
    if (parsedValue === null) {
        return [];
    } else {
        return parsedValue;
    }
}

let todoList = getFromStorage();
let todoCount = todoList.length;


saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}


function addTodo() {
    let taskInput = document.getElementById("todoUserInput");
    let inputValue = taskInput.value;

    todoCount = todoCount + 1;

    if (inputValue === "") {
        alert("enter value");
    } else {
        let newTodo = {
            text: inputValue,
            uniquEno: todoCount,
            isChecked: false
        };
        todoList.push(newTodo);
        createTodo(newTodo);
        taskInput.value = "";
    }
}


addTodoButton.onclick = function() {
    addTodo();
}

function statesChange(labelId, checkboxId, todoId) {
    let labelElement = document.getElementById(labelId);
    let checkboxElement = document.getElementById(checkboxId);
    labelElement.classList.toggle("checked");

    let findingIndexOfList = todoList.findIndex(function(eachItem) {
        let eachItemId = "todo" + eachItem.uniquEno;
        if (todoId === eachItemId) {
            return true;
        } else {
            return false;
        }
    })
    let selectedListItem = todoList[findingIndexOfList];
    if (selectedListItem.isChecked === true) {
        selectedListItem.isChecked = false;
    } else {
        selectedListItem.isChecked = true;
    }
}

function deleteTodo(todoId) {
    let deleteItemEl = document.getElementById(todoId);
    todoItemsContainer.removeChild(deleteItemEl);

    let delteingItemIndex = todoList.findIndex(function(eachItem) {
        let eachItemId = "todo" + eachItem.uniquEno;
        if (todoId === eachItemId) {
            return true;
        } else {
            return false;
        }
    });
    let deleteItem = todoList.splice(delteingItemIndex, 1)

}

function createTodo(todo) {
    let todoId = "todo" + todo.uniquEno;
    let labelId = "label" + todo.uniquEno;
    let checkboxId = "checkbox" + todo.uniquEno;

    let listItem = document.createElement("li");
    listItem.classList.add("todo-item-container", "d-flex", "flex-row");
    listItem.id = todoId;
    todoItemsContainer.appendChild(listItem);

    let inputEl = document.createElement("input");
    inputEl.type = "checkbox";
    inputEl.id = checkboxId;
    inputEl.checked = todo.isChecked;
    inputEl.classList.add("checkbox-input");
    inputEl.onclick = function() {
        statesChange(labelId, checkboxId, todoId)
    }
    listItem.appendChild(inputEl);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    listItem.appendChild(labelContainer);

    let labelEl = document.createElement("label");
    labelEl.setAttribute("for", checkboxId);
    labelEl.id = labelId;
    if (todo.isChecked === true) {
        labelEl.classList.add("checked");
    }
    labelEl.classList.add("checkbox-label");
    labelEl.textContent = todo.text;
    labelContainer.appendChild(labelEl);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        deleteTodo(todoId)
    }
    deleteContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
    createTodo(todo)
}