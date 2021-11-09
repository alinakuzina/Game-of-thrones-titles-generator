let btnStart = document.querySelector(".btn-start");
let inputNumber = document.querySelector(".input-number");
let sectionCardConteiner = document.querySelector(".section-cards");
let startConteiner = document.querySelector(".conteiner-btn");
let btnSubmit = document.querySelector(".conteiner-btn");

let arrayOfCardInfo = [
  [
    0,
    "/img/game /GT01_206.jpeg",
    "Master of Whispers",
    "Hand of the King",
    "Master of Laws, Master of Coin",
    "You may resolve your [Intrigue] claim against any number of opponents of your choice.",
    "+1 Intrigue",
  ],
  [
    1,
    "/img/game /GT01_207.jpeg",
    "Master of Ships",
    "Master of Whispers",
    "Master of Laws, Hand of the King",
    "Raise the claim value on your revealed plot card by 1 during [Military] challenges in which you are attacking a rival.",
    "+1 Military",
  ],
  [
    2,
    "/img/game /GT01_208.jpeg",
    "Hand of the King",
    "Master of Laws",
    "Master of Coin, Master of Ships",
    "You may initiate 1 additional [Power] challenge during the challenges phase, against a different opponent.",
    "+1 Power",
  ],
  [
    3,
    "/img/game /GT01_209.jpeg",
    "Master of Coin",
    "Master of Ships",
    "Hand of the King, Master of Whispers",
    "",
    "+2 Gold",
  ],
  [
    4,
    "/img/game /GT01_210.jpeg",
    "Master of Laws",
    "Master of Coin",
    "Master of Whispers, Master of Ships",
    "Increase the number of cards you draw in the draw phase by 1.",
    "+1 Reserve",
  ],
  [
    5,
    "/img/game /GT01_211.jpeg",
    "Crown Regent",
    "None",
    "None",
    "You may redirect 1 challenge this round.",
    "+2 for Dominance",
  ],
];

let namesOfPlayers = [];

let arrayOfCards = [0, 1, 2, 3, 4, 5];

let numberOfPlayer = 0;

let randomCards = [];

let randomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

let recieveNames = function () {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < numberOfPlayer; i++) {
      namesOfPlayers.push(document.querySelector(`.input-name-${i}`).value);
    }
    numberOfPlayer = inputNumber.value;
    console.log(namesOfPlayers);
    resolve(namesOfPlayers);
  });
};

let makeAllCards = function () {
  numberOfPlayer = inputNumber.value;
  let newHtml = "";
  let NameOptions = function () {
    let optionHtml = "";
    for (let i = 0; i < namesOfPlayers.length; i++) {
      optionHtml += `<option value=${namesOfPlayers[i]}>${namesOfPlayers[i]}</option>`;
    }
    return optionHtml;
  };
  let finish = ` <div class='container-btn-finish'>
    <p class='error-massege-in-card error-finish'></p>
    <button class="btn-finish">Finish</button></div>`;

  for (let i = 0; i < 6; i++) {
    newHtml += `
      <div class="card-box card-${i} hidden" >
        <img
          class="img-card img-${i}"
          src="${arrayOfCardInfo[i][1]}"
          alt="${arrayOfCardInfo[i][2]}"
        />
        <div class="cars-text ">
          <p class="header-title"><strong>${arrayOfCardInfo[i][2]}</strong></p>
          <p class="support"><strong>Supports:</strong>${
            arrayOfCardInfo[i][3]
          }</p>
          <p class="Rivals">
            <strong>Rivals:</strong> ${arrayOfCardInfo[i][4]}
          </p>
          <p class="text">
          ${arrayOfCardInfo[i][5]}
          </p>
          <p><i>${arrayOfCardInfo[i][6]}</i></p>
          <p class='error-massege-in-card error-massege-in-card-${i}'></p>
      
          <div class='new-text new-text-${i}'></div>
          <div class='name-select name-select-${i}'>
          <select class='input-${i}'>
          ${NameOptions()}
          </select>
          <button class='btn-submit btn-submit-${i}'>Submit</button>
          </div>
        </div>
      </div>
        </div>
      </div>`;
  }
  sectionCardConteiner.innerHTML = newHtml + finish;
  sectionCardConteiner.classList.toggle("hidden");
  startConteiner.classList.toggle("hidden");
};

