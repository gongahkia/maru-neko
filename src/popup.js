// FUA
    // * find another name for this game better than maruneko
    // * use squash and stretch within CSS and HTML to animate sprites nad their movement and refer to squashstretch.html
                // * add pngs for sprites
                // give sprite a cute left and right bobble similar to fish in chillquarium
                // find egg cat png and egg dog png https://youtu.be/Vi7ULYt2ha0?si=pHmi9bBaJixifY5H
        // * work out how to store data for each pet, test for restart on computer
        // allow for the animal (egg cat) to wear multiple hats
        // use placeholder sprite for animals first, ask nichole if she can help me draw pngs to be used as sprites once logic fully implemented
            // consider just going itch and getting cat spritesheets, then animating them in an online animator and creating a gif for each default movement pattern
                // battlecat sprites
                    // https://drive.google.com/drive/folders/1ibVrkQegaWHntUzBSXGvGbfnTiOnY4Pb
                    // https://www.spriters-resource.com/mobile/thebattlecats/
            // find appropriate pet sprites for each variant selection
            // incorporate cat pngs of different styles, perhaps i might want to include gifs if squash and strecth dosen't work
            // consider axolto sprites or cat sprites of different styles if pngs don't work as well
                // https://i.pinimg.com/originals/ee/62/cf/ee62cf9a4571eace4f7cad0e2d19f056.png
                // https://tr.rbxcdn.com/0dae3ea845c74e78ebf83d7ffb74a2ab/420/420/Hat/Png
                // https://tr.rbxcdn.com/6aea24614288ff2f8178027385c0f335/420/420/Hat/Png
                // https://tr.rbxcdn.com/9d66b10261ca5524ec0c0c117a2c97ab/420/420/Hat/Png
                // https://tr.rbxcdn.com/030f189f52b40ad7ab5adb8bf4e33186/420/420/DynamicHeadOutfit/Png
                // https://tr.rbxcdn.com/030f189f52b40ad7ab5adb8bf4e33186/420/420/DynamicHeadOutfit/Png
                // https://www.pngall.com/wp-content/uploads/15/Popcat-PNG-Photo.png
                // https://static.wikia.nocookie.net/raise-a-floppa-roblox/images/4/4f/PopCatChar.png/revision/latest/scale-to-width/360?cb=20220625074937
                // https://tr.rbxcdn.com/e2e904abebc1833577df335cdcb610c8/420/420/Hat/Png
                // https://tr.rbxcdn.com/1a673b1920e377d66f7d8a5b9a2f34e4/420/420/Hat/Png
                // https://tr.rbxcdn.com/6e16f2a57a8f4be1f767c159dfe4a4ac/420/420/Hat/Png
                // https://tr.rbxcdn.com/3d0017cb7e6ac6f1157519f960fa815a/420/420/Hat/Png
                // https://tr.rbxcdn.com/1500c458897a5ab6184bca898d9d3226/420/420/Hat/Png
                // https://tr.rbxcdn.com/bf7e49b52e0376a9819b802476f3ba21/420/420/Hat/Png
                // https://tr.rbxcdn.com/3cdbe3820dbfcfa69399463c1c194819/420/420/Hat/Png
                // https://tr.rbxcdn.com/bdeeb1392de947d9e2c782cab7cb54ba/420/420/Hat/Png
                // https://tr.rbxcdn.com/e65556a9461d1319e73923e1973a27ab/420/420/LayeredAccessory/Png
                // https://tr.rbxcdn.com/ab5b23b34dc166fa037120a78bbb0903/420/420/Hat/Png
    // repurpose proof-of-concept code for goose if need animals to follow cursor
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