// FUA
    // * find another name for this browser extension better than maruneko, rework it around the concept of battlecats
    // * GAME should just be the cats can spawn in when u click and have enough money, and they follow your cursor, there is a max of 20 cats to ensure the frame rate is ok
      // * can buy backgrounds and types of cats
      // repurpose proof-of-concept code for goose game for ALL CATS to follow cursor
      // * work out how to store data for each pet, test for restart on computer
      // * object stored should just store the number and type of cat on screen
      // work out cat overlap
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