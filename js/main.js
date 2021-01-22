// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmGHty1uY9KvkV3t4IUSKJsR6y8IzFLMo",
  authDomain: "my-big-family-77d2d.firebaseapp.com",
  projectId: "my-big-family-77d2d",
  storageBucket: "my-big-family-77d2d.appspot.com",
  messagingSenderId: "215093759713",
  appId: "1:215093759713:web:d3b2f4855b5e38874e71a0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//console.log('firebase: ', firebase);


// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');


//const regExpValidEmail = /^\w{3,100}@\w+\.\w{2,}$/;

const regExpValidEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm

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

const postsWrapper = document.querySelector('.posts');
const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post');

const defaultPhoto = userAvatarElem.src;

//создаем массив  с двумя пользователями для входа
//!!! потом изменяем на свои данные
//добавляем id для базы данных
//const listUsers = [
//  {
//    id: '01',
//    email: 'maks@mail.ru',
//    password: '12345',
//    displayName: 'Maks',
//    photo: 'https://i.pinimg.com/originals/dc/43/51/dc435102bcfd9f84c27a433f47a50776.jpg'
//  },
//  {
//    id: '02',
//    email: 'kate@mail.com',
//    password: '123456',
//    displayName: 'Kate',
//    photo: 'https://mp3klab.ru/img.php?aHR0cHM6Ly9pLnl0aW1nLmNvbS92aS9aTUV1cGIxMl82WS9ocWRlZmF1bHQuanBn.jpg'
//  }
//];

//объект для работы с базой данных
const setUsers = {
  user: null,
  initUser(handler) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.user = user;
        
      } else {
        // User is signed out
        this.user = null;
      }
      if(handler) handler();
    })
  },
  logIn(email, password, handler) {
    if(!regExpValidEmail.test(email)){
    alert('email не корректный!');
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
  .catch(err => {
    const errCode = err.code;
    const errMessage = err.message;
    if (errCode === 'auth/wrong-password') {
      console.log(errMessage);
      alert('Неверный пароль!')
    } else if (errCode === 'auth/user-not-found') {
      console.log(errMessage);
      alert('Пользователь не зарегистрирован!')

    } else {
      alert(errMessage)
    }
  })
    //const user = this.getUser(email);
    //if(user && user.password === password) {
    //  this.authorizedUser(user);
    //  if(handler){
    //    handler();
    //  }
    //  
    //} else {
    //  alert('Пользователь с такими данными не найден. Пройдите авторизацию!')
    //}
  },
  logOut() {
    //console.log('выход')
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log('Sign-out successful');
    }).catch((error) => {
      // An error happened.
      console.log('An error happened.');
    });
    //this.user = null;
    //if(handler) {
    //  handler();
    //}
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

firebase.auth()
  .createUserWithEmailAndPassword(email, password)
  .then(data => {
    // Signed in 
    this.editUser(email.substring(0, email.indexOf('@')), null, handler)
  })
  .catch((err) => {
    const errCode = err.code;
    const errMessage = err.message;
    if (errCode === 'auth/weak-password') {
      console.log(errMessage);
      alert('Пароль должен быть более 6 знаков!')
    } else if (errCode === 'auth/email-alredy-in-use') {
      console.log(errMessage);
      alert('Этот email уже используется!')

    } else {
      alert(errMessage)
    }

    console.log(err);
  });

    //if (!this.getUser(email)){
    //  const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};
    //  listUsers.push(user);
    //  this.authorizedUser(user);
    //  if(handler) {
    //    handler();
    //  } 
    //} else {
    //  alert('Пользователь с таким email уже зарегистрирован! Введите другой email')
    //}
    
  },
  editUser(displayName, photoURL, handler) {

    const user = firebase.auth().currentUser;

    if(displayName) {
      if(photoURL) {
        user.updateProfile({
          displayName,
          photoURL
        }).then(handler)
      } else {
        user.updateProfile({
          displayName
        }).then(handler)
      }
    }
  },

//  //getUser(email){
  //  return listUsers.find(item => item.email === email)
  //},
  //authorizedUser(user) {
  //  this.user = user;
  //}
};

