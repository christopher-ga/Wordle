import {QuestionModal} from "../Classes/QuestionModal.js";
import {AboutWindow} from "../Classes/AboutModal.js";
import {GameBoard} from "../Classes/GameBoard.js";
class Game {
    constructor() {
        this.questionModal = new QuestionModal();
        this.slidingWindow = new AboutWindow();
        this.gameBoard = new GameBoard()

        this.init();
    }

    init() {
        this.questionModal.init();
        this.slidingWindow.init();
        this.gameBoard.init();
    }

}

const game = new Game();







