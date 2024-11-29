import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../random-number.service';
import { BUILDINGS, DEFENSE, SQUAD_LEADER, SQUAD_SIZE, TIME, WEATHER } from '../assets/missions.constants';
import { CommonModule } from '@angular/common';
import { SquadMakerComponent } from "../squad-maker/squad-maker.component";
import { SquadObj, LeaderGrvntSaveObj, MachineSaveObj, SituationObj } from '../grvnt-interfaces';

@Component({
  selector: 'app-mission-advance',
  standalone: true,
  imports: [CommonModule, SquadMakerComponent],
  templateUrl: './mission-advance.component.html',
  styleUrl: './mission-advance.component.scss'
})
export class MissionAdvanceComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private random: RandomNumberService
  ) {}

  @Input() getNewMission: boolean = false;
  @Input() situationSaveObj: SituationObj = {} as SituationObj;
  @Output() situationSaveObjEmitter: EventEmitter<any> = new EventEmitter();

  //squad-maker data
  @Input() squadSaveObj: SquadObj = {} as SquadObj;
  @Input() leaderAndAttachmentsArray: LeaderGrvntSaveObj[] = [];
  @Input() machineArray: MachineSaveObj[] = [];
  @Input() enemySize: string = '';
  @Output() squadSaveObjEmitter: EventEmitter<any> = new EventEmitter();
  @Output() leaderSaveObjEmitter: EventEmitter<any> = new EventEmitter();
  @Output() machineSaveObjEmitter: EventEmitter<any> = new EventEmitter();

  arrayIndexObj = {
    building: BUILDINGS,
    defense: DEFENSE,
    time: TIME,
    weather: WEATHER
  }; 

  situationObj: SituationObj = {
    building: '',
    defense: '',
    time: '',
    weather: ''
  };

  situationObjToEmit: SituationObj = {} as SituationObj;
  squadSaveObjToEmit: SquadObj = {} as SquadObj;
  leaderGrvntObjToEmit: LeaderGrvntSaveObj[] = [];
  machineObjToEmit: MachineSaveObj[] = [];

  ngOnInit(): void {
    if (Object.keys(this.situationSaveObj).length > 0) {
      this.situationObj = this.situationSaveObj;
      this.situationObjToEmit = this.situationSaveObj;
    } if(Object.keys(this.squadSaveObj).length > 0) {
      this.squadSaveObjToEmit = this.squadSaveObj;
    } else {
      this.shuffleArrays();
      this.rerollAllLocationDetails();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (!changes['getNewMission'].firstChange) {
        this.shuffleArrays();
        this.rerollAllLocationDetails();
      }
  }

  ngOnDestroy(): void {
      this.situationSaveObjEmitter.emit(this.situationObjToEmit);
      this.squadSaveObjEmitter.emit(this.squadSaveObjToEmit);
      this.leaderSaveObjEmitter.emit(this.leaderGrvntObjToEmit);
      this.machineSaveObjEmitter.emit(this.machineObjToEmit);
  }

  rerollSquadSize() {
    let newIndex = SQUAD_SIZE.indexOf(this.enemySize);
    if (newIndex + 1 === SQUAD_SIZE.length) {
      newIndex = 0;
    } else {
      do {
        newIndex += 1;
      }
      while (SQUAD_SIZE[newIndex] === this.enemySize);
    }

    this.enemySize = SQUAD_SIZE[newIndex];
    this.leaderAndAttachmentsArray = [];
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

    this.situationObjToEmit = this.situationObj;
  }

  private shuffleArrays() {
    this.random.shuffleArray(BUILDINGS);
    this.random.shuffleArray(DEFENSE);
    this.random.shuffleArray(TIME);
    this.random.shuffleArray(WEATHER);
    this.random.shuffleArray(SQUAD_SIZE);
  }

  emitSquadObj(saveObject: SquadObj) {
    this.squadSaveObjToEmit = saveObject;
  }

  emitLeaderObj(saveObject: LeaderGrvntSaveObj[]) {
    this.leaderGrvntObjToEmit = saveObject;
  }

  emitMachineObj(event: any) {
    this.machineObjToEmit = event;
  }
}
