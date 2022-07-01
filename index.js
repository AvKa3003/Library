let dbExemple = {
  user0: {
    userName: "Аврамов Кирилл Дмитриевич",
    userRecords: {
      record0: {
        id: 8463,
        name: "Зайчик",
        author: "Дмитрий Мордас",
        start: "2021-10-18",
        end: "2021-11-12"
      },
      record1: {
        id: 4532,
        name: "Последнее желание",
        author: "Анджей Сапкковский",
        start: "2021-11-01",
        end: "2021-11-14"
      }
    }
  },
  user1: {
    userName: "Осян Давид Артурович",
    userRecords: { }
  },
  user2: {
    userName: "Леоненко Никита Андреевич",
    userRecords: {
      record0: {
        id: 1234,
        name: "Гарри Поттер и философский камень",
        author: "Джоан Роулинг",
        start: "2021-10-27",
        end: "2021-11-12"
      }
    }
  }
};
let db = {};
if (localStorage.getItem('libraryDB')){
  db = JSON.parse(localStorage.getItem('libraryDB'));
} else {
  db = dbExemple;
}

const userPrefix = 'user';
const recordPrefix = 'record';
const binUserPrefix = 'bin-user';
const binRecordPrefix = 'bin-record';

let lastUser = Object.keys(db).length - 1;
const users = document.querySelector('.users');
const records = document.querySelector('.records');

const inputUserId = document.getElementById('userName');
const inputRecordId = document.getElementById('recordId'); 
const inputRecordName = document.getElementById('recordName');
const inputRecordAuthor = document.getElementById('recordAuthor');
const inputRecordStart = document.getElementById('recordStart');
const inputRecordEnd = document.getElementById('recordEnd');

const addRecord = document.getElementById('add-record');
const addUser = document.getElementById('add-user');

let userBins;
let recordBins;

let selectedUser = '';
let selectedRecord = '';

//selected start value
if (Object.keys(db).length > 0) {
  let firstUserName = Object.keys(db)[0];
  selectedUser = +Object.keys(db)[0].substring(userPrefix.length);
  if (Object.keys(db[firstUserName].userRecords).length > 0) {
    selectedRecord = +Object.keys(db[firstUserName].userRecords)[0].substring(recordPrefix.length); 
  } else {
    selectedRecord = "";
  }
} else {
  selectedUser = "";
}

function setStartSelectedRecord() {
  if (Object.keys(db[userPrefix + selectedUser].userRecords).length > 0) {
    selectedRecord = +(Object.keys(db[userPrefix + selectedUser].userRecords))[0].substring(recordPrefix.length);
  } else {
    selectedRecord = '';
  }
}

function updateUserName() {
  let curUser = document.getElementById(userPrefix + selectedUser);
  curUser.children[0].innerHTML = inputUserId.value;
  db[userPrefix + selectedUser].userName = inputUserId.value;
}
function updateRecordId() {
  let curRecord = document.getElementById(recordPrefix + selectedRecord);
  curRecord.querySelector('.recordId').innerHTML = inputRecordId.value;
  db[userPrefix + selectedUser].userRecords[recordPrefix + selectedRecord].id = inputRecordId.value;
}
function updateRecordName() {
  let curRecord = document.getElementById(recordPrefix + selectedRecord);
  curRecord.querySelector('.recordName').innerHTML = inputRecordName.value;
  db[userPrefix + selectedUser].userRecords[recordPrefix + selectedRecord].name = inputRecordName.value;
}
function updateRecordAuthor() {
  let curRecord = document.getElementById(recordPrefix + selectedRecord);
  curRecord.querySelector('.recordAuthor').innerHTML = inputRecordAuthor.value;
  db[userPrefix + selectedUser].userRecords[recordPrefix + selectedRecord].author = inputRecordAuthor.value;
}
function updateRecordStart() {
  let curRecord = document.getElementById(recordPrefix + selectedRecord);
  curRecord.querySelector('.recordStart').innerHTML = inputRecordStart.value;
  db[userPrefix + selectedUser].userRecords[recordPrefix + selectedRecord].start = inputRecordStart.value;
}
function updateRecordEnd() {
  let curRecord = document.getElementById(recordPrefix + selectedRecord);
  curRecord.querySelector('.recordEnd').innerHTML = inputRecordEnd.value;
  db[userPrefix + selectedUser].userRecords[recordPrefix + selectedRecord].end = inputRecordEnd.value;
}


