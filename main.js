import {QuestionModal} from "./Classes/QuestionModal.js";
import {AboutWindow} from "./Classes/AboutModal.js";
import {GameBoard} from "./Classes/GameBoard.js";

//initializes game components
class Game {
    constructor() {
        this.questionModal = new QuestionModal();
        this.slidingWindow = new AboutWindow();
        this.gameBoard = new GameBoard()

        //calls init function of Game class on instance creation
        this.init();
    }
    init() {
        this.questionModal.init();
        this.slidingWindow.init();
        this.gameBoard.init();
    }

}

//creates new instance of Game class
const game = new Game();







