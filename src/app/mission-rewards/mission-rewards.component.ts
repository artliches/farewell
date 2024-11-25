import { Component, OnInit } from '@angular/core';
import { RandomNumberService } from '../random-number.service';
import { REWARDS } from '../assets/missions.constants';

@Component({
  selector: 'app-mission-rewards',
  standalone: true,
  imports: [],
  templateUrl: './mission-rewards.component.html',
  styleUrl: './mission-rewards.component.scss'
})
export class MissionRewardsComponent implements OnInit {
  constructor(
    private random: RandomNumberService
  ) {}

  rewardObj: {descrip: string, original: string} = {
    descrip: '',
    original: ''
  };

  ngOnInit(): void {
      this.random.shuffleArray(REWARDS);

      this.rerollRewards();
  }

  rerollRewards() {
    let newIndex = REWARDS.indexOf(this.rewardObj.original);

    if (newIndex + 1 === REWARDS.length) {
      newIndex = 0;
    } else {
      do {
        newIndex++;
      } while (REWARDS[newIndex] === this.rewardObj.original);
    }

    this.rewardObj = {
      descrip: REWARDS[newIndex],
      original: REWARDS[newIndex],
    };

    if (this.rewardObj.descrip.includes('[')) {
      const firstBracketIndex = this.rewardObj.descrip.indexOf('[');
      const lastBracketIndex = this.rewardObj.descrip.indexOf(']');
      const stringToReplace = this.rewardObj.descrip.slice(firstBracketIndex, lastBracketIndex + 1);
      const numDieToRoll = Number(stringToReplace.slice(1, stringToReplace.indexOf('d')));
      const dieSize = Number(stringToReplace.slice(stringToReplace.indexOf('d') + 1, stringToReplace.length - 1));
      
      this.rewardObj.descrip = this.rewardObj.descrip.replace(
        stringToReplace, this.random.rollMultipleDie(numDieToRoll, dieSize).toString());
    }
  }
}
