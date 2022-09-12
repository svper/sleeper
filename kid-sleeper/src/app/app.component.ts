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
  possibleImages = ['https://i.pinimg.com/736x/6d/d2/0d/6dd20dc6562db8781a116d89926b41fc.jpg']
  selectedBackgroundImage = this.possibleImages[0];
  totalMinutes = 20;
  totalSeconds = this.totalMinutes * 60;
  remainingSeconds = this.totalMinutes * 60;
  timeIncrements = 5;

  timerSub: Subscription = new Subscription();

  timerInterval:number = 1000; //1000 for true seconds, something else for testing

  timerIsRunning = false;

  noSleep:NoSleep= new NoSleep();

  constructor() {

  }

  startTimer = () => {
    const source = interval(this.timerInterval);
    this.totalSeconds = this.totalMinutes * 60;
    this.remainingSeconds = this.totalMinutes * 60;
    this.timerSub = source.subscribe(val => this.tick(val));
    this.timerIsRunning = true;
    this.noSleep.enable();
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
    console.log('tick'+val);
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
    this.totalMinutes -= this.timeIncrements;
  }

  calculateHeight = () => {
    console.log('total '+ this.totalSeconds + ' - remaining ' + this.remainingSeconds);
    return (90 * (this.remainingSeconds / this.totalSeconds )) + 'vh';
  }

  playAudio(){
    let audio = new Audio('../assets/Pup_Bedtime.mp3');;
    audio.load();
    audio.play();
  }

}
