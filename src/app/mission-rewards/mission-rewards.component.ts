import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { RandomNumberService } from '../random-number.service';
import { REWARDS } from '../assets/missions.constants';
import { RewardsObj } from '../grvnt-interfaces';

@Component({
  selector: 'app-mission-rewards',
  standalone: true,
  imports: [],
  templateUrl: './mission-rewards.component.html',
  styleUrl: './mission-rewards.component.scss'
})
export class MissionRewardsComponent implements OnInit, OnDestroy {
  constructor(
    private random: RandomNumberService
  ) {}

  @Input() rewardsSaveObj: RewardsObj = {} as RewardsObj;
  @Output() rewardsSaveObjEmitter: EventEmitter<any> = new EventEmitter();

  rewardsObjToEmit: RewardsObj = {} as RewardsObj
  rewardObj: RewardsObj = {
    slagg: -1,
    extras: {
      descrip: '',
      original: ''
    }
  };

  ngOnInit(): void {
    if (Object.keys(this.rewardsSaveObj).length > 0) {
      this.rewardObj = this.rewardsSaveObj;
      this.rewardsObjToEmit = this.rewardsSaveObj;
    } else {
      this.random.shuffleArray(REWARDS);
      this.rerollRewards();
      this.rewardObj.slagg = this.random.getRandomNumber(0, 5);
    }
  }

  ngOnDestroy(): void {
      this.rewardsSaveObjEmitter.emit(this.rewardsObjToEmit);
  }

  rerollSlagg() {
    const slaggArray = [0, 1, 2, 3, 4, 5];
    const newIndex = slaggArray.indexOf(this.rewardObj.slagg) + 1 === slaggArray.length ? 0 : slaggArray.indexOf(this.rewardObj.slagg) + 1;
    this.rewardObj.slagg = slaggArray[newIndex];
  }

  rerollRewards() {
    let newIndex = REWARDS.indexOf(this.rewardObj.extras.original);

    if (newIndex + 1 === REWARDS.length) {
      newIndex = 0;
    } else {
      do {
        newIndex++;
      } while (REWARDS[newIndex] === this.rewardObj.extras.original);
    }

    this.rewardObj.extras = {
      descrip: REWARDS[newIndex],
      original: REWARDS[newIndex],
    };

    if (this.rewardObj.extras.descrip.includes('[')) {
      const firstBracketIndex = this.rewardObj.extras.descrip.indexOf('[');
      const lastBracketIndex = this.rewardObj.extras.descrip.indexOf(']');
      const stringToReplace = this.rewardObj.extras.descrip.slice(firstBracketIndex, lastBracketIndex + 1);
      const numDieToRoll = Number(stringToReplace.slice(1, stringToReplace.indexOf('d')));
      const dieSize = Number(stringToReplace.slice(stringToReplace.indexOf('d') + 1, stringToReplace.length - 1));
      
      this.rewardObj.extras.descrip = this.rewardObj.extras.descrip.replace(
        stringToReplace, this.random.rollMultipleDie(numDieToRoll, dieSize).toString());
    }

    this.saveRewardsObj();
  }

  private saveRewardsObj() {
    this.rewardsObjToEmit = this.rewardObj;
  }
}
