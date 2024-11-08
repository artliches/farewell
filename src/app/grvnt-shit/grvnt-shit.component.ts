import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../random-number.service';
import { CARRY, PERSONAL, READINESS } from '../assets/grvnts.constants';

@Component({
  selector: 'app-grvnt-shit',
  standalone: true,
  imports: [],
  templateUrl: './grvnt-shit.component.html',
  styleUrl: './grvnt-shit.component.scss'
})
export class GrvntShitComponent implements OnChanges {
  @Input() presenceMod: number = 0;
  constructor(
    private random: RandomNumberService
  ) {}

  carryTable: any[] = [];
  carryObj: {descrip: string, currIndex: number, tableIndex: number} = {
    descrip: '',
    currIndex: -1,
    tableIndex: -1,
  };

  readyTable: any[] = [];
  readyObj: {descrip: string, currIndex: number, tableIndex: number} = {
    descrip: '',
    currIndex: -1,
    tableIndex: -1,
  };

  personalTable: any[] =[];
  personalObj: {descrip: string, currIndex: number, tableIndex: number} = {
    descrip: '',
    currIndex: -1,
    tableIndex: -1,
  };

  hasShock: boolean = false;
  shockObj: {carry: number, ready: number, personal: number} = {
    carry: 0,
    ready: 0,
    personal: 0
  };

  hasNothing: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['presenceMod'].firstChange) {
      this.rollArrays();
      this.rerollAll();
    }
  }

  rerollAll() {
    this.rerollCarry();
    if (!this.hasNothing) {
      this.rerollReady();
      this.rerollPersonal();
    }
  }

  rerollCarry() {
    let newIndex;
    const isEndOfArray = this.carryObj.currIndex + 1 === CARRY.length;

    if (isEndOfArray) {
      this.random.shuffleArray(CARRY);
      newIndex = 0;
    } else {
      newIndex = this.carryObj.currIndex + 1;
    }

    const tableIndex = this.carryTable.findIndex(search => search === CARRY[newIndex]);

    this.carryObj = {
      descrip: CARRY[newIndex],
      currIndex: newIndex,
      tableIndex: tableIndex,
    };

    if (this.carryObj.tableIndex + 1 <= 2) {
      this.hasNothing = true;
      this.readyObj = {
        descrip: '',
        currIndex: -1,
        tableIndex: -1,
      };
      this.personalObj = {
        descrip: '',
        currIndex: -1,
        tableIndex: -1,
      };
    } else {
      this.hasNothing = false;
      if (this.readyObj.descrip === '' && this.personalObj.descrip === '') {
        this.rerollReady();
        this.rerollPersonal();
      }
      this.shockObj.carry = this.carryObj.tableIndex + 1;
      this.hasShock = this.checkForShock();
    }
  }

  rerollReady() {
    let newIndex;
    const isEndOfArray = this.readyObj.currIndex + 1 === READINESS.length;

    if (isEndOfArray) {
      this.random.shuffleArray(READINESS);
      newIndex = 0;
    } else {
      newIndex = this.readyObj.currIndex + 1;
    }

    let newDescrip = READINESS[newIndex];
    if (newDescrip.includes('[')) {
      newDescrip = this.parseAndReplaceNumberString(newDescrip);
    }
    const tableIndex = this.readyTable.findIndex(search => search === newDescrip);

    this.readyObj = {
      descrip: newDescrip,
      currIndex: newIndex,
      tableIndex: tableIndex,
    };

    this.shockObj.ready = this.readyObj.tableIndex + 1;
    this.hasShock = this.checkForShock();
  }

  rerollPersonal() {
    let newIndex;
    const isEndOfArray = this.personalObj.currIndex + 1 === PERSONAL.length;

    if (isEndOfArray) {
      this.random.shuffleArray(PERSONAL);
      newIndex = 0;
    } else {
      newIndex = this.personalObj.currIndex + 1;
    }

    let newDescrip = PERSONAL[newIndex];
    if (newDescrip.includes('[')) {
      newDescrip = this.parseAndReplaceNumberString(newDescrip);
    }
    const tableIndex = this.personalTable.findIndex(search => search === newDescrip);

    this.personalObj = {
      descrip: newDescrip,
      currIndex: newIndex,
      tableIndex: tableIndex,
    };

    this.shockObj.personal = this.personalObj.tableIndex + 1;
    this.hasShock = this.checkForShock();
  }

  private checkForShock(): boolean {
    let shockValue = 0;
    for (const [key, value] of Object.entries(this.shockObj)) {
      shockValue += value;
    }
    return shockValue >= 20;
  }

  private rollArrays() {
    this.carryTable = JSON.parse(JSON.stringify(CARRY));
    this.random.shuffleArray(CARRY);
    
    this.readyTable = JSON.parse(JSON.stringify(READINESS));
    this.random.shuffleArray(READINESS);
    
    this.personalTable = JSON.parse(JSON.stringify(PERSONAL));
    this.random.shuffleArray(PERSONAL);
  }

  private parseAndReplaceNumberString(descrip: string): string {
      // parse and replace
      const firstBracketIndex = descrip.indexOf('[') + 1;
      const lastBracketIndex = descrip.indexOf(']');
      const stringToParse = descrip.slice(firstBracketIndex, lastBracketIndex);
      if (stringToParse.includes('Presence')) {
        const modNumber = stringToParse.slice(
          stringToParse.indexOf('+')+1
        );
        const presenceModification = this.presenceMod + Number(modNumber);

        return descrip.replace(`[${stringToParse}]`, presenceModification.toString());
      } else {
      const die = descrip.slice(firstBracketIndex, descrip.indexOf(']'));
      const dieSize = die.slice(die.indexOf('d')+1);

      return descrip.replace(`[d${dieSize}]`, this.random.getRandomNumber(1, Number(dieSize)).toString());
      }
  }
}
