import { Component } from '@angular/core';
import { interval, Observable, Subscription, timer } from 'rxjs';

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
  remainingSeconds = 0;
  timeIncrements = 5;

  timerSub: Subscription = new Subscription();

  constructor() {

  }

  startTimer = () => {
    const source = interval(50);
    //output: 0

    this.remainingSeconds = this.totalMinutes * 60;
    this.timerSub = source.subscribe(val => this.tick(val));
  }

  stopTimer = () => {
    this.timerSub.unsubscribe();
  }

  tick = (val: any) => {
    console.log('tick'+val);
    if (this.remainingSeconds > 0) {
      this.remainingSeconds -= 1;
    } else {
      //play sound
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

}
