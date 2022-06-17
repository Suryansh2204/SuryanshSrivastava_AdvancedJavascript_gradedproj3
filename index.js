let phrase = [
  "All work and no play makes jack a dull boy.",
  "Please take your dog, Cali, out for a walk, he really needs some exercise!",
  "What a beautiful day it is on the beach, here in beautiful and sunny Hawaii.",
  "The two boys collected twigs outside, for over an hour, in the freezing cold!",
  "I have three things to do today: wash my car, call my mother, and feed my dog.",
  "Do I look like a turnip that just fell off the turnip truck?",
  "You can lead a horse to water but you can't make him drink.",
  "Called memos for short, memorandums are routinely used within an organization to communicate a variety of ideas.",
];

let txtAr = document.querySelector(".txtAr");
let instruction = document.querySelector(".instruction");
let r1 = document.querySelector("#result1");
let r2 = document.querySelector("#result2");
let btn = document.querySelector("#btn");
let timeDisp = document.querySelector("#time");
let errors = document.querySelector("#errors");
let accuracy = document.querySelector("#accuracy");
let wpm = document.querySelector("#wpm");
let cpm = document.querySelector("#cpm");

let isOn = false;
let time = 60;
let interval_id;
let phrase_index = 0;
let current_phrase = "";
let typedChar = 0;
let time_taken = 0;
let error = 0;

function start() {
  if (isOn == false) {
    
    isOn = true;

    if (phrase_index >= phrase.length) {
      phrase_index = 0;
    }
    current_phrase = phrase[phrase_index];
    instruction.innerText = null;
    errors.innerText = "0";
    accuracy.innerText = "100";

    current_phrase.split("").forEach((char) => {
      const span = document.createElement("span");
      if (char === " ") {
        span.innerHTML = `&nbsp;`;
      } else {
        span.innerText = char;
      }
      instruction.appendChild(span);
    });
    interval_id = setInterval(seekUpdate, 1000);
  }
}

function end() {
  clearInterval(interval_id);
  instruction.innerText = "Click on restart to start a new game.";
  cpm.innerText = Math.round((typedChar / time_taken) * 60);
  wpm.innerText = Math.round((typedChar / 5 / time_taken) * 60);
  r1.style.display = "flex";
  r2.style.display = "flex";
  btn.style.display = "flex";
  txtAr.setAttribute("disabled", null);
  isOn = false;
}

function seekUpdate() {
  if (time >= 1) {
    time -= 1;
    time_taken++;
    timeDisp.innerText = `${time}s`;
  } else {
    end();
  }
}

function restart() {
  r1.style.display = "none";
  r2.style.display = "none";
  btn.style.display = "none";
  txtAr.removeAttribute("disabled");
  isOn = false;
  instruction.innerText = "Click on the area below to start the game.";
  txtAr.value = "";
  clearInterval(interval_id);
  time = 60;
  time_taken = 0;
  error = 0;
  timeDisp.innerText = `${time}s`;
  phrase_index++;
}

txtAr.addEventListener("input", () => {
  errors.innerText = "0";
  error = 0;
  typedChar = 0;
  const arrayQuote = instruction.querySelectorAll("span");
  const arrayValue = txtAr.value.split("");
  arrayQuote.forEach((charSpan, index) => {
    typedChar++;
    let character = arrayValue[index];

    if (character == null) {
      charSpan.classList.remove("correct");
      charSpan.classList.remove("incorrect");
    } else if (charSpan.innerHTML === `&nbsp;` && character === " ") {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect");
    } else if (character === charSpan.innerText) {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect");
    } else {
      charSpan.classList.remove("correct");
      charSpan.classList.add("incorrect");
      error += 1;
      errors.innerText = error;
    }
    accuracy.innerText = Math.round(((typedChar - error) / typedChar) * 100);
  });
  if (current_phrase === txtAr.value) {
    end();
  }
});
