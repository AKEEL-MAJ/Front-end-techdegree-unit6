/******************
  GAME SHOW APP
******************/

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const resetButton = document.querySelector('.btn__reset');
let missed = 0;


const phrases = [
  "conquer from within", 
  "to be the man you got to beat the man",
  "think outside the box",
  "the show must go on",
  "creavity takes courage"
];


const overlay = document.getElementById('overlay');

// listen for the start game button to be pressed
resetButton.addEventListener('click', () => {
  
  if (resetButton.textContent === 'Start Game') {
    overlay.style.display = 'none';
  } else if (resetButton.textContent === 'Reset') {
    window.location.reload();
  }

});


// return a random phrase from an array
const getRandomPhraseAsArray = arr => {
  let randomNo = Math.floor(Math.random() * arr.length);
  const randomPhrase = arr[randomNo].split("");
  return randomPhrase;
}

let phraseArray = getRandomPhraseAsArray(phrases);


// adds the letters of a string to the display
const addPhraseToDisplay = arr => {
  for (let i = 0; i < arr.length; i += 1) {

    const li = document.createElement('li');
    const element = arr[i];
    li.innerHTML = element;
    phrase.appendChild(li);

    if (li.innerHTML !== " ") {
      li.classList.add('letter');
    } else {
      li.classList.add('space');
    }
  }
} 

addPhraseToDisplay(phraseArray);


// check if a letter is in the phrase
const checkLetter = button => {

  let letters = document.querySelectorAll('.letter');
  let match = null;

  for (let i = 0; i < letters.length; i += 1) {
    if (button === letters[i].innerHTML) {
      letters[i].classList.add('show');
      match = true;
    }
  } 
  return match;

}


// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', e => {
  
  if (e.target.tagName === 'BUTTON') {

    event.target.classList.add('chosen');
    event.target.setAttribute('disabled', true);

    letterSelect = event.target.innerHTML;
    let letterFound = checkLetter(letterSelect);

    if (letterFound === null) {
      missed += 1;

      const li = document.createElement('li');
      const img = document.createElement('img');
      const liveHearts = document.querySelector('#scoreboard ol');
      const liveHeartsLi = liveHearts.firstElementChild;
      img.src = 'images/lostHeart.png';
      img.style = 'height: 35px; width: 35px;';
      li.appendChild(img);
      liveHearts.appendChild(li);
      liveHearts.removeChild(liveHeartsLi);

    }
  }
  checkWin();
});


// check if the game has been won or lost
const checkWin = () => {

  let letter = document.getElementsByClassName('letter');
  let show = document.getElementsByClassName('show');
  
  if(letter.length === show.length) {
    overlay.className = 'win';
    overlay.style.display = '';
    overlay.firstElementChild.textContent = 'You Win!';
    resetButton.textContent = 'Reset';
    phrase.style.display = 'none';
  } else if (missed === 5) {
    overlay.className = 'lose';
    overlay.style.display = '';
    overlay.firstElementChild.textContent = 'You Lose!';
    resetButton.textContent = 'Reset';
    phrase.style.display = 'none';
  }

}
