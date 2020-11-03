export default class Timer {
    constructor() {
        this.min = 0;
        this.sec = 0;
    }

    time() {
        if (this.sec === 59) {
            this.min = this.min + 1;
            this.sec = 0;
        } else this.sec = this.sec + 1;
        console.log(`${this.min}:${this.sec}`);
    }

    getTime() {
        return { min: this.min, sec: this.sec }
    }

    clear() {
        this.min = 0;
        this.sec = 0;
    }

    start() {
        console.log('start timer');
        let time = this.time.bind(this);
        this.timer = setInterval(time, 1000);
        //this.timer = setInterval( () => { this.time() }, 1000);
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}