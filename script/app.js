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
  // const noTaskScreen = getElmByHtml('.task__no-task');

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
    saveLocalStorage();
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
      saveLocalStorage();
      noTaskScreen();
    }
  }

  function chekTaskDone(event) {
    const checkbox = getElmByHtml('.item__checkbox');
    if (event.target.classList.contains('item__checkbox')) {
      const parent = event.target.closest('.task__item');
      const id = parent.id;
      
      const taskStatus = tasksListArray.findIndex((item) => item.id === +id);
      tasksListArray[taskStatus].done = !tasksListArray[taskStatus].done;

      saveLocalStorage();
      parent.querySelector('.item__text').classList.toggle('done');
    }
  }

  function noTaskScreen() {
    const noTaskScreen = getElmByHtml('.task__no-task');
    tasksListArray.length === 0
      ? noTaskScreen.classList.add('active')
      : noTaskScreen.classList.remove('active');
  }
  function saveLocalStorage() {
    localStorage.setItem('tasksListArray', JSON.stringify(tasksListArray));
  }

  function renderTask(task) {
    //Добавление и удаление класса `task__done` /
    const addAndRemoveClass = task.done ? 'item__text done' : 'item__text';
    const statusCheckbox =
      addAndRemoveClass === 'item__text done' ? 'checked' : '';
    const descriptionOnHtml = `
          <li id="${task.id}" class="task__item item"> 
            <div class="item__block">
              <input type="checkbox" class="item__checkbox" ${statusCheckbox}>
              <p class="${addAndRemoveClass}">${task.description}</p>
              <svg class="ico item__cart">
                <use href="images/sprite.svg#delete-icon"></use>
              </svg>
            </div>
          </li>`;
    tasksList.insertAdjacentHTML('beforeend', descriptionOnHtml);
  }

