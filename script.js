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

let randomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

btnStart.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputNumber.value === "" ||
    inputNumber.value < 3 ||
    inputNumber.value > 6
  ) {
    let errorMes = "Please write number of players correct (3-6 players)";
    document.querySelector(".error-massege").innerHTML = errorMes;
  } else {
    let arrayOfCards = [0, 1, 2, 3, 4, 5];

    let numberOfPlayer = 0;
    let randomCards = [];

    numberOfPlayer = inputNumber.value;

    for (let i = 0; i < numberOfPlayer; i++) {
      let rendNum = randomNum(0, arrayOfCards.length);
      randomCards.push(arrayOfCards[rendNum]);
      arrayOfCards.splice(rendNum, 1);
    }

    let newHtml = "";
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
          <input class='input-${
            randomCards[i]
          }' type="text" placeholder='Your Name'  >
          </input>
          <button class='btn-submit-${randomCards[i]}'>Submit</button>
          </div>
        </div>
      </div>
        </div>
      </div>`;
    }
    sectionCardConteiner.innerHTML = newHtml + finish;

    for (let i = 0; i < randomCards.length; i++) {
      console.log(randomCards[i]);
      document
        .querySelector(`.card-${randomCards[i]}`)
        .addEventListener("click", function () {
          document
            .querySelector(`.card-${randomCards[i]}`)
            .classList.toggle("increase");
          for (let j = 0; j < randomCards.length; j++) {
            if (j != i) {
              document
                .querySelector(`.card-${randomCards[j]}`)
                .classList.remove("increase");
            }
          }
        });
    }

    document.querySelectorAll(`.name-select`).forEach((element) =>
      element.addEventListener("click", function (e) {
        e.stopPropagation();
      })
    );

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
            console.log(
              document.querySelector(`.btn-submit-${randomCards[i]}`)
            );
            console.log(
              document.querySelector(`.input-${randomCards[i]}`).value
            );

            namesOfPlayers.push(
              document.querySelector(`.input-${randomCards[i]}`).value
            );
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

    document
      .querySelector(".btn-finish")
      .addEventListener("click", function () {
        if (namesOfPlayers.length !== randomCards.length) {
          document.querySelector(`.error-finish`).innerHTML =
            "Add all player's Name";
        } else {
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

    document.querySelector(
      `.img-${randomCards[randomCards.length - 1]}`
    ).onload = function () {
      sectionCardConteiner.classList.toggle("hidden");
      startConteiner.classList.toggle("hidden");
    };
  }
});

// let hiddenCards = [];

// document.querySelector(".btn-start").addEventListener("click", function () {
//   for (let i = 0; i < 2; i++) {
//     let rendNum = randomNum(0, arrayOfCards.length);
//     hiddenCards.push(arrayOfCards[rendNum]);
//     arrayOfCards.splice(rendNum, 1);
//   }
//   //   console.log(hiddenCards);
//   //   console.log(arrayOfCards);

//   for (let i = 0; i < hiddenCards.length; i++) {
//     document
//       .querySelector(`.card-${hiddenCards[i]}`)
//       .classList.toggle("hidden");
//   }

//   document.querySelector(".conteiner-btn").classList.add("hidden");
//   document.querySelector(".section-cards").classList.remove("hidden");
// });

// for (let i = 0; i < 6; i++) {
//   document
//     .querySelector(`.btn-submit-${i}`)
//     .addEventListener("click", function (e) {
//       e.preventDefault();
//       console.log(document.querySelector(`.btn-submit-${i}`));
//       console.log(document.querySelector(`.input-${i}`).value);
//       let nameOfGamer = document.querySelector(`.input-${i}`).value;
//       document.querySelector(`.name-select-${i}`).classList.toggle("hidden");
//       document.querySelector(`.new-text-${i}`).innerHTML = `${nameOfGamer}`;

//       document.querySelector(`.card-${i}`).classList.add("hidden");
//     });
// }

// document.querySelector(".btn-finish").addEventListener("click", function () {
//   for (let i = 0; i < arrayOfCards.length; i++) {
//     if (
//       arrayOfCards[i] !== hiddenCards[0] &&
//       arrayOfCards[i] !== hiddenCards[1]
//     ) {
//       document
//         .querySelector(`.card-${arrayOfCards[i]}`)
//         .classList.toggle("hidden");
//     }
//   }
//   document.querySelector(".container-btn-finish").classList.toggle("hidden");
// });

// document.querySelectorAll(`.name-select`).forEach((element) =>
//   element.addEventListener("click", function (e) {
//     e.stopPropagation();
//   })
// );

// for (let i = 0; i < 6; i++) {
//   document.querySelector(`.card-${i}`).addEventListener("click", function () {
//     document.querySelector(`.card-${i}`).classList.toggle("increase");
//   });
// }
