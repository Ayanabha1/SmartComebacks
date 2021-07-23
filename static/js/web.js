let button = document.getElementById("butti");
let name = document.getElementById("namei");
let api_url = "https://evilinsult.com/generate_insult.php?lang=en&type=json";
let i = 0;
let show = document.getElementById("show");
let clrbtn = document.getElementById("clr");
let moreins = document.getElementById("moreins");

let speech = new SpeechSynthesisUtterance();
let voiceOptions = document.getElementById("voiceOptions");
let volumeSlider = document.getElementById("volumeSlider");
var voicesMap = [];
let volOps = document.getElementById("volumeChange");

let vBtn = document.getElementById("vBtn");
let lasnd = document.getElementById("laugh");
let lastVol;

function volchange() {
  speech.volume = volumeSlider.value;
}

let mute = document.getElementsByClassName("mute")[0];
let unmute = document.getElementsByClassName("unmute")[0];
vBtn.addEventListener("click", () => {
  lasnd.pause();
  if (unmute.style.display !== "none") {
    mute.style.display = "initial";
    unmute.style.display = "none";
    lastVol = speech.volume;
    speech.volume = 0;
    volumeSlider.value = 0;
    window.speechSynthesis.cancel();
  } else {
    unmute.style.display = "initial";
    mute.style.display = "none";
    speech.volume = lastVol;
    volumeSlider.value = lastVol;
  }
});

function loadVoices() {
  let voices = speechSynthesis.getVoices();
  for (let i = 0; i < voices.length; i++) {
    let voice = voices[i];
    voicesMap[voice.name] = voice;
    let option = document.createElement("option");
    option.value = voice.name;
    option.innerHTML = voice.name;
    voiceOptions.appendChild(option);
    voicesMap[voice.name] = voice;
  }
}

window.speechSynthesis.onvoiceschanged = function (e) {
  loadVoices();
};

function speak(textmsg) {
  speech.lang = "en-US";
  // speech.voice = voicesMap[voiceOptions.value];
  speech.text = textmsg;
  speech.volume = volumeSlider.value;
  speech.rate = 1;
  speech.pitch = 0.4;

  window.speechSynthesis.speak(speech);
}

let mcont = document.getElementById("mcont");
let gifSpace = document.getElementById("laughGif");

function ButtClicked(e) {
  if (mcont.classList.contains("main-container-neon")) {
    mcont.classList.remove("main-container-neon");
  }
  


  if (i == 0) {
    if (gifSpace.classList.contains("laughGif-triggered")) {
      gifSpace.classList.add("laughGif-not-triggered");
      gifSpace.classList.remove("laughGif-triggered");
      lasnd.pause();
    }
  }
  window.speechSynthesis.cancel();
  let name = document.getElementById("namei").value;
  let buttons = document.getElementById("buttons");
  if (name !== "") {
    mcont.classList.add("main-container-neon");
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => {
        let msg = `${name} , ${data.insult}`;
        show.innerHTML = msg;
        buttons.style.display = "flex";
        speak(msg);
        volOps.style.display = "inherit";
      });
  } else {
    show.innerHTML = "";
    volOps.style.display = "none";
  }

  if (i === 3) {
    i = -1;
    setTimeout(() => {
      gifSpace.classList.remove("laughGif-not-triggered");
      gifSpace.classList.add("laughGif-triggered");
      if (unmute.style.display !== "none") {
        lasnd.play();
      }
    }, 2500);
  }
  if (name != "") {
    i++;
  }
  console.log(i);
}

speech.onend = function removeneon(e) {
  if (mcont.classList.contains("main-container-neon")) {
    setTimeout(() => {
      mcont.classList.remove("main-container-neon");
    }, 2000);
  }
  if (mcont.classList.contains("main-container-clear")) {
    setTimeout(() => {
      mcont.classList.remove("main-container-clear");
    }, 2000);
  }
};

clrbtn.addEventListener("click", () => {
  lasnd.pause();
  if (gifSpace.classList.contains("laughGif-triggered")) {
    gifSpace.classList.add("laughGif-not-triggered");
    gifSpace.classList.remove("laughGif-triggered");
    lasnd.pause();
  }

  show.innerHTML = "";
  document.getElementById("namei").value = "";
  buttons.style.display = "none";
  window.speechSynthesis.cancel();
  volOps.style.display = "none";
  if (mcont.classList.contains("main-container-neon")) {
    mcont.classList.remove("main-container-neon");
  }
  mcont.classList.add("main-container-clear");
});

moreins.addEventListener("click", () => {
  let name = document.getElementById("namei").value;
  ButtClicked();
});

document.getElementById("namei").onkeydown = function () {
  if (window.event.keyCode == "13") {
    ButtClicked();
  }
};
