import {wordArray} from "../dictionary.js";

class GameBoard {
    constructor() {
        //game board selectors
        this.grid = document.querySelector('.word-grid-section');
        this.keyboard = document.querySelectorAll('.key');

        //current game options
        this.rounds = 6;
        this.wordLength = 5;

        //generates array of valid words that matches defined word length
        this.validWords = wordArray.filter((word) => word.length === this.wordLength);
        this.word = this.validWords[Math.floor(Math.random() * this.validWords.length)];

        //determines if game accepts input
        this.inputEnabled = true;

        //starting values for current round and grid box number
        this.currRound = 1;
        this.boxNum = 0;

        //prints the current word to the console for cheating
        console.log(this.word);

    }

    init() {
        //creates grid through adding elements to DOM tree
        //creates a round element section, corresponds to the grid's row
        
        let winCondition = false;
        
        for (let i = 1; i < this.rounds + 1; i++) {
            let round = document.createElement('section');
            round.classList.add('round' + i, 'round');
            this.grid.append(round);

            //create box element, corresponds to grid row's square
            for (let j = 0; j < this.wordLength; j++) {
                let currentRow = document.querySelector(`.round${i}`);
                let box = document.createElement('div');
                box.classList.add('box');
                currentRow.append(box);
            }
        }


        //selects each keyboard element from the keyboard array
        this.keyboard.forEach(element => {
            //for each element, adds a click event
            element.addEventListener('click', (e) => {

                if (this.inputEnabled) {
                    let keyClick = e.target.innerHTML;
                    let rowParent = document.querySelector('.round' + this.currRound);
                    let currBox = rowParent.querySelectorAll('.box');
                    if (this.currRound <= this.rounds) {
                        if (this.boxNum < this.wordLength) {
                            if (keyClick.length <= 1) {
                                if (keyClick.charCodeAt(0) >= 65 || keyClick.charCodeAt(0) <= 90) {
                                    currBox[this.boxNum].innerHTML = keyClick;
                                    this.boxNum++;
                                }
                            }
                        }

                        //check if key is enter, and boxNum is the word length
                        //if so begins key check process
                        if (keyClick === 'Enter' && this.boxNum === this.wordLength) {
                            let string = ' ';
                            let validator = '';

                            //builds the users word and assigns to validator by iterating through letters
                            for (let i = 0; i < currBox.length; i++) {
                                validator += currBox[i].innerHTML;
                            }

                            //checks if the user's word is a real word
                            if (this.validWords.includes(validator)) {
                                this.inputEnabled = false;
                                setTimeout(() => {
                                    this.inputEnabled = true;
                                }, 1200)

                                //for all boxes of current round, begin animations
                                for (let i = 0; i < currBox.length; i++) {
                                    currBox[i].classList.remove('shake');
                                    currBox[i].classList.add('flip');
                                    currBox[i].style.animationDelay = `${i * 200}ms`;
                                    string += currBox[i].innerHTML;

                                    //if a letter matches and is in the right spot, make letter green
                                    if (currBox[i].innerHTML === this.word[i]) {
                                        setTimeout(() => {
                                            currBox[i].style.backgroundColor = '#57A05D';
                                            currBox[i].style.borderColor = '#57A05D';
                                            currBox[i].style.color = 'white';
                                        }, i * 200);

                                        //corresponding letter in the keyboard becomes green
                                        for (let elements of this.keyboard) {
                                            if (elements.innerHTML === currBox[i].innerHTML) {
                                                elements.style.backgroundColor = '#57A05D';
                                            }
                                        }

                                        //if the validator is the assigned word, start winning animation
                                        if (validator === this.word) {
                                            winCondition = true;
                                            setTimeout(() => {
                                                currBox[i].classList.remove('flip');
                                                currBox[i].classList.add('winner');
                                                this.inputEnabled = false;
                                            }, 1201);
                                        }

                                        //if current box contains letter in the validator, letter = yellow
                                    } else if (this.word.includes(currBox[i].innerHTML)) {
                                        setTimeout(() => {
                                            currBox[i].style.backgroundColor = '#C5AB55';
                                            currBox[i].style.borderColor = '#C5AB55';
                                            currBox[i].style.color = 'white';
                                        }, i * 200);

                                        //corresponding letter in keyboard = yellow
                                        for (let elements of this.keyboard) {
                                            if (elements.innerHTML === currBox[i].innerHTML) {
                                                elements.style.backgroundColor = '#C5AB55';
                                            }
                                        }
                                    } else {

                                        //letter not in validator, letter = gray
                                        setTimeout(() => {
                                            currBox[i].style.backgroundColor = '#6C7173';
                                            currBox[i].style.borderColor = '#6C7173';
                                            currBox[i].style.color = 'white';
                                        }, i * 200);

                                        //corresponding letter in keyboard = gray
                                        for (let elements of this.keyboard) {
                                            if (elements.innerHTML === currBox[i].innerHTML) {
                                                elements.style.backgroundColor = '#6C7173';
                                            }
                                        }
                                    }
                                }

                                //increments currRound to progress game to next row
                                this.currRound++;

                                //resets box counter to 0 to start printing letter selection to fist box
                                this.boxNum = 0;


                                //losing condition, if current round is greater than the amount of defined rounds
                                //start losing animation
                                if (this.currRound > this.rounds && winCondition === false) {
                                    console.log('Sorry, you lost!');
                                    this.inputEnabled = false;

                                    setTimeout(() => {
                                        for (let i = 1; i < this.rounds + 1; i++) {
                                            let currentRow = document.querySelector(`.round${i}`);
                                            let currBox = currentRow.querySelectorAll('.box');
                                            for (let j = 0; j < currBox.length; j++) {
                                                currBox[j].innerHTML = this.word[j];
                                                currBox[j].style.backgroundColor = '#D9534F';
                                                currBox[j].style.borderColor = '#D9534F';
                                                currBox[j].style.color = 'white';
                                                currBox[j].classList.add('shake');
                                                currBox[j].classList.add('loser');
                                            }
                                        }
                                    }, 1200);

                                }


                                //if the word is not a valid word, start invalid word animation
                            } else if (!this.validWords.includes(validator)) {
                                currBox.forEach(el => {
                                    el.classList.remove('shake');
                                    void element.offsetWidth;
                                    el.classList.add('shake');
                                });
                                console.log('Invalid word!');
                            }

                            //if the user submits a word that is too short, start begin invalid word animation
                        } else if (keyClick === 'Enter') {
                            currBox.forEach(el => {
                                el.classList.remove('shake');
                                void element.offsetWidth;
                                el.classList.add('shake');
                            });
                            console.log('Need more letters');
                        }

                        //delete the current letter in the grid, and move boxNum pointer back 1
                        if (keyClick.length > 5 && this.boxNum !== 0) {
                            this.boxNum--;
                            currBox[this.boxNum].innerHTML = ' ';
                        }
                    }
                }
            });
        });
    }
}

export {GameBoard}