//функция входа будет в консоли 'вход',если вызвать фукциювыхода будет выход и т.д.
//наши кастомные функции
//setUsers.logIn();
//setUsers.signIn();
//setUsers.logOut();

const setPosts = {
allPosts: [
  {
    title: 'После Рождества в аккурат 11/01/2021',
    text: 'Сегодня вечером после обеда (так всегда в новогодние праздники) я случайно открыл дверку холодильника. Жена, как раз мыла посуду, и смеясь сказала отличную фразу: — "В Новый год мясо в холодильнике всё доели, салаты на Рождество съели, на сына День Рождения — сало с морозилки доедать будем!"',
    tags: ['мое'],
    author: {displayName: 'make', photo: 'https://i.pinimg.com/originals/dc/43/51/dc435102bcfd9f84c27a433f47a50776.jpg'},
    date: '11.11.2020, 20:54:00',
    like: 15,
    comments: 20,
  }
],
addPost(title, text, tags, handler) {

  const user = firebase.auth().currentUser;

  this.allPosts.unshift({
    id: `postID${(+new Date()).toString(16)}-${user.uid}`,
    title,
    text,
    tags: tags.split(',').map(item => item.trim()),
    author: {
      displayName:setUsers.user.displayName,
      photo: setUsers.user.photoURL,
    },
    date: new Date().toLocaleString(),
    like: 0,
    comments: 0,
  })
  
  firebase.database().ref('post').set(this.allPosts)
    .then(() => this.getPosts(handler))
    
 },
 getPosts(handler) {
   firebase.database().ref('post').on('value', snapshot => {
     this.allPosts = snapshot.val() || [];
     handler();
   })
  }
};

const toggleAuthDom = () => {
  const user = setUsers.user;
  console.log('user: ', user);

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photoURL || defaultPhoto;
    buttonNewPost.classList.add('visible');
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
  }
};

const showAddPost = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
}






const showAllPosts = () => {
  
  let postsHTML = '';

  setPosts.allPosts.forEach(({ title, text, date, tags, like, comments, author }) => {

    postsHTML += `
    <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          <p class="post-text">${text}</p>
          <div class="tags">
            ${tags.map(tag => `<a href="#${tag}" class="tag">#${tag}</a>`)}
          </div>
        </div>
        <div class="post-footer">
          <div class="post-buttons">
            <button class="post-button likes">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="img/icons.svg#like"></use>
              </svg>
              <span class="likes-counter">${like}</span>
            </button>
            <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">${comments}</span>
            </button>
            <button class="post-button save">
              <svg width="19" height="19" class="icon icon-save">
                <use xlink:href="img/icons.svg#save"></use>
              </svg>
            </button>
            <button class="post-button share">
              <svg width="17" height="19" class="icon icon-share">
                <use xlink:href="img/icons.svg#share"></use>
              </svg>
            </button>
          </div>
          <div class="post-author">
            <div class="author-about">
              <a href="#" class="author-username">${author.displayName}</a>
              <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link"><img src=${author.photo || "img/avatar3.jpg"} alt="avatar" class="author-avatar"></a>
          </div>
        </div>
      </section>
    `;
    
  })
  
  postsWrapper.innerHTML = postsHTML;

  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
};


//выводим в консоли события при нажатии на кнопку или enter
//для этого вводим наш пароль и почту(выше создали)
//console.log(event) внутри функции
//метод вход
//получаем значения почты и пароля
const init = () => {

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
  setUsers.logOut();
  
  });
  
  editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  });
  
  editContainer.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  })
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
   event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
   menu.classList.toggle('visible');
})

  buttonNewPost.addEventListener('click', event => {
    event.preventDefault();
    showAddPost();
  });

  addPostElem.addEventListener('submit', event => {
    event.preventDefault();
    const { title, text, tags } = addPostElem.elements;
    if(title.value.length<6){
      alert('Слишком короткий заголовок');
      return;
    }
    if(text.value.length<50){
      alert('Слишком короткий пост');
      return;
    }
    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
    addPostElem.classList.remove('visible');
    addPostElem.reset();
    
  });

  setUsers.initUser(toggleAuthDom)
  setPosts.getPosts(showAllPosts)
  
}

document.addEventListener('DOMContentLoaded', () => {
  init();
})
