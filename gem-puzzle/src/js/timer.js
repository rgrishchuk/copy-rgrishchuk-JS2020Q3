// import StatusBar from './statbar';
export default class Timer {
  constructor(statusBar) {
    this.min = 0;
    this.sec = 0;
    this.ms = 0;
    this.statusBar = statusBar;
    console.log(this.statusBar);
  }

  time() { 
    if (this.sec === 59) {
      this.min += 1;
      this.sec = 0;
    } else this.sec += 1;
    if (this.statusBar) {
      this.statusBar.setTimer(this);
    }
  }

  getTime() {
    return { min: this.min, sec: this.sec };
  }

  clear() {
    this.min = 0;
    this.sec = 0;
  }

  start() {
    console.log('start timer');
    const time = this.time.bind(this);
    this.timer = setInterval(time, 1000);
    // this.timer = setInterval( () => { this.time() }, 1000);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
