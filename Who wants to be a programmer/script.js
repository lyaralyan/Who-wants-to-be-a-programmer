let list = [
  {
    quest:
      "Ո՞ր տարրն է օգտագործվում HTML-ում առաջին մակարդակի վերնագիր ստեղծելու համար:",
    true: "<h1>",
    wrong: ["<h1>", "<head>", "<title>", "<header>"],
  },
  {
    quest:
      "Ի՞նչ նիշ է օգտագործվում CSS-ում տողի սկզբում՝ class ընտրելու համար:",
    true: ".",
    wrong: [".", "#", "*", "/"],
  },
  {
    quest:
      "Ի՞նչ մեթոդ է օգտագործվում JavaScript-ում վերջին տարրը զանգվածից հեռացնելու համար:",
    true: "pop()",
    wrong: ["pop()", "delete()", "remove()", "last()"],
  },
  {
    quest:
      "Ի՞նչ գործառույթ է օգտագործվում JavaScript-ում console վահանակում տեքստ տպելու համար:",
    true: "log()",
    wrong: ["log()", "print()", "display()", "output()"],
  },
  {
    quest: "Ի՞նչ թեգ է օգտագործվում HTML-ում հղում ստեղծելու համար:",
    true: "<a>",
    wrong: ["<a>", "<link>", "<href>", "<url>"],
  },
  {
    quest:
      "Ո՞ր օպերատորն է օգտագործվում JavaScript-ում տողային տիպի էլեմենտները միացնելու համար:",
    true: "+",
    wrong: ["+", "&", "*", "-"],
  },
  {
    quest:
      "Ի՞նչ CSS հատկություն է օգտագործվում տարրին ներսից տարածք սահմանելու համար:",
    true: "padding",
    wrong: ["padding", "margin", "border", "spacing"],
  },
  {
    quest:
      "Ի՞նչ թեգ է օգտագործվում HTML-ում համարակալված տարրերով ցուցակ ստեղծելու համար:",
    true: "<ol>",
    wrong: ["<ol>", "<ul>", "<li>", "<dl>"],
  },
  {
    quest:
      "JavaScript-ի ո՞ր մեթոդն է օգտագործվում HTML տարրի բովանդակությունը փոխելու համար:",
    true: "innerHTML()",
    wrong: ["innerHTML()", "alert()", "modify()", "change()"],
  },
].sort(() => Math.random() - 0.5);
let call_members = [
  "assets/pictures/call_members/bill-gates.jpg",
  "assets/pictures/call_members/steve jobs.jpg",
  "assets/pictures/call_members/mark cukerberg.jpg",
  "assets/pictures/call_members/ilon mask.jpg",
  "assets/pictures/call_members/ritchen.jpg",
  "assets/pictures/call_members/lee.jpg",
  "assets/pictures/call_members/torwalds.jpg",
  "assets/pictures/call_members/stroustrup.png",
  "assets/pictures/call_members/thompson.jpg",
  "assets/pictures/call_members/guido.jpg",
];
let answers = document.querySelectorAll(".answers span");
let question = document.querySelector(".question span");
let index = 0;
let numbers = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
let diagram_numbers = [0, 0, 0, 0];
let people_list_items = document.querySelectorAll(".people_list span");
let diagram_lines = document.querySelectorAll(".diagram_line");
let diagram_precent = document.querySelectorAll(".diagram_precent");
let help_buttons = document.querySelectorAll(".help_container button");
let start_game = document.querySelectorAll(
  ".start_game_container *:not(.react_logo)"
);
let for_fifty = false;
let all_time = 600;
let timerInterval;
let counter = 0;
length_count.innerText = index + " / " + list.length;
window.onload = () => group_name_input.focus();
group_name_input.onkeydown = (e) => (e.which == 13 ? start_game_enter() : "");
window.oncontextmenu = (e) => e.preventDefault();
window.onkeydown = (e) => (e.which == 123 ? e.preventDefault() : "");
group_name_input.oninput = () => {
  let armenianPattern = /^[Ա-Ֆա-ֆ0-9 ]+$/;
  if (!armenianPattern.test(group_name_input.value)) {
    group_name_input.value = "";
  }
};

// Game starting block in group name and pdf questions download function
function start_game_enter() {
  if (group_name_input.value !== "") {
    start_game_container.style.clipPath = "polygon(0 0, 100% 0, 100% 0, 0 0)";
    game_container.style.animationPlayState = "running";
    name_group.innerText = group_name_input.value;
    lets_sound.play();
    lets_sound.volume = 0.2;
    setTimeout(() => {
      startTimer();
      showing_texts("add");
      forPointerEvents("unset");
      help_buttons.forEach((item) => (item.style.pointerEvents = "unset"));
      start_sound.play();
      start_sound.ontimeupdate = () => {
        if (start_sound.ended) {
          start_sound.play();
        }
      };
    }, 3000);
  } else {
    alert("Խնդրում ենք մուտքագրել խմբի անունը");
  }
}
start_game_button.onclick = () => {
  start_game_enter();
};

