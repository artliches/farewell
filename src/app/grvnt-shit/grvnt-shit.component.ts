import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../random-number.service';
import { ARMOR, CARRY, FIREARMS, PERSONAL, READINESS, SIDEARMS, WAR_SCROLLS } from '../assets/grvnts.constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grvnt-shit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grvnt-shit.component.html',
  styleUrl: './grvnt-shit.component.scss'
})
export class GrvntShitComponent implements OnInit, OnChanges {
  @Input() presenceMod: number = 0;
  @Input() job: any;
  @Input() shuffleAll: boolean = false;
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

  ammoObj: {descrip: number, die: string} = {
    descrip: 0,
    die: '',
  };

  armorTable: any[] = [];
  armorWithHelmet: boolean = false;
  armorObj: {descrip: string, currIndex: number, limitNum: number} = {
    descrip: '',
    currIndex: -1,
    limitNum: -1,
  };

  firearmsTable: any[] = [];
  firearmsObj: {descrip: string, currIndex: number, limitNum: number} = {
    descrip: '',
    currIndex: -1,
    limitNum: -1,
  };

  sidearmsTable: any[] = [];
  sidearmsObj: {descrip: string, currIndex: number, limitNum: number} = {
    descrip: '',
    currIndex: -1,
    limitNum: -1,
  };

  hasShock: boolean = false;
  shockObj: {carry: number, ready: number, personal: number} = {
    carry: 0,
    ready: 0,
    personal: 0
  };

  warScrolls: 
    {
      descrip: string,
      currIndex: number,
      isFromReadiness?: boolean,
      isFromNothing?: boolean,
      isFromClass?: boolean,
    }[] = [];
  extrasArray: {descrip: string, presenceString?: string}[] = [];

  hasNothing: boolean = false;
  nothingValue: number = 0;

