// SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const clearAllBtn = document.querySelector("#clear-all");
// Personal tool
const print = (any) => {
  console.log(any);
};

//functions
const addTodo = (event) => {
  // this function creates and add todos to the todolist with it's functional components such as completed button and delete button
  // prevent default
  event.preventDefault();

  // create todoList

  // created a div and added the todo-div class
  const todoDiv = document.createElement("div");
  todoList.append(todoDiv);
  todoDiv.classList.add("todo-div");

  // created the todo-list and added it to the div
  const todo = document.createElement("li");
  todoDiv.append(todo);
  //todo.addEventListener('click', () => todo.contentEditable = true)
  todo.innerText = todoInput.value; // setting the todo list to the input value
  todo.classList.add("todo-li");
  todoInput.value = null;

  // prevent empty values from being added
  if (todo.innerHTML === "") todoDiv.remove();
  

  // done button
  const doneBtn = document.createElement("button");
  todoDiv.appendChild(doneBtn);
  doneBtn.innerHTML = "&checkmark;";
  doneBtn.classList.add("done-btn");
  // complete check
  const completed = () => todoDiv.classList.toggle("completed")
  doneBtn.addEventListener("click", completed);

  // delete button
  const deleteBtn = document.createElement("button");
  todoDiv.append(deleteBtn);
  deleteBtn.innerHTML = "&times";
  deleteBtn.classList.add("trash-btn");
  // delete todo
  const deleteTodo = () => todoDiv.classList.add("fall")
  deleteBtn.addEventListener("click", () => {
    deleteTodo();
    todoDiv.addEventListener("transitionend", () => todoDiv.remove());
  });
};
const removeAllTodos = () => {
  // this function when invoked removes all the items on the todo list
  todoList.innerHTML = null;
  localStorage.clear()
};

const filterTodo =(event)=> {
  const todos = [...todoList.children]
  todos.forEach(todo => {
      switch(event.target.value) {
          case 'all':
              todo.style.display = 'flex'
              break;
          case 'completed':
              todo.classList.contains('completed') ? todo.style.display = 'flex' : todo.style.display = 'none'
              break;
          case 'uncompleted':
              !todo.classList.contains('completed') ? todo.style.display = 'flex' : todo.style.display = 'none'
          break;
      }
  })
}

// EVENT LISTENERS
//document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
clearAllBtn.addEventListener("click", removeAllTodos);
//todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
