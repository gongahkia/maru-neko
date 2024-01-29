// FUA
    // * find another name for this browser extension better than maruneko, rework it around the concept of battlecats
    // * GAME should just be the cats can spawn in when u click and have enough money, and they follow your cursor, there is a max of 20 cats to ensure the frame rate is ok
      // * can buy backgrounds and types of cats
      // * work out how to store data for each pet, test for restart on computer
      // * object stored should just store the number and type of cat on screen
      // work out cat overlap
      // make this like a snake game where the more things you collect the more cool stuff you can buy or like a PET TAMOGOCHI game
      // add code here to allow for dynamic adding of cats and to extract data from the localstorage cat object model 
      // consider CLUSTERING all the cats together first then making them one cursorfollower object that follows the cursor
      // ensure there are no repeated copies of cats appearing every second or frame update
    // allow for the animal (egg cat) to wear multiple hats
    // * rework README.md installation
    // * rework Makefile
    // * test out to see whether works on firefox chrome opera safari vivaldi

// ---------- ACTUAL CODE ----------

// ---------- SPAWN BUTTON ----------

document.getElementById("spawnButton").addEventListener('click', function() {
  if (chrome.tabs) { // CHROME
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { toggle: true });
    });

    // displayData();
    // alert("chrome");
    updateCounter();
    saveData("currCount");

  } else if (browser.tabs) { // FIREFOX
    browser.tabs.query({ active: true, currentWindow: true }).then(function(tabs) {
      browser.tabs.sendMessage(tabs[0].id, { toggle: true });
    });

    // displayData();
    // alert("firefox");
    updateCounter();
    saveData("currCount");

  } else { // UNSUPPORTED BROWSER
    console.error("tabs API not supported in this environment");

    // displayData();
    // alert("error occured");
    updateCounter();
    saveData("currCount");

  }
});

// ---------- REMOVE BUTTON ----------

document.getElementById("removeButton").addEventListener('click', function() {
  if (chrome.tabs) { // CHROME
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { toggle: true });
    });

    // displayData();
    // alert("chrome");
    removeData("currCount");

  } else if (browser.tabs) { // FIREFOX
    browser.tabs.query({ active: true, currentWindow: true }).then(function(tabs) {
      browser.tabs.sendMessage(tabs[0].id, { toggle: true });
    });

    // displayData();
    // alert("firefox");
    removeData("currCount");

  } else { // UNSUPPORTED BROWSER
    console.error("tabs API not supported in this environment");

    // displayData();
    // alert("error occured");
    removeData("currCount");

  }
});

// ---------- MODIFICATION CODE ----------

document.addEventListener("DOMContentLoaded", function() {
  displayData("currCount");
});

function updateCounter() {
  var counterElement = document.getElementById("count");
  var currentCount = parseInt(counterElement.innerText) || 0;
  var newCount = currentCount + 1;
  counterElement.innerText = newCount;
}

function saveData(dataKey) {
  var currCount = document.getElementById("count").innerText;
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem(dataKey, currCount);
    // alert("data saved");
    displayData(dataKey);
  } else {
    alert("Sorry but your poo poo browser does not support localStorage :(");
  }
}

function displayData(dataKey) {
  if (typeof(Storage) !== "undefined") {
    var storedCount = localStorage.getItem(dataKey);
    document.getElementById("count").innerText = storedCount;
  } else {
    alert("Sorry but your poo poo browser does not support localStorage :(");
  }
}

function removeData(dataKey) {
  if (typeof(Storage) !== "undefined") {
    localStorage.removeItem(dataKey);
    // alert("data removed permanently");
  } else {
    alert("Sorry but your poo poo browser does not support localStorage :(");
  }
}

// ---------- CAT MOVEMENT CODE ----------

document.addEventListener('DOMContentLoaded', function () {

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var cursorFollower = document.querySelector('.cursorFollower');
var mouseX = 0;
var prevMouseX = 0;
var mouseY = 0;
var stationaryTime = 0;
var delay = 100;

const stationaryCatUrlArray = [
    "sprite/cat-idle.gif",
    "sprite/armcat-idle.gif",
    "sprite/axecat-idle.gif",
    "sprite/cowcat-idle.gif",
    "sprite/dancecat-idle.gif",
    "sprite/fishcat-idle.gif",
    "sprite/haircat-idle.gif",
    "sprite/longcat-idle.gif",
    "sprite/mexicancat-idle.gif",
    "sprite/swordcat-idle.gif",
    "sprite/teethcat-idle.gif",
    "sprite/goose-idle.png"
];

const leftCatUrlArray = [
    "sprite/cat-left.gif",
    "sprite/armcat-left.gif",
    "sprite/axecat-left.gif",
    "sprite/cowcat-left.gif",
    "sprite/dancecat-left.gif",
    "sprite/fishcat-left.gif",
    "sprite/haircat-left.gif",
    "sprite/longcat-left.gif",
    "sprite/mexicancat-left.gif",
    "sprite/swordcat-left.gif",
    "sprite/teethcat-left.gif",
    "sprite/goose-left.gif"
];

const rightCatUrlArray = [
    "sprite/cat-right.gif",
    "sprite/armcat-right.gif",
    "sprite/axecat-right.gif",
    "sprite/cowcat-right.gif",
    "sprite/dancecat-right.gif",
    "sprite/fishcat-right.gif",
    "sprite/haircat-right.gif",
    "sprite/longcat-right.gif",
    "sprite/mexicancat-right.gif",
    "sprite/swordcat-right.gif",
    "sprite/teethcat-right.gif",
    "sprite/goose-right.gif"
];

const catSeed = getRandomInt(0,stationaryCatUrlArray.length-1);
const stationaryCatUrl = stationaryCatUrlArray[catSeed];
const leftCatUrl = leftCatUrlArray[catSeed];
const rightCatUrl = rightCatUrlArray[catSeed];

function updateCursorPosition(event) {
    prevMouseX = mouseX;
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function updateCursorFollower() {
    var offsetX = (mouseX - cursorFollower.offsetWidth / 2) + 'px';
    var offsetY = (mouseY - cursorFollower.offsetHeight / 2) + 'px';
    cursorFollower.style.transform = 'translate(' + offsetX + ',' + offsetY + ')';
}

function changeToStationaryImage() {
    cursorFollower.style.backgroundImage = 'url(' + stationaryCatUrl + ')';
}

function changeToLeftImage() {
    cursorFollower.style.backgroundImage = 'url(' + leftCatUrl + ')';
}

function changeToRightImage() {
    cursorFollower.style.backgroundImage = 'url(' + rightCatUrl + ')';
}

// MOUSE INPUT

document.addEventListener('mousemove', function (event) {
    stationaryTime = 0;
    updateCursorPosition(event);
    if (mouseX > prevMouseX) {
        changeToRightImage();
    } else if (mouseX < prevMouseX) {
        changeToLeftImage();
    } else {
        changeToStationaryImage();
    }
});

setInterval(function () {
updateCursorFollower();

stationaryTime += delay;
if (stationaryTime >= 250) {
        changeToStationaryImage();
    }
}, delay);
});