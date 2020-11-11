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
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const listUsers = [
  {
    id:'01',
    email:'maks@gmail.com',
    password:'123456',
    displayName:'MaksJS'
  },
  {
    id:'02',
    email: 'kate@gmail.com',
    password: 'abcabc',
    displayName: 'Kate'
  }
];

const setUsers = {
  user:null,
  logIn(email,password){
    const user = this.getUser(email);

    if(user && user.password === password){
      this.autorizedUser(user)
    }else{
      alert('Пользователь с такими данными не найден');
    }
  },
  logOut() {
  },
  signUp(email, password , handler) {
    if(!this.getUser(email)){
      const user = {email,password,displayName:email}
      listUsers.push(user)
      this.authorizedUser(user);
      handler()
    }else{
      alert('Пользовател с таким email зарегистрирован')
    }
  },
  getUser(email){
    return listUsers.find(item => item.email === email)
  },
  authorizedUser(user){
    this.user = user;
  }
};

const togleAuthDom = () => {
  const user = setUsers.user;
  if(user){
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
}


loginForm.addEventListener('submit', event => {
  event.preventDefault();

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  setUsers.logIn(emailValue,passwordValue,togleAuthDom);
});


loginSignup.addEventListener('click', event => {
  event.preventDefault();

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  setUsers.signUp(emailValue, passwordValue,togleAuthDom);
});
togleAuthDom();