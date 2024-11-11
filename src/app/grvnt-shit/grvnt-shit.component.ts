import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../random-number.service';
import { CARRY, PERSONAL, READINESS, WAR_SCROLLS } from '../assets/grvnts.constants';

@Component({
  selector: 'app-grvnt-shit',
  standalone: true,
  imports: [],
  templateUrl: './grvnt-shit.component.html',
  styleUrl: './grvnt-shit.component.scss'
})
export class GrvntShitComponent implements OnInit, OnChanges {
  @Input() presenceMod: number = 0;
  @Input() job: any;
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
  readyObj: {descrip: string, currIndex: number, tableIndex: number, presenceString: string} = {
    descrip: '',
    currIndex: -1,
    tableIndex: -1,
    presenceString: '',
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

  warScrolls: {descrip: string, currIndex: number, isFromReadiness?: boolean}[] = [];
  extrasArray: string[] = [];

  hasNothing: boolean = false;

  ngOnInit(): void {
      this.rollArrays();
      this.rerollAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['job']) {
      this.extrasArray = [];
      if (this.job.name === 'arcane medic') {
        this.extrasArray.push('Field Dress Kit');
        this.rerollWarScroll();
      }
    }
    if (changes['presenceMod'] && !changes['presenceMod'].firstChange) {
      // parse and replace the string if it exists
      if (this.readyObj.presenceString) {
        this.readyObj.descrip = this.parseAndReplaceNumberString(this.readyObj.presenceString);
      }
    }
  }

  rerollAll() {
    this.rerollCarry();
    if (!this.hasNothing) {
      this.rerollReady();
      this.rerollPersonal();
    }
  }

  rerollCarry(isSingleReroll?: boolean) {
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

    if (isSingleReroll) {
      if (this.carryObj.tableIndex + 1 <= 2) {
        this.hasNothing = true;
        this.readyObj = {
          descrip: '',
          currIndex: -1,
          tableIndex: -1,
          presenceString: '',
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
    let presenceString = '';
    if (newDescrip.includes('[')) {
      presenceString = newDescrip.includes('Presence') ? newDescrip : '';
      newDescrip = this.parseAndReplaceNumberString(newDescrip);
    }
    const tableIndex = this.readyTable.findIndex(search => search === newDescrip);

    if (newDescrip === 'War Scroll') {
      //get random warscroll
      this.rerollWarScroll(true);
    } else if (this.readyObj.descrip === 'War Scroll') {
      // remove old warscroll
      const scrollToRemoveIndex = this.warScrolls.findIndex(scroll => scroll.isFromReadiness);
      this.warScrolls.splice(scrollToRemoveIndex, 1);
    }

    this.readyObj = {
      descrip: newDescrip,
      currIndex: newIndex,
      tableIndex: tableIndex,
      presenceString: presenceString,
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

    this.random.shuffleArray(WAR_SCROLLS);
  }

  private parseAndReplaceNumberString(descrip: string): string {
      // parse and replace
      const firstBracketIndex = descrip.indexOf('[') + 1;
      const lastBracketIndex = descrip.indexOf(']');
      const stringToParse = descrip.slice(firstBracketIndex, lastBracketIndex);
      if (stringToParse.includes('Presence') && this.presenceMod !== -5) {
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

  rerollWarScroll(isFromReadiness?: boolean, index?: number) {
    if (this.warScrolls.length === 0) {
      //adding new warscroll
      this.warScrolls.push({
        descrip: WAR_SCROLLS[0],
        currIndex: 0,
        isFromReadiness: isFromReadiness
      });
    } else if (index !== undefined) {
      // get new existing scroll
      let newWarScrollIndex = this.warScrolls[index].currIndex;
      const isEndOfArray = newWarScrollIndex + 1 === WAR_SCROLLS.length

      if (isEndOfArray) {
        //remix array
        this.random.shuffleArray(WAR_SCROLLS);
      }
      let indexesToSkip: number[] = [];

      //grab indexes of scrolls based on current array
      this.warScrolls.forEach(scroll => {
        indexesToSkip.push(WAR_SCROLLS.indexOf(scroll.descrip));
      });

      if (isEndOfArray) {
        // count from the top
        for (let i = 0; i < WAR_SCROLLS.length; i++) {
          if (!indexesToSkip.includes(i)) {
            newWarScrollIndex = i;
            break;
          }
        }
      } else {
        //count from the last location
        do {
          newWarScrollIndex += 1;
        } while (
          indexesToSkip.includes(newWarScrollIndex)
        );
      }

      this.warScrolls[index] = {
        descrip: WAR_SCROLLS[newWarScrollIndex],
        currIndex: newWarScrollIndex,
        isFromReadiness: isFromReadiness
      }

    } else {
      // add a war scroll to existing list
      let newWarScrollIndex = -1;
      let indexesToSkip: number[] = [];

      //grab indexes of scrolls based on current array
      this.warScrolls.forEach(scroll => {
        indexesToSkip.push(WAR_SCROLLS.indexOf(scroll.descrip));
      });

      do {
        newWarScrollIndex += 1;
      } while (
        indexesToSkip.includes(newWarScrollIndex)
      );
      // might have to check if we hit the end of the array
      this.warScrolls.push({
        descrip: WAR_SCROLLS[newWarScrollIndex],
        currIndex: newWarScrollIndex,
        isFromReadiness: isFromReadiness
      });
    }
  }
}
