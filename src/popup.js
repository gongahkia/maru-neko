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