let renderCards = function () {
  arrayOfCards = [0, 1, 2, 3, 4, 5];
  for (let i = 0; i < numberOfPlayer; i++) {
    let rendNum = randomNum(0, arrayOfCards.length);
    randomCards.push(arrayOfCards[rendNum]);
    arrayOfCards.splice(rendNum, 1);
  }
  console.log(randomCards);

  for (let i = 0; i < randomCards.length; i++) {
    document
      .querySelector(`.card-${randomCards[i]}`)
      .classList.toggle("hidden");
  }
  document.querySelector(".btn-finish").classList.remove("hidden");
};

let increase = function () {
  for (let i = 0; i < 6; i++) {
    console.log(i);
    document.querySelector(`.card-${i}`).addEventListener("click", function () {
      document.querySelector(`.card-${i}`).classList.toggle("increase");

      [0, 1, 2, 3, 4, 5]
        .filter((elem, index) => index != i)
        .forEach((elem) =>
          document.querySelector(`.card-${elem}`).classList.remove("increase")
        );
    });
    document.querySelectorAll(`.name-select`).forEach((element) =>
      element.addEventListener("click", function (e) {
        e.stopPropagation();
      })
    );
  }

  return randomCards;
};

let submitData = function () {
  for (let i = 0; i < 6; i++) {
    document
      .querySelector(`.btn-submit-${i}`)
      .addEventListener("click", function (e) {
        e.preventDefault();

        console.log(document.querySelector(`.btn-submit-${i}`));
        console.log(document.querySelector(`.input-${i}`).value);

        let nameOfGamer = document.querySelector(`.input-${i}`).value;
        document.querySelector(`.name-select-${i}`).classList.toggle("hidden");
        document.querySelector(`.new-text-${i}`).innerHTML = `${nameOfGamer}`;

        document.querySelector(`.card-${i}`).classList.add("hidden");
      });
  }
  return randomCards;
};

let finish = function () {
  console.log("finish");
  document.querySelector(".btn-finish").addEventListener("click", function () {
    for (let j = 0; j < randomCards.length; j++) {
      document
        .querySelector(`.card-${randomCards[j]}`)
        .classList.remove("increase");
    }

    console.log(randomCards);
    for (let i = 0; i < randomCards.length; i++) {
      console.log("finish hidden");
      document
        .querySelector(`.card-${randomCards[i]}`)
        .classList.toggle("hidden");
    }
    document.querySelector(".container-btn-finish").classList.toggle("hidden");
    document.querySelector(".next-option-hidden").classList.remove("hidden");
  });
  return randomCards;
};

let startCards = function () {
  btnStart.addEventListener("click", function (e) {
    e.preventDefault();
    recieveNames();
    makeAllCards();
    renderCards();
    increase();
    submitData();
    finish();
  });
};

let newTern = function () {
  document
    .querySelector(".btn-new-tern")
    .addEventListener("click", function (e) {
      e.preventDefault();
      for (let i = 0; i < randomCards.length; i++) {
        document
          .querySelector(`.card-${randomCards[i]}`)
          .classList.toggle("hidden");

        document.querySelector(`.new-text-${randomCards[i]}`).innerHTML = "";

        document
          .querySelector(`.name-select-${randomCards[i]}`)
          .classList.remove("hidden");
      }
      randomCards = [];

      [0, 1, 2, 3, 4, 5].forEach((elem) => {
        console.log(elem);
        document.querySelector(`.card-${elem}`).classList.remove("increase");
      });

      renderCards();
      document
        .querySelector(".container-btn-finish")
        .classList.toggle("hidden");

      document.querySelector(".next-option-hidden").classList.add("hidden");
    });
};

document
  .querySelector(".btn-submit-number")
  .addEventListener("click", function (e) {
    e.preventDefault();
    if (
      inputNumber.value === "" ||
      inputNumber.value < 3 ||
      inputNumber.value > 6
    ) {
      let errorMes = "Please write number of players correct (3-6 players)";
      document.querySelector(".error-massege").innerHTML = errorMes;
    } else {
      document.querySelector(".error-massege").innerHTML = "";

      document.querySelector(".btn-submit-number").classList.toggle("hidden");
      document.querySelector(".btn-start").classList.toggle("hidden");

      numberOfPlayer = inputNumber.value;
      let textLine = ``;
      for (let i = 0; i < numberOfPlayer; i++) {
        textLine += `<input class="input-name input-name-${i}" type="text" placeholder="Your name" />`;
        document.querySelector(".type-names").innerHTML = textLine;
      }
    }
  });

startCards();
newTern();

