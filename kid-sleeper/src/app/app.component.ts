import { Component } from '@angular/core';
import { interval, Observable, Subscription, timer } from 'rxjs';
import NoSleep from 'nosleep.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kid-sleeper';
  possibleImages = [
    'https://i.pinimg.com/736x/6d/d2/0d/6dd20dc6562db8781a116d89926b41fc.jpg',
    'https://d3ddkgxe55ca6c.cloudfront.net/assets/t1625198549/a/36/9b/paw-patrol-snuggle-prv-3-2020426.jpg',
    'https://d3ddkgxe55ca6c.cloudfront.net/assets/t1625198541/a/6b/7b/paw-patrol-snuggle-prv-2-2020422.jpg',
    'https://c.tenor.com/ic3qongpg3QAAAAd/paw-patrol-tired.gif',
    'https://static.wikia.nocookie.net/paw-patrol/images/6/64/Chickaletta%27s_Egg_12.jpg/revision/latest/scale-to-width-down/1200?cb=20190716131441'
  ];
  selectedBackgroundImageNumber = 3;
  selectedBackgroundImage = this.possibleImages[this.selectedBackgroundImageNumber];
  totalMinutes = 20;
  totalSeconds = this.totalMinutes * 60;
  remainingSeconds = this.totalMinutes * 60;
  timeIncrements = 5;

  timerSub: Subscription = new Subscription();

  timerInterval: number = 1000; //1000 for true seconds, something else for testing

  timerIsRunning = false;

  noSleep: NoSleep = new NoSleep();

  audioFinish = new Audio('../assets/Pup_Bedtime.mp3');

  constructor() {

  }

  startTimer = () => {
    const source = interval(this.timerInterval);
    this.totalSeconds = this.totalMinutes * 60;
    this.remainingSeconds = this.totalMinutes * 60;
    this.timerSub = source.subscribe(val => this.tick(val));
    this.timerIsRunning = true;
    this.noSleep.enable();
    this.audioFinish.load();
    this.audioFinish.play();
    this.audioFinish.currentTime = 0
    this.audioFinish.pause();
  }

  continueTimer = () => {
    const source = interval(this.timerInterval);
    this.timerSub = source.subscribe(val => this.tick(val));
    this.timerIsRunning = true;
    this.noSleep.enable();
  }

  stopTimer = () => {
    this.timerSub.unsubscribe();
    this.timerIsRunning = false;
    this.noSleep.disable();
  }

  tick = (val: any) => {
    console.log('tick' + val);
    if (this.remainingSeconds > 0) {
      this.remainingSeconds -= 1;
    } else {
      this.playAudio();
      this.stopTimer();
    }

  }

  addTime = () => {
    this.totalMinutes += this.timeIncrements;
  }

  subtractTime = () => {
    if (this.totalMinutes < 10) {
      this.totalMinutes -= 1;
    } else {
      this.totalMinutes -= this.timeIncrements;
    }
  }

  calculateHeight = () => {
    console.log('total ' + this.totalSeconds + ' - remaining ' + this.remainingSeconds);
    return (95 * (this.remainingSeconds / this.totalSeconds)) + 'vh';
  }

  playAudio() {
    this.audioFinish.play();
  }


  floor = (value: any) => {
   return  Math.floor(value);
  }

}
