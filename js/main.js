let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');
const regExpEmail = /^\w+@\w+\.\w{2,}$/;
const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const exitElem = document.querySelector('.exit')
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');
const userAvatarElem = document.querySelector('.user-avatar');
const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');

const postsWrapper = document.querySelector('.posts')

const listUsers = [
  {
    id: '01',
    email: 'maks@gmail.com',
    password: '123456',
    displayName: 'MaksJS'
  },
  {
    id: '02',
    email: 'kate@gmail.com',
    password: 'abcabc',
    displayName: 'Kate'
  }
];

const setUsers = {
  user: null,
  logIn(email, password) {
    const user = this.getUser(email);

    if (!regExpEmail.test(email)) {
      alert('email не валиден');
      return;
    }
    if (user && user.password === password) {
      this.autorizedUser(user)
    } else {
      alert('Пользователь с такими данными не найден');
    }
  },
  logOut(handler) {
    this.user = null;
    handler();
  },
  signUp(email, password, handler) {

    if (!email.trim() && !password.trim()) {
      alert('Введите данные');
      return;
    }
    if (!this.getUser(email)) {
      const user = { email, password, displayName: email.substring(0, email.indexOf('@')) }
      listUsers.push(user)
      this.authorizedUser(user);
      handler()
    } else {
      alert('Пользовател с таким email зарегистрирован')
    }
  },
  editUser(login, url = '', handler) {
    if (login) {
      this.user.displayName = login
    }
    if (url) {
      this.user.photo = url
    }
    handler();
  },
  getUser(email) {
    return listUsers.find(item => item.email === email)
  },
  authorizedUser(user) {
    this.user = user;
  }
};

const setPosts = {
  allPosts: [
    {
      title: 'Заголовок поста',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит! ',
      tags: ['#свежее', '#новое', '#горячее', '#мое', '#случайность'],
      author: 'maks@mail.com',
      date: '11.11.2020,20:54:00',
      like: 15,
      comments: 20,
    },
    {
      title: 'Заголовок поста',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит! ',
      tags: ['#свежее', '#новое', '#горячее', '#мое', '#случайность'],
      author: 'maks@mail.com',
      date: '11.11.2020,20:54:00',
      like: 45,
      comments: 12,
    }
  ]
}

const togleAuthDom = () => {
  const user = setUsers.user;
  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo ? user.photo : userAvatarElem.src
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
}


const showAllPosts = () => {
  let postHTML = ''

  setPosts.allPosts.forEach(({ title, text, date }) => {

    postHTML += `
      <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          
          <p class="post-text">${text}</p>
          <div class="tags">
            <a href="#" class="tag">#случайность</a>
          </div>
          <!-- /.tags -->
        </div>
        <!-- /.post-body -->
        <div class="post-footer">
          <div class="post-buttons">
            <button class="post-button likes">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="img/icons.svg#like"></use>
              </svg>
              <span class="likes-counter">26</span>
            </button>
            <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">157</span>
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
          <!-- /.post-buttons -->
          <div class="post-author">
            <div class="author-about">
              <a href="#" class="author-username">arteislamov</a>
              <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
          </div>
          <!-- /.post-author -->
        </div>
        <!-- /.post-footer -->
      </section>`
  })

  postsWrapper.innerHTML = postHTML
}
const init = () => {
  menuToggle.addEventListener('click', function (event) {
    event.preventDefault();
    menu.classList.toggle('visible');
  })

  loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.logIn(emailValue, passwordValue, togleAuthDom);
    loginForm.reset();
  });

  loginSignup.addEventListener('click', event => {
    event.preventDefault();

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.signUp(emailValue, passwordValue, togleAuthDom);
    loginForm.reset();
  });

  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut(togleAuthDom);
  })

  editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.displayName
  })

  editContainer.addEventListener('submit', event => {
    event.preventDefault()

    setUsers.editUser(editUsername.value, editPhotoURL.value, togleAuthDom)
    editContainer.classList.remove('visible')
  })


  showAllPosts();
  togleAuthDom();
}


document.addEventListener('DOMContentLoaded', init())