  ngOnInit(): void {
    setTimeout(() => {
      this.rollArrays();
      this.rerollAll();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shuffleAll'] && !changes['shuffleAll'].firstChange) {
      this.rerollAll();
    }

    if (changes['job']) {
      this.extrasArray = [];
      if (changes['job'].previousValue) {
        const previousJobHadScroll = 
          changes['job'].previousValue.name === 'arcane medic' || 
          changes['job'].previousValue.name === 'despondent interpreter' ||
          changes['job'].previousValue.name === 'cynically cursed chaplain';
        if (previousJobHadScroll) {
          this.warScrolls = this.warScrolls.filter(scroll => !scroll.isFromClass);
        }

        this.firearmsObj = {
          descrip: '',
          currIndex: -1,
          limitNum: -1,
        };
        this.armorObj = {
          descrip: '',
          currIndex: -1,
          limitNum: -1,
        };
        this.sidearmsObj = {
          descrip: '',
          currIndex: -1,
          limitNum: -1,
        };

        if (this.job.startingShit.length > 0) {
          this.getStartingShit();
        }
        this.rerollAmmo();
      }

      if (this.job.startingGear.length > 0) {
        this.job.startingGear.forEach((gear: string | {descrip: string, presenceString: string}) => {
          if (typeof gear === 'object') {
            if (gear.presenceString) {
              gear.descrip = this.parseAndReplaceNumberString(gear.presenceString);
            }
            this.extrasArray.push(gear);
          } else if (gear === 'war scroll') {
            this.rerollWarScroll(false, false, undefined, true);
          } else {
            this.extrasArray.push({
              descrip: gear
            });
          }
        });
      }
    }

    if (changes['presenceMod'] && !changes['presenceMod'].firstChange) {
      // parse and replace the string if it exists
      if (this.readyObj.presenceString) {
        this.readyObj.descrip = this.parseAndReplaceNumberString(this.readyObj.presenceString);
      }
      this.extrasArray.forEach((extra, index) => {
        if (extra.presenceString && extra.presenceString.includes('Presence')) {
          this.extrasArray[index].descrip = this.parseAndReplaceNumberString(extra.presenceString);
        }
      }) 
    }
  }

  private getStartingShit() {
    this.job.startingShit.forEach((shit: {key: string, value: string | number}) => {
      for (const [key, value] of Object.entries(shit)) {
        switch (true) {
          case key === 'firearms': {
            if (isNaN(Number(value))) {
              const newDescrip = value.toString();
              this.firearmsObj = {
                descrip: newDescrip,
                currIndex: -1,
                limitNum: -1,
              }
            } else {
              this.firearmsObj.limitNum = Number(value);
              this.rerollFirearms(this.firearmsObj.limitNum);
            }
            break;
          }
          case key === 'armor': {
            //get armor as normal
            this.armorObj.limitNum = Number(value);
            this.rerollArmor(this.armorObj.limitNum);
            //check for nothing
            if (this.hasNothing) {
              this.getNothingGear();
            }
            break;
          }
          case key === 'sidearm': {
            if (isNaN(Number(value))) {
              const newDescrip = value;
              this.sidearmsObj = {
                descrip: newDescrip.toString(),
                currIndex: -1,
                limitNum: -1
              };
            } else {
              this.sidearmsObj.limitNum = Number(value);
              this.rerollSidearm(this.sidearmsObj.limitNum);
            }

            break;
          }
          case key === 'warscroll': {
            if (this.warScrolls.some(scroll => scroll.isFromClass)) {
              do {
                const scrollToRemoveIndex = this.warScrolls.findIndex(scroll => scroll.isFromClass);
                this.warScrolls.splice(scrollToRemoveIndex, 1);
              } while (this.warScrolls.some(scroll => scroll.isFromClass));
            }
            this.random.shuffleArray(WAR_SCROLLS);
            for (let i = 0; i < Number(value); i++) {
              this.rerollWarScroll(false, false, undefined, true);
            }
            break;
          }
          default: {
            break;
          }
        }
      }
    });
  }

  rerollAll() {
    this.removeNothingScroll();
    this.removeReadinessScroll();
    this.rerollCarry();
    if (this.job && this.job.startingShit.length > 0) {
      this.getStartingShit();
    }
    this.rerollAmmo();
    
    if (!this.hasNothing) {
      this.rerollReady();
      this.rerollPersonal();
    }
  }

   rerollAmmo() {
    this.ammoObj = {
      descrip: 0,
      die: ''
    };
    if (this.job && this.job.stats.some((stat: { name: string; }) => stat.name === 'ammo')) {
      const ammoMod = this.job.stats[this.job.stats.findIndex((stat: { name: string; }) => stat.name === 'ammo')].mod;
      this.ammoObj = {
        descrip: this.random.getRandomNumber(1, ammoMod),
        die: `d${ammoMod}`
      };
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
        this.getNothingGear();
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
        this.removeNothingScroll();
        if (this.armorObj.descrip.includes('Lobster')) {
          this.armorObj = {
            descrip: '',
            currIndex: -1,
            limitNum: -1,
          };
          this.job.startingShit.forEach((shit: {key: string, value: string | number}) => {
            for (const [key, value] of Object.entries(shit)) {
              if (key === 'armor') {
                this.armorObj.limitNum = Number(value);
                this.rerollArmor(this.armorObj.limitNum);
              }
            }
          });
        }
        if (this.readyObj.descrip === '' && this.personalObj.descrip === '') {
          this.rerollReady();
          this.rerollPersonal();
        }
      }
    } else {
      if (this.carryObj.tableIndex + 1 <= 2) {
        this.getNothingGear();
      } else {
        this.hasNothing = false;
      }
    }
    this.shockObj.carry = this.carryObj.tableIndex + 1;
    this.hasShock = this.checkForShock();
  }

  rerollFirearms(modNumber: number) {
    let newIndex;
    const firearmsTableToRoll = this.random.shuffleArray(JSON.parse(JSON.stringify(this.firearmsTable)).splice(0, modNumber));
    const isEndOfArray = this.firearmsObj.currIndex + 1 === firearmsTableToRoll.length;

    if (isEndOfArray) {
      this.random.shuffleArray(firearmsTableToRoll);
      newIndex = 0;
    } else {
      newIndex = this.firearmsObj.currIndex + 1;
    }

    const newDescrip = firearmsTableToRoll[newIndex];

    this.firearmsObj = {
      descrip: newDescrip,
      currIndex: newIndex,
      limitNum: modNumber,
    };
  }

  rerollSidearm(modNumber: number) {
    let newIndex;
    const sidearmsTableToRoll = this.random.shuffleArray(JSON.parse(JSON.stringify(this.sidearmsTable)).splice(0, modNumber));
    const isEndOfArray = this.sidearmsObj.currIndex + 1 === sidearmsTableToRoll.length;

    if (isEndOfArray) {
      this.random.shuffleArray(sidearmsTableToRoll);
      newIndex = 0;
    } else {
      newIndex = this.sidearmsObj.currIndex + 1;
    }

    let newDescrip = sidearmsTableToRoll[newIndex];
    if (newDescrip.includes('[')) {
      newDescrip = this.parseAndReplaceNumberString(newDescrip);
    }
    this.sidearmsObj = {
      descrip: newDescrip,
      currIndex: newIndex,
      limitNum: modNumber,
    };
  }

