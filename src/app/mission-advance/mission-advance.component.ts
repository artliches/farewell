import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../random-number.service';
import { BUILDINGS, DEFENSE, SQUAD_LEADER, SQUAD_SIZE, TIME, WEATHER } from '../assets/missions.constants';
import { CommonModule } from '@angular/common';
import { SquadMakerComponent } from "../squad-maker/squad-maker.component";

@Component({
  selector: 'app-mission-advance',
  standalone: true,
  imports: [CommonModule, SquadMakerComponent],
  templateUrl: './mission-advance.component.html',
  styleUrl: './mission-advance.component.scss'
})
export class MissionAdvanceComponent implements OnInit, OnChanges {
  constructor(
    private random: RandomNumberService
  ) {}

  @Input() getNewMission: boolean = false;

  arrayIndexObj = {
    building: BUILDINGS,
    defense: DEFENSE,
    time: TIME,
    weather: WEATHER
  }; 

  situationObj: {
    building: string,
    defense: string,
    time: string,
    weather: string,
  } = {
    building: '',
    defense: '',
    time: '',
    weather: ''
  };

  squadSize: string = '';

  ngOnInit(): void {
      this.shuffleArrays();
      this.rerollAllLocationDetails();
      this.rerollSquadSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (!changes['getNewMission'].firstChange) {
        this.shuffleArrays();
        this.rerollAllLocationDetails();
        this.rerollSquadSize();
      }
  }

  rerollSquadSize() {
    let newIndex = SQUAD_SIZE.indexOf(this.squadSize);
    if (newIndex + 1 === SQUAD_SIZE.length) {
      newIndex = 0;
    } else {
      do {
        newIndex += 1;
      }
      while (SQUAD_SIZE[newIndex] === this.squadSize);
    }

    this.squadSize = SQUAD_SIZE[newIndex];
  }

  rerollAllLocationDetails() {
    for (const key of Object.keys(this.situationObj)) {
      this.rerollIndividualLocationDetail(key);
    }
  }

  rerollIndividualLocationDetail(key: string) {
    const keyIndex =
    key === 'building' ? 'building' :
    key === 'defense' ? 'defense' :
    key === 'time' ? 'time' :
    'weather';
    const arrayToRoll: string[] = this.arrayIndexObj[keyIndex];

    let newIndex = arrayToRoll.indexOf(this.situationObj[keyIndex]);
    if (newIndex + 1 === arrayToRoll.length) {
      newIndex = 0;
    } else {
      do {
        newIndex += 1;
      } while (
        arrayToRoll[newIndex] === this.situationObj[keyIndex]
      );
    }

    this.situationObj[keyIndex] = arrayToRoll[newIndex];
  }

  private shuffleArrays() {
    this.random.shuffleArray(BUILDINGS);
    this.random.shuffleArray(DEFENSE);
    this.random.shuffleArray(TIME);
    this.random.shuffleArray(WEATHER);
    this.random.shuffleArray(SQUAD_SIZE);
  }
}
