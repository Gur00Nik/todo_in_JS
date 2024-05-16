const containerInput = document.querySelector(".input__container");
const firstCharInInput = document.querySelector(".entered__char").firstChild;
const todoList = document.querySelector(".todo__list");
const buttonDeleteAll = document.querySelector(".delete__all");
const buttonDeleteSpecific = document.querySelector(".delete");

const buttonInput = containerInput.lastElementChild;
const input = containerInput.firstElementChild;

const getLastCharInInput = () => {
  let valueInput = input.value;
  firstCharInInput.textContent = `Ваш последний введенный символ - ${
    valueInput[valueInput.length - 1]
  } \n 
  Введенный текст - ${valueInput}`;
};

const addToDo = () => {
  if (input.value.trim() == "") {
    alert("Введите задачу");
  } else {
    firstCharInInput.textContent = "";

    todoList.innerHTML += ` <div class="todo__item">
      <div class="todo__text">${input.value}</div>
      <button class="button__delete">Удалить</button>
      <input type="checkbox" value="checked"> 
    </div>`;

    input.value = "";
  }
};

const deleteToDo = (event) => {
  event.target.parentElement.remove();
};

const deleteSpecificToDo = () => {
  document.querySelectorAll(".todo__item").forEach((item) => {
    if (item.children[2].checked == true) {
      item.remove();
    }
  });
};

const deleteAllToDo = () => {
  todoList.innerHTML = "";
};

input.addEventListener("input", getLastCharInInput);

buttonInput.addEventListener("click", () => {
  addToDo();
  let todoItems = document.querySelectorAll(".button__delete");

  todoItems.forEach((todoItem) => {
    todoItem.addEventListener("click", deleteToDo);
  });
});

buttonDeleteSpecific.addEventListener("click", deleteSpecificToDo);

buttonDeleteAll.addEventListener("click", deleteAllToDo);