  rerollArmor(modNumber: number) {
    let newIndex;
    const armorTableToRoll = this.random.shuffleArray(JSON.parse(JSON.stringify(this.armorTable)).splice(0, modNumber));
    const isEndOfArray = this.armorObj.currIndex + 1 === armorTableToRoll.length;

    if (isEndOfArray) {
      this.random.shuffleArray(armorTableToRoll);
      newIndex = 0;
    } else {
      newIndex = this.armorObj.currIndex + 1;
    }

    const newDescrip = armorTableToRoll[newIndex];

    this.armorObj = {
      descrip: newDescrip,
      currIndex: newIndex,
      limitNum: modNumber,
    };

    this.armorWithHelmet = this.armorObj.descrip.includes('helmet');
  }

  private removeReadinessScroll() {
    if (this.warScrolls.some(scroll => scroll.isFromReadiness)) {
      const scrollToRemoveIndex = this.warScrolls.findIndex(scroll => scroll.isFromReadiness);
      this.warScrolls.splice(scrollToRemoveIndex, 1);
    }
  }

  private removeNothingScroll() {
    if (this.warScrolls.some(scroll => scroll.isFromNothing)) {
      const scrollToRemoveIndex = this.warScrolls.findIndex(scroll => scroll.isFromNothing);
      this.warScrolls.splice(scrollToRemoveIndex, 1);
    }
  }

  private getNothingGear() {
    this.removeNothingScroll();
    this.removeReadinessScroll();
    this.hasNothing = true;
    this.shockObj.personal = 0;
    this.shockObj.ready = 0;
    if (this.job.name === 'altered mercenary') {
        this.rerollWarScroll(false, true);
        this.carryObj.descrip = `a <strong>warscroll</strong> and <strong class="clickable">nothing</strong> to carry it in - <em>kiss your mom goodbye</em>.`
    } else {
      this.nothingValue = this.random.getRandomNumber(1, 6);
      if (this.nothingValue <= 4) {
        this.rerollWarScroll(false, true);
        this.carryObj.descrip = `a <strong>warscroll</strong> and <strong class="clickable">nothing</strong> to carry it in - <em>kiss your mom goodbye</em>.`
      } else {
        this.armorObj = {
          descrip: `<strong class="underline">Tier 4 Lobster Armor</strong> (-d8 damage) <em>a misnomer, any deep water is deadly</em>`,
          currIndex: -1,
          limitNum: -1,
        }
        this.carryObj.descrip = `<strong>a set of lobster armor</strong>, a kick to the teeth, and <strong class="clickable">nothing</strong> to show for it - <em>kiss the world goodbye...</em>`
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
    if (
      (this.extrasArray.length > 0 && this.extrasArray.some(extra => extra.presenceString)) &&
      newDescrip.includes('Field Dress Kit')
    ) {
      if (newIndex + 1 === READINESS.length) {
        this.random.shuffleArray(READINESS);
        newIndex = 0;
      }
      do {
        newIndex += 1;
      } while (READINESS[newIndex].includes('Presence'));
      newDescrip = READINESS[newIndex];
    }
    let presenceString = '';
    if (newDescrip.includes('[')) {
      presenceString = newDescrip.includes('Presence') ? newDescrip : '';
      newDescrip = this.parseAndReplaceNumberString(newDescrip);
    }
    const tableIndex = this.readyTable.findIndex(search => search === newDescrip);

    if (newDescrip.includes('War Scroll')) {
      //get random warscroll
      this.rerollWarScroll(true);
    } else if (this.readyObj.descrip.includes('War Scroll')) {
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
    for (const value of Object.values(this.shockObj)) {
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

    this.armorTable = JSON.parse(JSON.stringify(ARMOR));
    this.firearmsTable = JSON.parse(JSON.stringify(FIREARMS));
    this.sidearmsTable = JSON.parse(JSON.stringify(SIDEARMS));
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

  rerollWarScroll(
    isFromReadiness?: boolean,
    isFromNothing?: boolean,
    index?: number | undefined,
    isFromClass?: boolean
  ) {
    if (this.warScrolls.length === 0) {
      //adding new warscroll
      this.warScrolls.push({
        descrip: WAR_SCROLLS[0],
        currIndex: 0,
        isFromReadiness: isFromReadiness,
        isFromNothing: isFromNothing,
        isFromClass: isFromClass,
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
        isFromReadiness: isFromReadiness,
        isFromNothing: isFromNothing,
        isFromClass: isFromClass,
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
        isFromReadiness: isFromReadiness,
        isFromNothing: isFromNothing,
        isFromClass: isFromClass,
      });
    }
  }
}
