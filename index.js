import {wordArray} from "./fiveLetterList.js";


//styles

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const questionButton = document.querySelector('.bi-question-circle');
const closeButton = document.querySelector('.fa-x');


questionButton.addEventListener('click', (e) => {
    console.log('clicked question!');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');



    setTimeout(() => {
        document.querySelector('.green').style.backgroundColor = '#57A05D'
        document.querySelector('.green').style.borderColor = '#57A05D'
        document.querySelector('.yellow').style.backgroundColor = '#C5AB55'
        document.querySelector('.yellow').style.borderColor = '#C5AB55'
        document.querySelector('.grey').style.backgroundColor = '#6C7173'
        document.querySelector('.grey').style.borderColor = '#6C7173'
    }, 500)

})

overlay.addEventListener('click', () =>{
    overlay.classList.add('hidden')
    modal.classList.add('hidden');
})

closeButton.addEventListener('click', () => {
    overlay.classList.add('hidden')
    modal.classList.add('hidden');
})


//start of game logic
//game-settings
let rounds = 6
let wordLength = 5

//grab words from library and log the current word
let validWords = wordArray.filter((word) => word.length === wordLength)
let word = validWords[Math.floor(Math.random() * validWords.length)]
console.log(word);

//create your board
let grid = document.querySelector('.word-grid-section');

for (let i = 1; i < rounds + 1; i++) {

    let round = document.createElement('section');
    round.classList.add('round' + i, 'round')

    grid.append(round);

    for (let j = 0; j < wordLength; j++) {
        let currentRow = document.querySelector(`.round${i}`)
        let box = document.createElement('div');
        box.classList.add('box');
        currentRow.append(box);
    }
}

//creates array of all keyboard keys elements from html
let keyboard = document.querySelectorAll('.key');

//initial settings, updated as user continues game, where currRound is the row number, and boxNum is the box number
let inputEnabled = true;
let currRound = 1;
let boxNum = 0;


//onscreen keyboard logic
//for every element in the keyboard element array
keyboard.forEach(element => {
    //add the click event
    element.addEventListener('click', (e) => {

        if (inputEnabled) {

            //grab the value of the key that was clicked
            let keyClick = e.target.innerHTML

            //grab the parent row of the current round
            let rowParent = document.querySelector('.round' + currRound)

            //create an array of all box elements in that parent row
            let currBox = rowParent.querySelectorAll('.box');

            //if the currRound is less than or equal to the total amount of rounds
            //so if on round 1, and there are 6 rounds, keep going till 1 is ===6
            if (currRound <= rounds) {

                //if boxNum, which is the current box, is less than length of the words being used
                if (boxNum < wordLength) {

                    //of the length of the key pressed is less than 1, (so basically, no enter or delete keys!)
                    if (keyClick.length <= 1) {
                        //TODO not exactly necessary for the onscreen keyboard?
                        if (keyClick.charCodeAt(0) >= 65 || keyClick.charCodeAt(0) <= 90) {

                            //assign the innterHtml of the current box in the row to the key clicked
                            currBox[boxNum].innerHTML = keyClick;

                            //increment boxnum by 1, so that we can fill the next box
                            boxNum++
                        }
                    }
                }


                //logic for pressing enter
                //if the value is Enter and boxNum is equal to word length, that is that the row is full of letters,
                if (keyClick === 'Enter' && boxNum === wordLength) {


                    let string = ' ';
                    let validator = ''

                    //build the validator string from the letters found in the boxes
                    for (let i = 0; i < currBox.length; i++) {
                        validator += currBox[i].innerHTML
                    }

                    //if the validator string is a valid word based on the defined word array, continue
                    if (wordArray.includes(validator)) {

                        //disables input till animations are done running
                        inputEnabled = false;
                        setTimeout(() => {
                            inputEnabled = true;
                        }, 1200)

                        //for the length of the currBoxes array, which is made up of every box element from the round
                        for (let i = 0; i < currBox.length; i++) {

                            //in case the shake animation was added, remove it
                            currBox[i].classList.remove('shake')

                            //add the shake animation
                            currBox[i].classList.add('flip');

                            //give the shake animation a delay
                            currBox[i].style.animationDelay = `${i * 200}ms`;

                            //TODO build another string from the elements of the inner word?
                            string += currBox[i].innerHTML;

                            //if the current box letter matches the placement of the word letter, turn box and key green
                            if (currBox[i].innerHTML === word[i]) {

                                //style delay
                                setTimeout(() => {
                                    currBox[i].style.backgroundColor = '#57A05D'
                                    currBox[i].style.borderColor = '#57A05D'
                                    currBox[i].style.color = 'white'
                                }, i * 200)


                                //TODO searches through the entire keyboard array, if match found, make the key green
                                for (let elements of keyboard) {
                                    if (elements.innerHTML === currBox[i].innerHTML) {
                                        elements.style.backgroundColor = '#57A05D'
                                    }
                                }

                                //win check
                                if (validator === word) {
                                    console.log('winner girly you a winner!!! slayyyyy');

                                    setTimeout(() => {
                                        currBox[i].classList.remove('flip')
                                        currBox[i].classList.add('winner');
                                        inputEnabled = false
                                    }, 1201)

                                }

                                //if the current box letter matches a letter in the word, turn box and key yellow
                            } else if (word.includes(currBox[i].innerHTML)) {


                                setTimeout(() => {
                                    currBox[i].style.backgroundColor = '#C5AB55';
                                    currBox[i].style.borderColor = '#C5AB55'
                                    currBox[i].style.color = 'white'
                                }, i * 200)


                                for (let elements of keyboard) {
                                    if (elements.innerHTML === currBox[i].innerHTML) {
                                        elements.style.backgroundColor = '#C5AB55'
                                    }
                                }

                                //if the current box letter does not match a letter in the word, turn box and key grey
                            } else {

                                setTimeout(() => {
                                    currBox[i].style.backgroundColor = '#6C7173'
                                    currBox[i].style.borderColor = '#6C7173'
                                    currBox[i].style.color = 'white'
                                }, i * 200)


                                for (let elements of keyboard) {
                                    if (elements.innerHTML === currBox[i].innerHTML) {
                                        elements.style.backgroundColor = '#6C7173'
                                    }
                                }
                            }

                        }

                        //after a successful round, increment round by 1, and reset the box counter
                        currRound++
                        boxNum = 0;

                        ///if the word is NOT valid
                    } else if (!wordArray.includes(validator)) {

                        currBox.forEach(el => {
                            el.classList.remove('shake')
                            void element.offsetWidth;
                            el.classList.add('shake');
                        })
                        console.log('bitch what!');
                    }


                    //if the press is enter at any other time
                } else if (keyClick === 'Enter') {

                    currBox.forEach(el => {

                        el.classList.remove('shake')
                        void element.offsetWidth;
                        el.classList.add('shake');

                    })

                    console.log('sorry girly, need more letters');
                }


                //backspace logic
                if (keyClick.length > 5 && boxNum !== 0) {
                    boxNum--
                    currBox[boxNum].innerHTML = ' '
                }
            }
        }
    })
})


document.addEventListener('keydown', (event) => {
    let name = event.key;
   console.log(name);
})










