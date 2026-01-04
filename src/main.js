import * as basicLightbox from "basiclightbox";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputEl = document.querySelector(".input-js");
const btnEl = document.querySelector(".btn-add");
const listEl = document.querySelector(".todo-list");

const todoArray = JSON.parse(localStorage.getItem("todo array")) || [];

const createTodo = (text) => ({
  id: Date.now(),
  status: "todo",
  text,
  blocked: false,
});

const createItem = (todo) => {
  const li = document.createElement("li");
  li.classList.add(todo.status);
  li.dataset.id = todo.id;
  li.textContent = todo.text;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.classList.add(todo.status === "todo" ? "btn-update" : "btn-delete");
  btn.textContent = todo.status === "complete" ? "DEL" : "";
  btn.disabled = "btn-update" ? todo.blocked : false;

  li.appendChild(btn);
  return li;
};

const renderTodos = () => {
  listEl.innerHTML = "";
  todoArray.forEach((todo) => {
    listEl.appendChild(createItem(todo));
  });
};

const onClickAdd = () => {
  const value = inputEl.value.trim();
  if (!value) {
    iziToast.error({
      message: "Input field is empty",
      position: "topRight",
      timeout: 3000,
    });
    return;
  }

  const todo = createTodo(value);
  todoArray.push(todo);
  localStorage.setItem("todo array", JSON.stringify(todoArray));
  renderTodos();
  inputEl.value = "";
};

const deleteTodo = (todoId) => {
  const index = todoArray.findIndex((t) => t.id === todoId);
  if (index !== -1) {
    todoArray.splice(index, 1);
    localStorage.setItem("todo array", JSON.stringify(todoArray));
    renderTodos();
  }
};

const openModal = (todo) => {
  todo.blocked = true;
  localStorage.setItem("todo array", JSON.stringify(todoArray));

  const instance = basicLightbox.create(`
    <div class="modal-container">
      <input type="text" class="input-modal" value="${todo.text}">
      <button type="button" class="btn-update-modal">Update</button>
      <button type="button" class="btn-close-modal">Close</button>
    </div>
  `);

  instance.show();

  const modalEl = instance.element();
  const inputModalEl = modalEl.querySelector(".input-modal");
  const updateBtn = modalEl.querySelector(".btn-update-modal");
  const closeBtn = modalEl.querySelector(".btn-close-modal");

  updateBtn.addEventListener("click", () => {
    const newText = inputModalEl.value.trim();
    if (!newText) {
      iziToast.error({
        message: "Input field is empty",
        position: "topRight",
        timeout: 3000,
      });
      return;
    }
    todo.text = newText;
    todo.blocked = false;
    localStorage.setItem("todo array", JSON.stringify(todoArray));
    renderTodos();
    instance.close();
  });

  closeBtn.addEventListener("click", () => {
    todo.blocked = false;
    localStorage.setItem("todo array", JSON.stringify(todoArray));
    renderTodos();
    instance.close();
  });
};

const onClickUpDate = (event) => {
  const li = event.target.closest("li");
  if (!li) return;

  const todoId = Number(li.dataset.id);
  const todo = todoArray.find((t) => t.id === todoId);
  if (!todo) return;

  if (event.target.classList.contains("btn-update")) {
    if (!todo.blocked) openModal(todo);
    return;
  }

  if (event.target.classList.contains("btn-delete")) {
    deleteTodo(todoId);
    return;
  }

  if (li.classList.contains("todo")) {
    li.classList.replace("todo", "complete");
    li.lastElementChild.classList.replace("btn-update", "btn-delete");
    li.lastElementChild.textContent = "DEL";
    todo.status = "complete";
  } else if (li.classList.contains("complete")) {
    li.classList.replace("complete", "todo");
    li.lastElementChild.classList.replace("btn-delete", "btn-update");
    li.lastElementChild.textContent = "";
    todo.status = "todo";
  }

  localStorage.setItem("todo array", JSON.stringify(todoArray));
};

renderTodos();
btnEl.addEventListener("click", onClickAdd);
listEl.addEventListener("click", onClickUpDate);
