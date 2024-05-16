const containerInput = document.querySelector(".input__container");

const firstCharInInput = document.querySelector(".entered__char").firstChild;

const todoList = document.querySelector(".todo__list");

const buttonDeleteAll = document.querySelector(".delete__all");

const buttonDeleteSpecific = document.querySelector(".delete");

const buttonInput = containerInput.lastElementChild;

const input = containerInput.firstElementChild;

// console.log(containerInput);
// console.log(buttonInput);
// console.log(input);
input.addEventListener("input", () => {
  valueInput = input.value;
  firstCharInInput.textContent = valueInput[valueInput.length - 1];
  return valueInput;
});

buttonInput.addEventListener("click", () => {
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

    let todoItems = document.querySelectorAll(".button__delete");

    todoItems.forEach((todoItem) => {
      todoItem.addEventListener("click", (event) => {
        event.target.parentElement.remove();
      });
    });
  }
});

buttonDeleteSpecific.addEventListener("click", () => {
  // console.log(document.querySelectorAll(".todo__item"));
  document.querySelectorAll(".todo__item").forEach((item) => {
    if (item.children[2].checked == true) {
      item.remove();
    }
  });
});

buttonDeleteAll.addEventListener("click", () => {
  todoList.innerHTML = "";
});
