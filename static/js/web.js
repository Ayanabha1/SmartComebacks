let button = document.getElementById("butti");
let name = document.getElementById("namei");
let api_url = "https://evilinsult.com/generate_insult.php?lang=en&type=json";
let i = 0;
let show = document.getElementById("show");
let clrbtn = document.getElementById("clr");
let moreins = document.getElementById("moreins");
let k = 3;
let cli = 0;
let currPath = window.location.pathname;
// console.log(currPath);
DomLoaded();


let ins = document.getElementById("ins");
let comps = document.getElementById("comps");
if (currPath === "/" && !ins.classList.contains("nav-links-clicked")) {
  ins.classList.add("nav-links-clicked");
  comps.classList.remove("nav-links-clicked");
}
if (currPath === "/comps") {
  comps.classList.add("nav-links-clicked");
  ins.classList.remove("nav-links-clicked");
}

let speech = new SpeechSynthesisUtterance();
let voiceOptions = document.getElementById("voiceOptions");
let volumeSlider = document.getElementById("volumeSlider");
let pitchSlider = document.getElementById("pitchSlider");
let rateSlider = document.getElementById("rateSlider");
var voicesMap = [];
let volOps = document.getElementById("volumeChange");
let showRate = document.getElementById("showRate");
let showPitch = document.getElementById("showPitch");
let showVolume = document.getElementById('showVolume');

showRate.innerHTML = rateSlider.value*100+"%";
showPitch.innerHTML = pitchSlider.value*100+"%";
showVolume.innerHTML = volumeSlider.value*100 + "%";

rateSlider.addEventListener('change',()=>{
  showRate.innerHTML = rateSlider.value*100+"%";
})
pitchSlider.addEventListener('change',()=>{
  showPitch.innerHTML = pitchSlider.value*100+"%";
})

// rateSlider.addEventListener("mouseover",()=>{
//   rateSlider.setAttribute("title",rateSlider.value);
// })

let dec;

if (currPath === '/') {
  dec = randomInt(1,3);
}
else
{
  dec = randomInt(1,4);
}

let video = "vid" + dec;
let audio = "laugh" + dec;

let vBtn = document.getElementById("vBtn");
let lasnd = document.getElementById(audio);

let lastVol;

function volchange() {
  speech.volume = volumeSlider.value;
  showVolume.innerHTML = volumeSlider.value*100+"%";
  if (unmute.style.display === "none") {
    unmute.style.display = "initial";
    mute.style.display = "none";
  }
}


let mute = document.getElementsByClassName("mute")[0];
let unmute = document.getElementsByClassName("unmute")[0];
vBtn.addEventListener("click", () => {
  if (currPath === "/") {
    lasnd.pause();
  }
  if (unmute.style.display !== "none") {
    mute.style.display = "initial";
    unmute.style.display = "none";
    lastVol = speech.volume;
    speech.volume = 0;
    volumeSlider.value = 0;
    window.speechSynthesis.cancel();
    showVolume.innerHTML = volumeSlider.value*0+"%";
  } else {
    unmute.style.display = "initial";
    mute.style.display = "none";
    speech.volume = lastVol;
    volumeSlider.value = lastVol;
    showVolume.innerHTML = volumeSlider.value*100+"%";
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
  speech.text = textmsg;
  speech.volume = volumeSlider.value;
  speech.rate = rateSlider.value;
  speech.pitch = pitchSlider.value;

  window.speechSynthesis.speak(speech);
}

voiceOptions.onchange = ()=>{
  speech.voice = voicesMap[voiceOptions.value];
}


let mcont = document.getElementById("mcont");
let gifSpace = document.getElementById(video);

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function ButtClicked(e) {
  let gocomps = document.getElementById('gocomps');
  cli++;
  if (cli === 10) {
    gocomps.innerHTML = "<a href = '/comps' class='gocomp' >Get some compliments</a>"
  }
  // console.log(k);
  if (mcont.classList.contains("main-container-neon")) {
    mcont.classList.remove("main-container-neon");
  }

  if (i == 0) {
    if (gifSpace.classList.contains("laughGif-triggered")) {
      gifSpace.classList.add("laughGif-not-triggered");
      gifSpace.classList.remove("laughGif-triggered");
      if (currPath === "/") {
        lasnd.pause();
      }
    }
  }
  window.speechSynthesis.cancel();
  let name = document.getElementById("namei").value;
  let buttons = document.getElementById("buttons");
  if (name !== "") {
    mcont.classList.add("main-container-neon");
    if (currPath === "/") {
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
      fetch("https://complimentr.com/api")
        .then((res) => res.json())
        .then((data) => {
          let msg = `${name} , ${data.compliment}`;
          show.innerHTML = msg;
          buttons.style.display = "flex";
          speak(msg);
          volOps.style.display = "inherit";
        });
    }
  } else {
    show.innerHTML = "";
    volOps.style.display = "none";
  }

  if (i === k) {
    i = -1;
    setTimeout(() => {
      let temp ;
      if (currPath === '/') {
        temp = randomInt(1, 3);
      }
      else
      {
        temp = randomInt(1,4);
      } 
      video = "vid" + temp;
      audio = "laugh" + temp;
      console.log(video);
      lasnd = document.getElementById(audio);
      gifSpace = document.getElementById(video);
      gifSpace.classList.remove("laughGif-not-triggered");
      gifSpace.classList.add("laughGif-triggered");
      k = randomInt(2, 5);
      if (unmute.style.display !== "none" && currPath === "/") {
        lasnd.play();
      }
    }, 2500);
  }
  if (name != "") {
    i++;
  }
  // console.log(i);
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
  if (currPath === "/") {
    lasnd.pause();
  }
  if (gifSpace.classList.contains("laughGif-triggered")) {
    gifSpace.classList.add("laughGif-not-triggered");
    gifSpace.classList.remove("laughGif-triggered");
    if (currPath === "/") {
      lasnd.pause();
    }
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

let repeat = document.getElementById("repeat");

repeat.addEventListener('click',()=>{

  if (!window.speechSynthesis.speaking) {
    
    speak("same gali ? Ok")
    speak(show.innerHTML);
  }

})

document.getElementById("namei").onkeydown = function () {
  if (window.event.keyCode == "13") {
    ButtClicked();
  }
};



function DomLoaded() {
  window.speechSynthesis.cancel();
}

let setBtn = document.getElementById('setBtn');

setBtn.addEventListener('click',()=>{
  // console.log('settings');
  let settCon = document.getElementById('settCon');
  if (settCon.className === '') {
    settCon.className = settCon.className.replace('','vis');
  }
  else
  {
    settCon.className = settCon.className.replace('vis','');
  }
})

let arrSet = ['settCon' , 'settMain' , 'setBtn' , 'setHead'];

