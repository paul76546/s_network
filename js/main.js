// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

const regExpValidEmail = /^\w{3,100}@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
 //console.log(loginElem);
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem =  document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');

const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector(".user-avatar");
//создаем массив  с двумя пользователями для входа
//!!! потом изменяем на свои данные
//добавляем id для базы данных
const listUsers = [
  {
    id: '01',
    email: 'maks@mail.ru',
    password: '12345',
    displayName: 'MaksJS'
  },
  {
    id: '02',
    email: 'kate@mail.com',
    password: '123456',
    displayName: 'KateKillMaks'
  }
];

//объект для работы с базой данных
const setUsers = {
  user: null,
  logIn(email, password, handler) {
    if(!regExpValidEmail.test(email)){
    alert('email не корректный!');
    return;
  }
    const user = this.getUser(email);
    if(user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден. Пройдите авторизацию!')
    }
  },
  logOut(handler) {
    //console.log('выход')
    this.user = null;
    handler();
  },
  signUp(email, password, handler) {
    if(!regExpValidEmail.test(email)) {
      alert('email не корректный!');
      return;
    }
    if(!email.trim() || !password.trim()) {
      alert('Введите данные!')
      return;
    }

    if (!this.getUser(email)){
      const user = {email, password, displayName: email};
      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    }  else {
      alert('Пользователь с таким email уже зарегистрирован! Введите другой email')
    }
    
  },
  editUser(userName, userPhoto, handler) {
    if(userName) {
      this.user.displayName = userName;
    }
    if(userPhoto) {
      this.user.photo = userPhoto;
    }
    handler();
  },

  getUser(email){
    return listUsers.find(item => item.email === email)
  },
  authorizedUser(user) {
    this.user = user;
  }
};

//функция входа будет в консоли 'вход',если вызвать фукциювыхода будет выход и т.д.
//наши кастомные функции
//setUsers.logIn();
//setUsers.signIn();
//setUsers.logOut();

const toggleAuthDom = () => {
  const user = setUsers.user;
  console.log('user: ', user);

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo ? user.photo : userAvatarElem.src;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};




//выводим в консоли события при нажатии на кнопку или enter
//для этого вводим наш пароль и почту(выше создали)
//console.log(event) внутри функции
//метод вход
//получаем значения почты и пароля
loginForm.addEventListener('submit', event => {
  event.preventDefault();
  
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  
  setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
  loginForm.reset();
});

//метод регистрация
loginSignup.addEventListener('click', event => {
  event.preventDefault();

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();


  setUsers.signUp(emailValue, passwordValue, toggleAuthDom)
  loginForm.reset();
});

exitElem.addEventListener('click', event => {
event.preventDefault();
setUsers.logOut(toggleAuthDom);

});

editElem.addEventListener('click', event => {
  event.preventDefault();
  editContainer.classList.toggle('visible');
});

editContainer.addEventListener('click', event => {
  event.preventDefault();
  setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
});

toggleAuthDom();

