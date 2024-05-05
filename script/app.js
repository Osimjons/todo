'use strict';
/**Функция создания перменных и получения элементов из HTML */
const getElmByHtml = (selector) => {
  const element = document.querySelector(selector);
  return element;
};

const form = getElmByHtml('form');
let input = getElmByHtml('.form__input');
const button = getElmByHtml('.form__button');
let inputValue = input.value;
const allTasks = getElmByHtml('.todo-counts__created-count');
const completTasks = getElmByHtml('.todo-counts__completed');
let text = getElmByHtml('.task__list');
const noTaskDislay = getElmByHtml('.task__no-task');
const doneTasks = getElmByHtml('.item__text'); //Переменная для зачеркивания задачи как завешенная
const checkbox = getElmByHtml('.item__checkbox');
// console.log('checkbox: ', checkbox);

noTaskDislay.classList.add('active');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  createTask(input.value);
  outOnDisplay(task);
  noTaskDislay.classList.remove('active');
  input.value = '';
});

const task = [];

const createTask = (value) => {
  value = value.trim();
  // value = value.split('').charAt(0).toUpperCase() + value.slice(1);
  if (value === '') return;
  task.push(value);
  return task;
};

const outOnDisplay = (taskArr) => {
  text.innerHTML = taskArr
    .map((item, i) => {
      return `
      <li class="task__item item hr">
        <div class="item__block">
          <input type="checkbox" class="item__checkbox">
          <span class = "counter">${(allTasks.textContent = i + 1)}</span>
          <p class="item__text ">${item}</p>
          <svg class="ico item__cart">
            <use href="images/sprite.svg#musor_;-)"></use>
          </svg>
        </div>
      </li>
      `;
    })
    .join('');
};

task.forEach((task) => {
  if (checkbox.checked === true) {
    doneTasks.classList.add('done');
  }
});

// document.querySelectorAll('.item__checkbox').forEach((checkbox, index) => {
//   checkbox.addEventListener('change', () => {
//     const textEl = text.querySelectorAll('.item__text')[index];
//     textEl.classList.toggle('done', checkbox.checked);
//   });
// });
