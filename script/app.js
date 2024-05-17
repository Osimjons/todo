'use strict';

/**`Функция создания перменных и получения элементов из HTML` */
const getElmByHtml = (selector) => {
  const element = document.querySelector(selector);
  return element;
};

/**`Получение Формы из HTML` */
const form = getElmByHtml('form');
const input = getElmByHtml('.form__input');
const tasksList = getElmByHtml('.task__list');

/**`Массив с объектами` */
let tasksListArray = [];

/**Достаем из  данные из localStorage*/
if (localStorage.getItem('tasksListArray')) {
  tasksListArray = JSON.parse(localStorage.getItem('tasksListArray'));
}
tasksListArray.forEach((task) => renderTask(task));
noTaskScreen();

/**`Функция добовления задач` */
form.addEventListener('submit', addTask);
/**`Функция добовления задач` */
tasksList.addEventListener('click', deleteTask);
/**`Функция выполнении задач` */
tasksList.addEventListener('click', chekTaskDone);

/**`Функция добовления задач` */
function addTask(event) {
  event.preventDefault();
  const taskDescription = input.value.trim();

  if (!taskDescription) return;
  const newTask = {
    description: taskDescription,
    done: false,
    id: Date.now(),
  };
  tasksListArray.push(newTask);

  renderTask(newTask);
  input.value = '';
  // creatingTaskCounter(tasksListArray);
  saveLocalStorage();
  taskOfDone(tasksListArray);
  noTaskScreen();
}

/**`Функция удаления задач` */
function deleteTask(event) {
  if (event.target.classList.contains('item__cart')) {
    const parent = event.target.closest('.task__item');
    const id = parent.id;
    const index = tasksListArray.findIndex((item) => item.id === +id);
    tasksListArray.splice(index, 1);
    parent.remove();
    // creatingTaskCounter(tasksListArray);
    saveLocalStorage();
    noTaskScreen();
    taskOfDone(tasksListArray);
  }
}

function chekTaskDone(event) {
  if (event.target.classList.contains('item__checkbox')) {
    const parent = event.target.closest('.task__item');
    const id = parent.id;

    const taskStatus = tasksListArray.findIndex((item) => item.id === +id);
    tasksListArray[taskStatus].done = !tasksListArray[taskStatus].done;

    saveLocalStorage();
    parent.querySelector('.item__text').classList.toggle('done');
    // creatingTaskCounter(tasksListArray);
    taskOfDone(tasksListArray);
  }
}

function noTaskScreen() {
  const noTaskScreen = getElmByHtml('.task__no-task');
  tasksListArray.length === 0
    ? noTaskScreen.classList.add('active')
    : noTaskScreen.classList.remove('active');
}

/**`Сохранение в LocalStorage` */
function saveLocalStorage() {
  localStorage.setItem('tasksListArray', JSON.stringify(tasksListArray));
}

/**`Выдов на дисплей` */
function renderTask(task) {
  //Добавление и удаление класса `task__done` /
  const addAndRemoveClass = task.done ? 'item__text done' : 'item__text';
  const statusCheckbox =
    addAndRemoveClass === 'item__text done' ? 'checked' : '';
  const descriptionOnHtml = `
          <li id="${task.id}" class="task__item item hr"> 
            <div class="item__block">
              <input type="checkbox" class="item__checkbox" ${statusCheckbox}>
              <p class="${addAndRemoveClass}">${task.description}</p>
              <svg class="ico item__cart">
                <use href="images/sprite.svg#delete-icon"></use>
              </svg>
            </div>
          </li>`;
  tasksList.insertAdjacentHTML('beforeend', descriptionOnHtml);
  // creatingTaskCounter(tasksListArray);
}

/**`Вывод на дисплей общее количество и  выполненных задачь` */
function taskOfDone(tasks) {
  /**`Массив с завершенными заадчами` */
  const filteredArray = [];
  const allTasksScreen = getElmByHtml('.todo-counts__completed');
  getElmByHtml('.todo-counts__created-count').innerText = tasks.length;
  tasks.filter((item) =>
    item.done === true ? filteredArray.push(item) : null
  );

  return (allTasksScreen.innerHTML = `
        <span class="todo-counts__complet">Завершено:</span>
        <span class="todo-counts__created-count">${filteredArray.length} из ${tasks.length}</span>`);
}
taskOfDone(tasksListArray);