function updateRecordInput() {
  if (selectedRecord !== '') {
    inputRecordId.removeAttribute('disabled');
    inputRecordName.removeAttribute('disabled');
    inputRecordAuthor.removeAttribute('disabled');
    inputRecordStart.removeAttribute('disabled');
    inputRecordEnd.removeAttribute('disabled');
    let curRecord = db[userPrefix + selectedUser].userRecords[recordPrefix + selectedRecord];
    inputRecordId.value = curRecord.id;
    inputRecordName.value = curRecord.name;
    inputRecordAuthor.value = curRecord.author;
    inputRecordStart.value = curRecord.start;
    inputRecordEnd.value = curRecord.end;
  } else {
    inputRecordId.value = '';
    inputRecordName.value = '';
    inputRecordAuthor.value = '';
    inputRecordStart.value = '';
    inputRecordEnd.value = '';
    inputRecordId.setAttribute('disabled',true);
    inputRecordName.setAttribute('disabled',true);
    inputRecordAuthor.setAttribute('disabled',true);
    inputRecordStart.setAttribute('disabled',true);
    inputRecordEnd.setAttribute('disabled',true);
  }
  
}

function renderUserSelected() {
  let usersCreated = document.querySelectorAll('.' + userPrefix);
  usersCreated.forEach((element) => element.classList.remove('selectedUser'));
  document.getElementById(userPrefix + selectedUser).classList.add('selectedUser');
}
function renderRecordSelected() {
  // sadasda
  let recordsCreated = document.querySelectorAll('.' + recordPrefix);
  recordsCreated.forEach((element) => element.classList.remove('selectedRecord'));
  if (document.getElementById(recordPrefix + selectedRecord)) {
    document.getElementById(recordPrefix + selectedRecord).classList.add('selectedRecord');
  }
}

function addUserSelectEvent(e) {
  if (e.target.classList.contains(binUserPrefix)) return 0;
  let userId = +e.target.closest('.' + userPrefix).id.slice(4);
  selectedUser = userId;
  renderUserSelected();
  inputUserId.value = db[userPrefix + userId].userName;
  setStartSelectedRecord()
  renderRecords();
  updateRecordInput();
}
function addRecordSelectEvent(e) {
  if (e.target.classList.contains(binRecordPrefix)) return 0;
  let recordId = +e.target.closest('.' + recordPrefix).id.slice(recordPrefix.length);
  selectedRecord = recordId;
  renderRecordSelected();
  let curRecord = db[userPrefix + selectedUser].userRecords[recordPrefix + recordId];
  inputRecordId.value = curRecord.id;
  inputRecordName.value = curRecord.name;
  inputRecordAuthor.value = curRecord.author;
  inputRecordStart.value = curRecord.start;
  inputRecordEnd.value = curRecord.end;

}



function addUserBinEvents(e) {
  let userId = e.target.closest('.' + userPrefix).id.substring(userPrefix.length);
  delete db[userPrefix + userId];
  if (selectedUser == userId) {
    selectedUser = "";
  }
  renderUsers();
  if (Object.keys(db).length == 0) {
    addRecord.classList.add('unableToAddRecord');
  }
}
function addRecordBinEvents(e) {
  let recordId = e.target.closest('.' + recordPrefix).id.substring(recordPrefix.length);
  console.log(recordId);
  delete db[userPrefix + selectedUser].userRecords[recordPrefix + recordId];
  if (selectedRecord == recordId) {
    selectedRecord = "";
  }
  renderRecords();
}

function renderUsers() {
  let usersGenerated = ""
  if (selectedUser === "") {
    if (Object.keys(db).length > 0) {
      selectedUser = +Object.keys(db)[0].substring(userPrefix.length);
    };
  };
  Object.keys(db).forEach(element => {
    usersGenerated += `
    <div class="user${(+element.slice(4) === selectedUser) ? " selectedUser" : ""}" id="${"user" + element.slice(4)}">
      <p>${db[element].userName}</p>
      <div class="bin-user"></div>
    </div>
    `
  });
  users.innerHTML = usersGenerated;
  let usersCreated = document.querySelectorAll('.' + userPrefix);
  for (let i = 0; i < usersCreated.length; i++) {
    usersCreated[i].addEventListener('click', addUserSelectEvent);
  }
  let userBins = document.querySelectorAll('.' + binUserPrefix);
  for (let item of userBins) {
    item.addEventListener('click', addUserBinEvents);
  }
  if (Object.keys(db).length > 0) {
    inputUserId.value = db[userPrefix + selectedUser].userName;
  } else {
    inputUserId.setAttribute('disabled', true);
    inputUserId.value = '';
  }
  renderRecords();
  renderRecordSelected();
}

