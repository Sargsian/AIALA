// dont forget to change preId variable to use a unique preId for every course \\

const preId = "changeThisToSomethingUnique";

let background = (id) => {
  if (
    document.getElementById(id).style.backgroundColor == "rgb(130, 232, 63)"
  ) {
    document.getElementById(id).style.backgroundColor = "red";
    localStorage.removeItem(`${preId}${id}`);
  } else {
    document.getElementById(id).style.backgroundColor = "rgb(130, 232, 63)";
    let tager = document.getElementById(id).id;
    localStorage.setItem(`${preId}${id}`, tager);
  }
};

let load = () => {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).substring(0, preId.length) === preId) {
      document.getElementById(
        localStorage.getItem(localStorage.key(i))
      ).style.backgroundColor = "rgb(130, 232, 63)";
    }
    loadStudied();
  }
};

////////// comment out the bellow code after finishing generating html code for your note sheet //////////

let num = 0;
let noteSheet = () => {
  let sectionNumber = document.getElementById("section-number").value;
  let sectionTitle = document.getElementById("section-title").value;
  let numberOfVideos = +document.getElementById("number-of-videos").value;

  document.getElementById("videos").innerText += `<h1>${sectionTitle}</h1>\n`;
  for (let i = 1; i <= numberOfVideos; i++) {
    num = num + 1;
    document.getElementById(
      "videos"
    ).innerText += `<p class="notDone" id="${num}" onclick="background(${num})">VIDEO ${sectionNumber}.${i}</p>\n`;
  }
  // num = numberOfVideos; this line is probably worth deleting
  document.getElementById("section-number").value =
    +document.getElementById("section-number").value + 1;
  document.getElementById("section-title").value = null;
  document.getElementById("number-of-videos").value = null;
};

////////// code for continuous ascending numeration //////////

// let num = 1;
// let noteSheet = () => {
//     let sectionTitle = document.getElementById('section-title').value;
//     let numberOfVideos = +document.getElementById('number-of-videos').value;

//     document.getElementById("videos").innerText += `<h1>${sectionTitle}</h1>\n`
//     for (let i = num; i <= numberOfVideos; i++){
//         document.getElementById("videos").innerText += `<p class="notDone" id="${num}" onclick="background(${num})">VIDEO ${num}</p>\n`
//         num++;
//     }
//     num = numberOfVideos +1;
// }

// TIMER //////////////////////////////////////////////////////////////////////////////////

let localeStorageHours = 'thisShouldBeUnique'
if (localStorage.getItem(localeStorageHours) === null) {
  localStorage.setItem(localeStorageHours, "0");
}

let dateNumber;
let currentCount = 0;
let keepCount = 0;
let time = 7200;
let timeCount = 7200;
let timeWatch = 7200;
let timeWatchCount = 7200;
let timeWatch2 = +localStorage.getItem(localeStorageHours);
let timeWatch2Count = +localStorage.getItem(localeStorageHours);

const countDownEl = document.getElementById("countdown");
const stopWatch = document.getElementById("stopwatch");
const studied = document.getElementById("studied");
let checkTime = false;
let timeCheck = true;
let secondTimer = true;

function updateCountdown() {
  progressCheck = false;
  timeWatch2 = timeWatch2Count + (Date.now() - dateNumber) / 1000;

  if (time >= 1) {

    if (checkTime) {
      timeCount -= keepCount;
      timeWatch2Count += keepCount;
      checkTime = false;
    }

    currentCount = (Date.now() - dateNumber) / 1000;
    time = timeCount - (Date.now() - dateNumber) / 1000;
    const hours = Math.floor(time / 3600);
    let minutes =
      time > 3600 ? Math.floor((time % 3600) / 60) : Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    countDownEl.innerHTML = `${hours}:${minutes}:${seconds}`;
  }
  else  {
    if (secondTimer) {
      time < 0 ? timeWatchCount += Math.abs(time) : timeWatch2Count += time;
      timeWatch2Count += currentCount;
      secondTimer = false;
      dateNumber = Date.now();
    }

    if (checkTime) {
      timeWatch2Count += keepCount;
      timeWatchCount += keepCount;
      checkTime = false;
      console.log("updateCheckTime", checkTime);
    }

    currentCount = (Date.now() - dateNumber) / 1000;

    stopWatch.style.display = "block";
    countDownEl.innerHTML = "0:00:00";
    countDownEl.style.backgroundColor = "#82E83F";
    const hours = Math.floor(timeWatch / 3600);
    let minutes =
      timeWatch > 3600
        ? Math.floor((timeWatch % 3600) / 60)
        : Math.floor(timeWatch / 60);
    let seconds = Math.floor(timeWatch % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    minutes = minutes > 59 ? "00" : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    stopWatch.innerHTML = `+${hours}:${minutes}:${seconds}`;

    timeWatch = timeWatchCount + (Date.now() - dateNumber) / 1000;
  }
}

function backgroundColor() {
  countDownEl.style.backgroundColor = "red";
}

const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");

let tmr = false;
let interval;
function start() {
  dateNumber = Date.now();
  if (!tmr) {
    tmr = true;
    interval = setInterval(updateCountdown, 300);
    playButton.style.display = "none";
    pauseButton.style.display = "block";
  } else {
    keepCount = currentCount;
    checkTime = true;
    console.log("setInterval", checkTime);

    tmr = false;
    clearInterval(interval);
    playButton.style.display = "block";
    pauseButton.style.display = "none";
  }
}

button = document.getElementById("time");
button.addEventListener("click", start);

function overallStudyTime() {
  progressCheck = true;
  checkTime = true;
  keepCount = currentCount;
  clearInterval(interval);
  localStorage.setItem(localeStorageHours, `${timeWatch2}`);
  const hours = Math.floor(timeWatch2 / 3600);
  let minutes =
    timeWatch2 > 3600
      ? Math.floor((timeWatch2 % 3600) / 60)
      : Math.floor(timeWatch2 / 60);
  let seconds = Math.floor(timeWatch2 % 60);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  minutes = minutes > 59 ? "00" : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  studied.innerHTML = `${hours}:${minutes}:${seconds}`;
  pauseButton.style.display = "none";
  playButton.style.display = "block";
  tmr = false;
}

function loadStudied() {
  let localHours = +localStorage.getItem(localeStorageHours);
  const hours = Math.floor(localHours / 3600);
  let minutes =
    localHours > 3600
      ? Math.floor((localHours % 3600) / 60)
      : Math.floor(localHours / 60);
  let seconds = Math.floor(localHours % 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  minutes = minutes > 59 ? "00" : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  studied.innerHTML = `${hours}:${minutes}:${seconds}`;
}

let bigTimer = document.getElementById("bigTimer");

bigTimer.addEventListener("click", overallStudyTime);

let progressCheck = false;

window.addEventListener("beforeunload", (event) => {
  if (!progressCheck && time < 7190) {
    event.returnValue = "Are you sure you want to leave without saving your progress ?";
  }
});
