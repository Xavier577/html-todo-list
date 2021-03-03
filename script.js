// Personal tool
const print = (any) => console.log(any);
// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const clearAllBtn = document.querySelector("#clear-all");

//functions
const createAndDisplayTodo = (item) => {
  /*this function creates adds and display todos to the 
  todolist with it's functional components such as completed
   button and delete button */

  // creating todo to the list
  const todoDiv = document.createElement("div");
  todoList.append(todoDiv);
  todoDiv.classList.add("todo-div");
  const todo = document.createElement("li");
  todoDiv.append(todo);
  todo.innerText = item;
  todo.classList.add("todo-li");
  saveToLocalStorage(item); // saving item to localStorage
  todoInput.value = null; // emptying input field after submission
  todo.innerHTML === "" ? todoDiv.remove() : null; // prevent empty values from being added

  // creating a tick button
  const doneBtn = document.createElement("button");
  todoDiv.appendChild(doneBtn);
  doneBtn.innerHTML = "&checkmark;";
  doneBtn.classList.add("done-btn");
  const completed = () => todoDiv.classList.toggle("completed");
  doneBtn.addEventListener("click", completed);

  // creating a delete button
  const deleteBtn = document.createElement("button");
  todoDiv.append(deleteBtn);
  deleteBtn.innerHTML = "&times";
  deleteBtn.classList.add("trash-btn");
  const deleteTodo = () => todoDiv.classList.add("fall");
  deleteBtn.addEventListener("click", () => {
    deleteTodo();
    removeFromLocalTodos(todo);
    todoDiv.addEventListener("transitionend", () => todoDiv.remove());
  });
};

const removeAllTodos = () => {
  // this function when invoked removes all the items on the todo list
  if (todoList.innerHTML === null) return;
  else {
    todoList.innerHTML = null;
    localStorage.clear();
  }
};

// this function filters the list
const filterTodo = (event) => {
  const todos = [...todoList.children];
  todos.forEach((todo) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        todo.classList.contains("completed")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none");
        break;
      case "uncompleted":
        !todo.classList.contains("completed")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none");
        break;
    }
  });
};
// saves item to localStorage
const saveToLocalStorage = (todo) => {
  // check if there are items in localStorage
  let todos = [];
  if (localStorage.getItem("todos") === null) todos = [];
  else todos = JSON.parse(localStorage.getItem("todos"));
  // prevents empty value from being added
  if (todo === "") return;
  else todos.push(todo);

  print(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
};
// gets items from localstorage and display them on the page
const retrieveAndDisplayTodos = () => {
  // check if there are items in localStorage
  let todos;
  if (localStorage.getItem("todos") === null) todos = [];
  else todos = JSON.parse(localStorage.getItem("todos"));
  // displays items on the page
  todos.forEach((item) => createAndDisplayTodo(item));
  localStorage.setItem("todos", JSON.stringify(todos));
};

const removeFromLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) todos = [];
  else todos = JSON.parse(localStorage.getItem("todos"));

  const todoIndex = todo.innerText;
  todos.splice(todos.indexOf(todoIndex), 1); // remove item from the list in localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
};

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", retrieveAndDisplayTodos);
clearAllBtn.addEventListener("click", removeAllTodos);
filterOption.addEventListener("click", filterTodo);
todoButton.addEventListener("click", (event) => {
  event.preventDefault();
  createAndDisplayTodo(todoInput.value);
});
