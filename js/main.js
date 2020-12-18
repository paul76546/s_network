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

const loginElem = document.querySelector('.login');
 //console.log(loginElem);
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem =  document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

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
    const user = this.getUser(email);
    if(user && user.password === password){
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден. Пройдите авторизацию!')
    }
  },
  logOut() {
    console.log('выход')
  },
  signUp(email, password, handler) {

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

toggleAuthDom();

