const containerInput = document.querySelector(".input__container");
const firstCharInInput = document.querySelector(".entered__char").firstChild;
const todoList = document.querySelector(".todo__list");
const buttonDeleteAll = document.querySelector(".delete__all");
const buttonDeleteSpecific = document.querySelector(".delete");

const buttonInput = containerInput.lastElementChild;
const input = containerInput.firstElementChild;

let tasks = [];

let idSelectedTasks = [];

const getLastCharInInput = () => {
  let valueInput = input.value;
  firstCharInInput.textContent = `Ваш последний введенный символ - ${
    valueInput[valueInput.length - 1]
  } \n 
  Введенный текст - ${valueInput}`;
};

const renderToDoList = () => {
  todoList.innerHTML = `${tasks
    .map(
      ({ text, id }, index) => `<div data-id="${id}" class="todo__item">
     <div class="todo__text">${index}. ${text} . ${id.toString()} </div>
        <button class="button__delete">Удалить</button>
        <input class="input__checkbox"type="checkbox" value="checked"> 
     </div>`
    )
    .join("")}`;

  setAtributeCheckedWithCheckBox();

  // console.log(idSelectedTasks);
};

const setAtributeCheckedWithCheckBox = () => {
  let idTasks = tasks.map((task) => task.id.toString());

  let filteredTasks = idTasks.filter((id) => !idSelectedTasks.includes(id));

  let allCheckBox = document.querySelectorAll(".input__checkbox");

  allCheckBox.forEach((checkbox, index) => {
    let thisCheckBox = allCheckBox[index];

    let idCheckBox = checkbox.parentElement.getAttribute("data-id");

    if (!filteredTasks.includes(idCheckBox)) {
      thisCheckBox.setAttribute("checked", "true");
    }
  });
  // console.log(filteredTasks);
  filteredTasks = [];
};

const addToDo = () => {
  if (!input.value.trim()) {
    alert("Введите задачу");
    return {
      shouldRerender: false,
    };
  } else {
    tasks.push({
      id: Date.now(),
      text: input.value,
    });
    firstCharInInput.textContent = "";
    input.value = "";
    return {
      shouldRerender: true,
    };
  }
};

const deleteToDo = (event) => {
  let numberToDo = Number(
    event.target.parentElement.querySelector(".todo__text").textContent[0]
  );

  let filteeredTasks = tasks.filter((_, index) => index !== numberToDo);

  tasks = filteeredTasks;
  // console.log(numberToDo);
  // console.log(filteeredTasks);
};

const setEventListener = () => {
  let allDeleteButton = document.querySelectorAll(".button__delete");
  allDeleteButton.forEach((button) => {
    button.addEventListener("click", deleteToDoAndRender);
  });

  let allCheckBox = document.querySelectorAll(".input__checkbox");

  allCheckBox.forEach((checkbox) => {
    let idCheckBox = checkbox.parentElement.getAttribute("data-id");

    // let thisCheckBox = allCheckBox[index];

    checkbox.addEventListener("change", (event) => {
      // event.target.parentElement.getAttribute("data-id");

      event.target.checked
        ? idSelectedTasks.push(idCheckBox)
        : (idSelectedTasks = idSelectedTasks.filter((id) => id !== idCheckBox));

      console.log(idSelectedTasks);
    });
  });
};

const addToDoAndRerender = () => {
  const { shouldRerender } = addToDo();

  if (shouldRerender) {
    renderToDoList();
    setEventListener();
  }
};

const deleteToDoAndRender = (event) => {
  deleteToDo(event);
  renderToDoList();
  setEventListener();
};

const deleteAllToDoAndRender = () => {
  deleteAllToDo();
  renderToDoList();
};

const deleteSelectedToDosAndRender = () => {
  deleteSelectedToDos();
  setEventListener();
  renderToDoList();
};

const getSelectedToDos = () => {
  let allCheckBox = document.querySelectorAll(".input__checkbox");
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) {
      let idSelectedTask = checkbox.parentElement.getAttribute("data-id");
      idSelectedTasks.push(idSelectedTask);
    }
  });
};

const deleteSelectedToDos = () => {
  getSelectedToDos();

  let filteredTasks = tasks.filter(
    (item) => !idSelectedTasks.map((item) => Number(item)).includes(item.id)
  );
  tasks = filteredTasks;

};

const deleteAllToDo = () => {
  tasks = [];
};

input.addEventListener("input", getLastCharInInput);

buttonInput.addEventListener("click", addToDoAndRerender);

buttonDeleteSpecific.addEventListener("click", deleteSelectedToDosAndRender);

buttonDeleteAll.addEventListener("click", deleteAllToDoAndRender);
