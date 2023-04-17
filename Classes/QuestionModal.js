//functionality for clicking question icon to open help modal
export class QuestionModal {
    constructor() {
        //html class selectors
        this.modal = document.querySelector('.modal');
        this.overlay = document.querySelector('.overlay');
        this.questionButton = document.querySelector('.bi-question-circle');
        this.closeButton = document.querySelector('.fa-x');
    }

    //sets colors for example rows in question modal
    setColors(green, yellow, grey) {
        setTimeout(() => {
            document.querySelector('.green').style.backgroundColor = green;
            document.querySelector('.green').style.borderColor = green;
            document.querySelector('.yellow').style.backgroundColor = yellow;
            document.querySelector('.yellow').style.borderColor = yellow;
            document.querySelector('.grey').style.backgroundColor = grey;
            document.querySelector('.grey').style.borderColor = grey;
        }, 500);
    }

    //resets colors for example rows in question modal.
    resetColors(white, grey) {
        setTimeout(() => {
            document.querySelector('.green').style.borderColor = grey;
            document.querySelector('.yellow').style.borderColor = grey;
            document.querySelector('.grey').style.borderColor = grey;

            document.querySelector('.grey').style.backgroundColor = white;
            document.querySelector('.yellow').style.backgroundColor = white;
            document.querySelector('.green').style.backgroundColor = white;;
        }, 500);
    }
    init() {
        //on question icon click, removes hidden class names from modal and overlay elements
        this.questionButton.addEventListener('click', (e) => {
            this.modal.classList.remove('hidden');
            this.overlay.classList.remove('hidden');

            //also sets appropriate colors on target cell elements
            this.setColors('#57A05D', '#C5AB55', '#6C7173')
        });

        //on overlay click, adds hidden class to hide modal and overlay
        this.overlay.addEventListener('click', () => {
            this.overlay.classList.add('hidden');
            this.modal.classList.add('hidden');

            //also resets the elements grid color to white
            this.resetColors('white', '#CDD0D5')

        });

        //on x button click, adds hidden class to hide modal and overlay
        this.closeButton.addEventListener('click', () => {
            this.overlay.classList.add('hidden');
            this.modal.classList.add('hidden');

            //also resets the elements grid color to white
            this.resetColors('white', '#CDD0D5')
        });
    }
}