// Game timer function
function startTimer() {
  let startTime = Date.now();
  function updateTimer() {
    let currentTime = Date.now();
    let elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
    let minutes = Math.floor(elapsedTimeInSeconds / 60);
    let seconds = elapsedTimeInSeconds % 60;
    timer.innerHTML = `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
    time.innerHTML = `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  }
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

// Start Game elements animation
setTimeout(() => {
  start_game.forEach((item, i) => {
    item.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
    item.style.transitionDelay = i * 0.1 + "s";
    item.style.opacity = 1;
  });
}, 1500);

// Texts showing animation block function for move in up
function showing_texts(classlist_type) {
  question.classList[`${classlist_type}`]("showing_content");
  answers.forEach((answer) =>
    answer.classList[`${classlist_type}`]("showing_content")
  );
  numbers = [0, 1, 2, 3];
}

// Answers Disabled function
function forPointerEvents(type) {
  answers.forEach(
    (for_block) => (for_block.parentElement.style.pointerEvents = type)
  );
}

// Answers & Questions changeing function
function createing() {
  for_fifty = false;
  question.innerText = list[index].quest;
  list.forEach((it) => it.wrong.sort(() => Math.random() - 0.5));
  answers.forEach((item, i) => {
    item.innerText = list[index].wrong[i];
    item.parentElement.onclick = () => {
      wait_sound.currentTime = 0;
      wait_sound.play();
      wait_sound.volume = 0.4;
      help_buttons.forEach((item) => (item.style.pointerEvents = "none"));
      forPointerEvents("none");
      if (item.innerText == list[index].true) {
        item.parentElement.classList.add("wait");
        setTimeout(() => {
          item.parentElement.classList.remove("wait");
          item.parentElement.classList.add("true_animation");
          true_sound.currentTime = 0;
          true_sound.play();
          counter++;
        }, 1500);
        setTimeout(() => {
          showing_texts("remove");
          count.innerText = counter;
          length_count.innerText = counter + " / " + list.length;
        }, 2500);
        setTimeout(() => {
          item.parentElement.classList.remove("true_animation");
          if (index >= list.length - 1) {
            game_over_container.style.clipPath =
              "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
              group_name_container.style.visibility = "visible";
            game_over_container.append(group_name_container);
            let new_game_button = document.createElement("button");
            new_game_button.innerText = "Սկսել Նորից";
            game_over_container.append(new_game_button);
            clearInterval(timerInterval);
            start_sound.pause();
            new_game_button.onclick = () => window.location.reload();
          } else {
            index++;
            createing();
          }
          showing_texts("add");
          setTimeout(() => {
            forPointerEvents("unset");
          }, 1500);
          help_buttons.forEach((item) => (item.style.pointerEvents = "unset"));
        }, 3500);
      } else {
        item.parentElement.classList.add("wait");
        setTimeout(() => {
          clearInterval(timerInterval);
          item.parentElement.classList.remove("wait");
          item.parentElement.classList.add("wrong_animation");
          wrong_sound.currentTime = 0;
          wrong_sound.play();
          start_sound.pause();
          setTimeout(() => {
            answers.forEach((item) => {
              if (item.innerText == list[index].true) {
                item.parentElement.style.background = "forestgreen";
              }
            });
          }, 1500);
          setTimeout(() => {
            game_over_container.style.clipPath =
              "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
            game_over_container.append(group_name_container);
            let new_game_button = document.createElement("button");
            new_game_button.innerText = "Սկսել Նորից";
            game_over_container.append(new_game_button);
            group_name_container.style.visibility = "visible";
            new_game_button.onclick = () => window.location.reload();
          }, 4000);
        }, 1500);
      }
    };
  });
}
createing();

// Fifty Fifty section function
fifty.onclick = () => {
  fifty.disabled = true;
  for_fifty = true;
  fifty_sound.play();
  fifty.style = "border : 3px solid red; filter:brightness(0.3)";
  answers.forEach((item, i) => {
    if (item.innerText == list[index].true) {
      numbers.splice(i, 1);
      numbers.pop();
      for (let i = 0; i < numbers.length; i++) {
        answers[numbers[i]].innerText = "";
        answers[numbers[i]].parentElement.style.pointerEvents = "none";
      }
    }
  });
};