/*

let namesOfPlayers = [];

let arrayOfCards = [0, 1, 2, 3, 4, 5];

let numberOfPlayer = 0;

let showSectionNumber = 0;

let way = 0;

let randomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

let cardDrowFunc = function () {
  if (namesOfPlayers.length === 0) {
    for (let i = 0; i < numberOfPlayer; i++) {
      console.log(document.querySelector(`.input-name-${i}`).value);
      namesOfPlayers.push(document.querySelector(`.input-name-${i}`).value);
    }
  }

  arrayOfCards = [0, 1, 2, 3, 4, 5];

  numberOfPlayer = 0;
  randomCards = [];

  numberOfPlayer = inputNumber.value;

  for (let i = 0; i < numberOfPlayer; i++) {
    let rendNum = randomNum(0, arrayOfCards.length);
    randomCards.push(arrayOfCards[rendNum]);
    arrayOfCards.splice(rendNum, 1);
  }

  let newHtml = "";

  let NameOptions = function () {
    let optionHtml = "";
    for (let i = 0; i < namesOfPlayers.length; i++) {
      optionHtml += `<option value=${namesOfPlayers[i]}>${namesOfPlayers[i]}</option>`;
    }
    return optionHtml;
  };
  let finish = ` <div class='container-btn-finish'>
    <p class='error-massege-in-card error-finish'></p>
    <button class="btn-finish">Finish</button></div>`;

  for (let i = 0; i < randomCards.length; i++) {
    newHtml += `
      <div class="card-box card-${randomCards[i]}" >
        <img
          class="img-card img-${randomCards[i]}"
          src="${arrayOfCardInfo[randomCards[i]][1]}"
          alt="Master of wispers"
        />
        <div class="cars-text ">
          <p class="header-title"><strong>${
            arrayOfCardInfo[randomCards[i]][2]
          }</strong></p>
          <p class="support"><strong>Supports:</strong>${
            arrayOfCardInfo[randomCards[i]][3]
          }</p>
          <p class="Rivals">
            <strong>Rivals:</strong> ${arrayOfCardInfo[randomCards[i]][4]}
          </p>
          <p class="text">
          ${arrayOfCardInfo[randomCards[i]][5]}
          </p>
          <p><i>${arrayOfCardInfo[randomCards[i]][6]}</i></p>
          <p class='error-massege-in-card error-massege-in-card-${
            randomCards[i]
          }'></p>
      
          <div class='new-text new-text-${randomCards[i]}'></div>
          <div class='name-select name-select-${randomCards[i]}'>
          <select class='input-${randomCards[i]}'>
          ${NameOptions()}
          </select>
          <button class='btn-submit btn-submit-${
            randomCards[i]
          }'>Submit</button>
          </div>
        </div>
      </div>
        </div>
      </div>`;
  }
  sectionCardConteiner.innerHTML = newHtml + finish;
  document.querySelector(`.img-${randomCards[randomCards.length - 1]}`).onload =
    function () {
      sectionCardConteiner.classList.toggle("hidden");
      startConteiner.classList.toggle("hidden");
    };
  return randomCards;
};

let startCards = function () {
  return new Promise((resolve, reject) => {
    btnStart.addEventListener("click", function (e) {
      e.preventDefault();
      let randomCardsFromFunc = cardDrowFunc();
      resolve(randomCardsFromFunc);
    });
  });
};

let increase = function (randomCards) {
  for (let i = 0; i < randomCards.length; i++) {
    console.log(randomCards[i]);
    document
      .querySelector(`.card-${randomCards[i]}`)
      .addEventListener("click", function () {
        document
          .querySelector(`.card-${randomCards[i]}`)
          .classList.toggle("increase");

        randomCards
          .filter((elem, index) => index != i)
          .forEach((elem) =>
            document.querySelector(`.card-${elem}`).classList.remove("increase")
          );
      });
    document.querySelectorAll(`.name-select`).forEach((element) =>
      element.addEventListener("click", function (e) {
        e.stopPropagation();
      })
    );
  }
  return randomCards;
};

let submitData = function (randomCards) {
  for (let i = 0; i < randomCards.length; i++) {
    document
      .querySelector(`.btn-submit-${randomCards[i]}`)
      .addEventListener("click", function (e) {
        e.preventDefault();
        if (document.querySelector(`.input-${randomCards[i]}`).value === "") {
          document.querySelector(
            `.error-massege-in-card-${randomCards[i]}`
          ).innerHTML = "Write your name";
        } else {
          console.log(document.querySelector(`.btn-submit-${randomCards[i]}`));
          console.log(document.querySelector(`.input-${randomCards[i]}`).value);

          let nameOfGamer = document.querySelector(
            `.input-${randomCards[i]}`
          ).value;
          document
            .querySelector(`.name-select-${randomCards[i]}`)
            .classList.toggle("hidden");
          document.querySelector(
            `.new-text-${randomCards[i]}`
          ).innerHTML = `${nameOfGamer}`;

          document
            .querySelector(`.card-${randomCards[i]}`)
            .classList.add("hidden");
        }
      });
  }
  return randomCards;
};

let finish = function (randomCards) {
  document.querySelector(".btn-finish").addEventListener("click", function () {
    if (namesOfPlayers.length !== randomCards.length) {
      document.querySelector(`.error-finish`).innerHTML =
        "Add all player's Name";
    } else {
      for (let j = 0; j < randomCards.length; j++) {
        document
          .querySelector(`.card-${randomCards[j]}`)
          .classList.remove("increase");
      }

      document.querySelector(`.error-finish`).innerHTML = "";
      for (let i = 0; i < randomCards.length; i++) {
        document.querySelector(
          `.error-massege-in-card-${randomCards[i]}`
        ).innerHTML = "";
        document
          .querySelector(`.card-${randomCards[i]}`)
          .classList.toggle("hidden");
      }
      document
        .querySelector(".container-btn-finish")
        .classList.toggle("hidden");
    }
  });
  return randomCards;
};

// let obsorverFunc = function (randomCards) {
//   const observer = new MutationObserver(function () {
//     console.log("callback that runs when observer is triggered");
//     let numbOftrue = 0;
//     console.log(document.querySelector(`.card-${randomCards[0]}`));
//     for (let i = 0; i < randomCards.length; i++) {
//       if (
//         document
//           .querySelector(`.card-${randomCards[i]}`)
//           .classList.contains("hidden")
//       ) {
//         numbOftrue++;
//       }
//     }
//     console.log(numbOftrue, randomCards.length);
//     if (randomCards.length === numbOftrue) {
//       console.log("all is hidden");
//       numbOftrue = 0;
//       for (let j = 0; j < randomCards.length; j++) {
//         document
//           .querySelector(`.card-${randomCards[j]}`)
//           .classList.remove("increase");
//       }

//       for (let i = 0; i < randomCards.length; i++) {
//         document.querySelector(
//           `.error-massege-in-card-${randomCards[i]}`
//         ).innerHTML = "";
//         document
//           .querySelector(`.card-${randomCards[i]}`)
//           .classList.toggle("hidden");
//       }
//     }
//     return namesOfPlayers;
//   });
//   const elementToObserve = document.querySelector(".section-cards");
//   observer.observe(elementToObserve, { subtree: true, childList: true });
// };

document
  .querySelector(".btn-submit-number")
  .addEventListener("click", function (e) {
    e.preventDefault();
    if (
      inputNumber.value === "" ||
      inputNumber.value < 3 ||
      inputNumber.value > 6
    ) {
      let errorMes = "Please write number of players correct (3-6 players)";
      document.querySelector(".error-massege").innerHTML = errorMes;
    } else {
      document.querySelector(".error-massege").innerHTML = "";

      document.querySelector(".btn-submit-number").classList.toggle("hidden");
      document.querySelector(".btn-start").classList.toggle("hidden");

      numberOfPlayer = inputNumber.value;
      let textLine = ``;
      for (let i = 0; i < numberOfPlayer; i++) {
        textLine += `<input class="input-name input-name-${i}" type="text" placeholder="Your name" />`;
        document.querySelector(".type-names").innerHTML = textLine;
      }
    }
  });

let newTern = async function () {
  document
    .querySelector(".btn-new-tern")
    .addEventListener("click", function (e) {
      e.preventDefault();
      way = 1;
      let randomCardsFromFunc = cardDrowFunc();
      sectionCardConteiner.classList.toggle("hidden");
      startConteiner.classList.toggle("hidden");
      resolve(randomCardsFromFunc);
    });
};

let newTernProm = function () {
  newTern()
    .then((x) => increase(x))
    .then((x) => submitData(x))
    .then((x) => finish(x))
    .then((x) => newTern(x));
};

if ((way = 0)) {
  startCards()
    .then((x) => increase(x))
    .then((x) => submitData(x))
    .then((x) => finish(x))
    .then((x) => newTern(x));
} else {
  newTern()
    .then((x) => increase(x))
    .then((x) => submitData(x))
    .then((x) => finish(x));
}




*/
