export class AboutWindow {
    constructor() {
        //html element selectors
        this.openButton = document.querySelector('.bi-list');
        this.window = document.querySelector('.window');
        this.windowClose = document.querySelector('.window-close');
    }

    init() {

        //on open button click, add the open class to open the about modal
        this.openButton.addEventListener('click', () => {
            this.window.classList.add('open');
        });

        //on x button click, remove the open class to close the about modal
        this.windowClose.addEventListener('click', () => {
            this.window.classList.remove('open');
        });
    }
}