function renderRecords() {
  let recordsGenerated = "";
  if (!(selectedUser === "") && selectedRecord === "") {
    if (Object.keys(db[userPrefix + selectedUser].userRecords).length > 0) {
      selectedRecord = +Object.keys(db[userPrefix + selectedUser].userRecords)[0].substring(recordPrefix.length);
    };
  };
  records.innerHTML = '';
  if (Object.keys(db).length > 0 && Object.keys(db['user' + selectedUser]).length > 0) {
    Object.keys(db['user' + selectedUser].userRecords).forEach(element => {
      const curUser = db['user' + selectedUser].userRecords[element];
      recordsGenerated += `
      <div class="record${(+element.slice(recordPrefix.length) === selectedRecord) ? " selectedRecord" : ""}" id="${"record" + element.slice(recordPrefix.length)}">
        <div class="record-container">
          <p>Id книги: <span class="recordId">${curUser.id}</span></p>
          <p>Название книги: <span class="recordName">${curUser.name}</span></p>
          <p>Автор: <span class="recordAuthor">${curUser.author}</span></p>
          <p>Дата аренды: <span class="recordStart">${curUser.start}</span></p>
          <p>Срок сдачи: <span class="recordEnd">${curUser.end}</span></p>
        </div>
        <div class="bin-record"></div>
      </div>
      `;
    });
  }
  records.innerHTML = recordsGenerated;
  let recordsCreated = document.querySelectorAll('.' + recordPrefix);
  for (let i = 0; i < recordsCreated.length; i++) {
    recordsCreated[i].addEventListener('click', addRecordSelectEvent);
  }
  let recordBins = document.querySelectorAll('.' + binRecordPrefix);
  for (let item of recordBins) {
    item.addEventListener('click', addRecordBinEvents);
  }
  localStorage.setItem('libraryDB', JSON.stringify(db));
}

function setStartInput() {
  if (selectedRecord !== '') {
    console.log(db[userPrefix + selectedUser]);
    let curRecord = db[userPrefix + selectedUser].userRecords[recordPrefix + selectedRecord];
    inputRecordId.value = curRecord.id;
    inputRecordName.value = curRecord.name;
    inputRecordAuthor.value = curRecord.author;
    inputRecordStart.value = curRecord.start;
    inputRecordEnd.value = curRecord.end;
  }
  
  // inputUserId.value = document.querySelector('.selectedUser').children[0].innerHTML;
  // inputRecordId.value = db
  
  // let curRecord = db[userPrefix + selected].userRecords[recordPrefix + recordId];
  //   inputRecordId.value = curRecord.id;
  //   inputRecordName.value = curRecord.name;
  //   inputRecordAuthor.value = curRecord.author;
  //   inputRecordStart.value = curRecord.start;
  //   inputRecordEnd.value = curRecord.end;
}

// update user id input
inputUserId.addEventListener('input', () => {
  updateUserName();
});
inputRecordId.addEventListener('input', () => {
  updateRecordId();
});
inputRecordName.addEventListener('input', () => {
  updateRecordName();
});
inputRecordAuthor.addEventListener('input', () => {
  updateRecordAuthor();
});
inputRecordStart.addEventListener('input', () => {
  updateRecordStart();
});
inputRecordEnd.addEventListener('input', () => {
  updateRecordEnd();
});


addUser.addEventListener('click', () => {
  let userNums = Object.keys(db).map((item) => item.substr(userPrefix.length));
  let userNew = Math.max(...userNums) + 1;
  if (!Number.isInteger(userNew)) userNew = 0;
  db[userPrefix + userNew] = {
    userName: "",
    userRecords: { }
  }
  renderUsers();
  inputUserId.removeAttribute('disabled');
  addRecord.classList.remove('unableToAddRecord');
});

addRecord.addEventListener('click', () => {
  if (selectedUser !== '') {
    let recordNums = Object.keys(db[userPrefix + selectedUser].userRecords).map((item) => item.substr(recordPrefix.length));
    let recordNew = Math.max(...recordNums) + 1;
    if (!Number.isInteger(recordNew)) recordNew = 0;
    db[userPrefix + selectedUser].userRecords[recordPrefix + recordNew] = {
      id: "",
      name: "",
      author: "",
      start: "",
      end: ""
    }
    renderRecords();
    inputRecordId.removeAttribute('disabled');
    inputRecordName.removeAttribute('disabled');
    inputRecordAuthor.removeAttribute('disabled');
    inputRecordStart.removeAttribute('disabled');
    inputRecordEnd.removeAttribute('disabled');
  }
});

document.querySelector('.reset').addEventListener('click', () => {
  selectedUser = "";
  db = JSON.parse(JSON.stringify(dbExemple));
  renderUsers();
});

//first users render
renderUsers();

// add bin buttons
userBins = document.querySelectorAll('.' + binUserPrefix);
for (let i = 0; i < userBins.length; i++) { 
  userBins[i].addEventListener('click', addUserBinEvents);
}
recordBins = document.querySelectorAll('.' + binRecordPrefix);
for (let i = 0; i < recordBins.length; i++) { 
  recordBins[i].addEventListener('click', addRecordBinEvents);
}
//start user and record input update
setStartInput();
