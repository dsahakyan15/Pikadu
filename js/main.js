

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCRWZerDhPoeRCuhEHHjm9ObzHVn6e970g",
  authDomain: "pikapika-ac808.firebaseapp.com",
  databaseURL: "https://pikapika-ac808.firebaseio.com",
  projectId: "pikapika-ac808",
  storageBucket: "pikapika-ac808.appspot.com",
  messagingSenderId: "291993988323",
  appId: "1:291993988323:web:fba0f0ddbede38ee57a9d6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);




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
const buttonNewPost = document.querySelector('.button-new-post')
const postsWrapper = document.querySelector('.posts');
const addPostElem = document.querySelector('.add-post');

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
  logIn(email, password, handler) {
    if (!regExpEmail.test(email)) {
      return alert('email не валиден');
    }

    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user)
      handler();
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
      author: { displayName: 'maks', photo: 'https://www.google.am/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png' },
      date: '11.11.2020,20:54:00',
      like: 15,
      comments: 20,
    },
    {
      title: 'Заголовок поста',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит! ',
      tags: ['#свежее', '#новое', '#горячее', '#мое', '#случайность'],
      author: { displayName: 'google', photo: 'https://www.google.am/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png' },
      date: '11.11.2020,20:54:00',
      like: 45,
      comments: 12,
    }
  ],
  addPost(title,text,tags,handler){
    this.allPosts.unshift({
      title,
      text,
      tags:tags.split(',').map(item => item.trim()),
      author:{
        displayName:setUsers.user.displayName,
        photo: setUsers.user.photo,
      },
      date:new Date().toLocaleString(),
      like:0,
      comments:0,
      
    });
    handler();
  }
}

const togleAuthDom = () => {
  const user = setUsers.user;
  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo ? user.photo : userAvatarElem.src;
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
  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');

  let postHTML = ''

  setPosts.allPosts.forEach(({ title, text, date, tags, like, comments, author }) => {

    postHTML += `
      <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          
          <p class="post-text">${text}</p>
          <div class="tags">
            ${tags.map(tag => `<a href="#" class="tag">${tag}</a>`)}
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
          <!-- /.post-buttons -->
          <div class="post-author">
            <div class="author-about">
              <a href="#" class="author-username">${author.displayName}</a>
              <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link"><img src="${author.photo || 'img/avatar.jpeg'}" alt="avatar" class="author-avatar"></a>
          </div>
          <!-- /.post-author -->
        </div>
        <!-- /.post-footer -->
      </section>`
  })
  postsWrapper.innerHTML = postHTML
};


const init = () => {

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

  menuToggle.addEventListener('click', function (event) {
    event.preventDefault();
    menu.classList.toggle('visible');
  })

  buttonNewPost.addEventListener('click', event => {
    event.preventDefault();
    showAddPost();
  })
  addPostElem.addEventListener('submit', event => {
    event.preventDefault();
    const {title , text ,tags } = addPostElem.elements;

    if(title.value.length < 6){
      alert('Слишком короткий заголовок');
      return;
    }
    if (text.value.length < 50) {
      alert('Слишком короткий пост');
      return;
    }

    setPosts.addPost(title.value,text.value,tags.value,showAllPosts);

    addPostElem.classList.remove('remove');
  })

  showAllPosts();
  togleAuthDom();
}


document.addEventListener('DOMContentLoaded', init())