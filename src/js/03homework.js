import throttle from 'lodash.throttle';

// 1. Виконано за допомогою команди.

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form  input[name="email"]'),
  message: document.querySelector('.feedback-form  textarea[name="message"]'),
};

const FEEDBACK_STORAGE_KEY = 'feedback-form-state';

const saveData = function (dataObject) {
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(dataObject));
};

const getData = function () {
  const savedData = localStorage.getItem(FEEDBACK_STORAGE_KEY);
  try {
    return JSON.parse(savedData);
  } catch (error) {
    console.log(`${error.name}:  ${error.message}`);
    return null;
  }
};

const onDocumentLoad = function () {
  const userData = getData();
  if (userData) {
    refs.email.value = userData.email;
    refs.message.value = userData.message;
  }
  document.removeEventListener('DOMContentLoaded', onDocumentLoad);
};

const onFormInput = function () {
  const userData = {};
  userData.email = refs.email.value;
  userData.message = refs.message.value;
  saveData(userData);
};

const onFormSubmit = function (event) {
  event.preventDefault();
  const userData = getData();
  if (!userData) {
    alert('Введіть дані у форму!');
    return;
  }
  const { email, message } = userData;
  if (email === '' || message === '') {
    alert('Усі поля форми повинні бути заповнені!');
  } else {
    localStorage.removeItem(FEEDBACK_STORAGE_KEY);
    console.log(userData);
    event.currentTarget.reset();
  }
};

document.addEventListener('DOMContentLoaded', onDocumentLoad);
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));


// 2. Виконував самостійно, вибиває помилку throttle.



// const formEl = document.querySelector('.feedback-form');
// const inputEl = document.querySelector('.feedback-form input');
// const textareaEl = document.querySelector('.feedback-form textarea');

// const localStorageFeedback = localStorage.setItem('feedback-form-state', JSON.stringify());

// if (localStorageFeedback) {
//   inputEl.value = localStorageFeedback.email;
//   textareaEl.value = localStorageFeedback.message;
// } else {
//   inputEl.value = '';
// textareaEl.value = '';
// }


// function onChange(event) {
//   event.preventDefault();
//   // console.log(event.target.value);
//   const {
//     elements: { email, message },
//   } = event.currentTarget;
//   const object = {
//     email: email.value,
//     message: message.value,
//   };
//   localStorage.setItem('feedback-form-state', JSON.stringify(object));
// }

// function onBtnClick(event) {
//   event.preventDefault();
//   const resultObj = {
//     email: inputEl.value,
//     message: textareaEl.value,
//   };
//   console.log(resultObj);
//   inputEl.value = '';
//   textareaEl.value = '';
//   localStorage.removeItem('feedback-form-state');
// }

// formEl.addEventListener('submit', onBtnClick);
// formEl.addEventListener('input', onChange);
