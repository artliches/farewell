import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../random-number.service';
import { ARMOR, CARRY, FIREARMS, PERSONAL, READINESS, SIDEARMS, WAR_SCROLLS } from '../assets/grvnts.constants';
import { CommonModule } from '@angular/common';
import { AmmoObj, DescripIndexLimitObj, DescripIndexTableObj, DescripOriginalObj, ExtrasObj, ReadyObject, ShitObj, ShockTrackerObj, WarscrollObj } from '../grvnt-interfaces';

@Component({
  selector: 'app-grvnt-shit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grvnt-shit.component.html',
  styleUrl: './grvnt-shit.component.scss'
})
export class GrvntShitComponent implements OnInit, OnChanges {
  @Input() shitObj: ShitObj = {} as ShitObj;
  @Input() presenceMod: number = 0;
  @Input() job: any;
  @Input() shuffleAll: boolean = false;
  @Input() promoEquip: {show: boolean, descrip: string} = {
    show: false,
    descrip: ''
  };
  @Input() clearPromos: boolean = false;
  @Output() shitObjectEmitter: EventEmitter<any> = new EventEmitter();
  constructor(
    private random: RandomNumberService
  ) {}

  carryTable: any[] = [];
  carryObj: DescripIndexTableObj = {
    descrip: '',
    currIndex: -1,
    tableIndex: -1,
  };

  readyTable: any[] = [];
  readyObj: ReadyObject = {
    descrip: '',
    currIndex: -1,
    tableIndex: -1,
    presenceString: '',
  };
  readyObjFromMerit: DescripOriginalObj[] = [];

  personalTable: any[] =[];
  personalObj: DescripIndexTableObj = {
    descrip: '',
    currIndex: -1,
    tableIndex: -1,
  };

  ammoObj: AmmoObj = {
    descrip: 0,
    die: '',
  };

  armorTable: any[] = [];
  armorWithHelmet: boolean = false;
  armorObj: DescripIndexLimitObj = {
    descrip: '',
    currIndex: -1,
    limitNum: -1,
  };

  firearmsTable: any[] = [];
  firearmsObj: DescripIndexLimitObj = {
    descrip: '',
    currIndex: -1,
    limitNum: -1,
  };

  sidearmsTable: any[] = [];
  sidearmsObj: DescripIndexLimitObj = {
    descrip: '',
    currIndex: -1,
    limitNum: -1,
  };

  hasShock: boolean = false;
  shockObj: ShockTrackerObj = {
    carry: 0,
    ready: 0,
    personal: 0
  };

  warScrolls: WarscrollObj[] = [];
  extrasArray: ExtrasObj[] = [];

  hasNothing: boolean = false;
  nothingValue: number = 0;
  slagvarra: string[] = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.rollArrays();

      if (Object.keys(this.shitObj).length === 0) {
        this.rerollAll();

        this.saveAndEmitShitObject();

      } else {
        this.carryObj = this.shitObj.carryObj;
        this.firearmsObj = this.shitObj.firearmsObj ? this.shitObj.firearmsObj : {descrip: '', currIndex: -1, limitNum: -1,};
        this.ammoObj = this.shitObj.ammoObj ? this.shitObj.ammoObj : { descrip: 0, die: '',};
        this.sidearmsObj = this.shitObj.sidearmsObj ? this.shitObj.sidearmsObj : {descrip: '', currIndex: -1, limitNum: -1,};
        this.armorObj = this.shitObj.armorObj ? this.shitObj.armorObj : { descrip: '', currIndex: -1, limitNum: -1, };
        this.extrasArray = this.shitObj.extrasArray ? this.shitObj.extrasArray : [];
        this.personalObj = this.shitObj.personalObj ? this.shitObj.personalObj : {descrip: '', currIndex: -1, tableIndex: -1,};
        this.readyObj = this.shitObj.readyObj ? this.shitObj.readyObj : { descrip: '', currIndex: -1, tableIndex: -1, presenceString: '',};
        this.readyObjFromMerit = this.shitObj.readyObjFromMerit ? this.shitObj.readyObjFromMerit : [];
        this.slagvarra = this.shitObj.slagvarra ? this.shitObj.slagvarra : [];
        this.warScrolls = this.shitObj.warScrolls ? this.shitObj.warScrolls : [];
        this.shockObj = this.shitObj.shockObj ? this.shitObj.shockObj : {carry: 0, ready: 0, personal: 0};
        this.hasNothing = this.shitObj.hasNothing ? this.shitObj.hasNothing : false;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shuffleAll'] && !changes['shuffleAll'].firstChange) {
      this.rerollAll();
      this.saveAndEmitShitObject();
    }

    if (changes['job'] && changes['job'].firstChange) {
      if (this.job.startingGear.length > 0) {
        this.job.startingGear.forEach((gear: string | {descrip: string, presenceString: string}) => {

          if (typeof gear === 'object') {
            if (gear.presenceString) {
              gear.descrip = this.parseAndReplaceNumberString(gear.presenceString);
            }
            this.extrasArray.push(gear);
          } 
          else {
            this.extrasArray.push({
              descrip: gear
            });
          }
        });
      }
    }

    if (changes['job'] && !changes['job'].firstChange) {
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

      this.saveAndEmitShitObject();
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

    if (changes['promoEquip'] && !changes['promoEquip'].firstChange) {
      switch (true) {
        case this.promoEquip.descrip === 'war scroll': {
          this.slagvarra = [];
          this.rerollWarScroll(false, false, undefined, false, true);
          break;
        }
        case this.promoEquip.descrip === 'ready': {
          this.slagvarra = [];
          this.rerollReadyFromMerit();
          break;
        }
        case this.promoEquip.descrip === "A piece of SLAGVARRA": {
          this.slagvarra.push(`A piece of <strong class="underline">SLAGVARRA</strong>`)
          break;
        }
      }

      this.saveAndEmitShitObject();
    }

    if (changes['clearPromos'] && !changes['clearPromos'].firstChange) {
      this.promoEquip = {
        descrip: '',
        show: false
      };
      this.slagvarra = [];
      this.warScrolls = this.warScrolls.filter(scroll => !scroll.isFromPromo);
      this.readyObjFromMerit = [];

      this.saveAndEmitShitObject();
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

    this.saveAndEmitShitObject();
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
        if (this.armorObj.descrip.includes('Lobster') && this.warScrolls.some(scroll => scroll.isFromNothing)) {
          this.job.startingShit.forEach((shit: {key: string, value: string | number}) => {
            for (const [key, value] of Object.entries(shit)) {
              if (key === 'armor') {
                this.armorObj.limitNum = Number(value);
                this.rerollArmor(this.armorObj.limitNum);
              }
            }
          });
        }
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

    this.saveAndEmitShitObject();
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

    this.saveAndEmitShitObject();
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

    this.saveAndEmitShitObject();
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

    this.saveAndEmitShitObject();
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
        this.armorWithHelmet = false;
        this.armorObj = {
          descrip: `<strong class="underline">Tier 4 Lobster Armor</strong> (-d8 damage) <em>a misnomer, any deep water is deadly</em>`,
          currIndex: -1,
          limitNum: -1,
        }
        this.carryObj.descrip = `<strong>a set of lobster armor</strong>, a kick to the teeth, and <strong class="clickable">nothing</strong> to show for it - <em>kiss the world goodbye...</em>`
      }
    }
    this.saveAndEmitShitObject();
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

    this.saveAndEmitShitObject();
  }

  rerollReadyFromMerit(index?: number) {
    if (index !== undefined) {
      let newIndex = READINESS.indexOf(this.readyObjFromMerit[index].original);
      
      if (newIndex + 1 === READINESS.length) {
        newIndex = 0;
      } else {
        do {
          newIndex ++;
        } while (READINESS[newIndex] === this.readyObjFromMerit[index].original);
      }

      let objToPush = {
        descrip: READINESS[newIndex],
        original: READINESS[newIndex]
      };

      if (objToPush.descrip.includes('[')) {
        objToPush.descrip = this.parseAndReplaceNumberString(objToPush.descrip);
      }
  
      if (objToPush.descrip.includes('War Scroll')) {
        this.rerollWarScroll(false, false, undefined, false, true);
      } else if (this.readyObjFromMerit[index].original.includes('War Scroll')) {
        const scrollToRemoveIndex = this.warScrolls.findIndex(scroll => scroll.descrip === this.readyObjFromMerit[index].original);
        this.warScrolls.splice(scrollToRemoveIndex, 1);
      }
      //need to be able to remove warscroll
      this.readyObjFromMerit[index] = objToPush;

    } else {
      let objToPush: {
        descrip: string,
        original: string,
      } = {
        descrip: '',
        original: ''
      };
      let descripsToSkip = this.readyObjFromMerit.map(gear => gear.original);
      let newIndex = -1;
      if (descripsToSkip) {
        do {
          newIndex ++;
        } while (descripsToSkip.some(descrip => descrip === READINESS[newIndex]));
      }
  
      objToPush = {
        descrip: READINESS[newIndex],
        original: READINESS[newIndex]
      };
  
      if (objToPush.descrip.includes('[')) {
        objToPush.descrip = this.parseAndReplaceNumberString(objToPush.descrip);
      }
  
      if (objToPush.descrip.includes('War Scroll')) {
        this.rerollWarScroll(false, false, undefined, false, true);
      }
  
      this.readyObjFromMerit.push(objToPush);
    }
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

    this.saveAndEmitShitObject();
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
    isFromClass?: boolean,
    isFromPromo?: boolean,
  ) {
    if (this.warScrolls.length === 0) {
      //adding new warscroll
      this.warScrolls.push({
        descrip: WAR_SCROLLS[0],
        currIndex: 0,
        isFromReadiness: isFromReadiness,
        isFromNothing: isFromNothing,
        isFromClass: isFromClass,
        isFromPromo: isFromPromo
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
        isFromPromo: isFromPromo
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
        isFromPromo: isFromPromo
      });
    }

    this.saveAndEmitShitObject();
  }

  private saveAndEmitShitObject() {
    this.shitObj = {
      carryObj: this.carryObj,
      firearmsObj: this.firearmsObj,
      ammoObj: this.ammoObj,
      sidearmsObj: this.sidearmsObj,
      armorObj: this.armorObj,
      extrasArray: this.extrasArray,
      personalObj: this.personalObj,
      readyObj: this.readyObj,
      readyObjFromMerit: this.readyObjFromMerit,
      slagvarra: this.slagvarra,
      warScrolls: this.warScrolls,
      shockObj: this.shockObj,
      hasNothing: this.hasNothing,
    };
    this.shitObjectEmitter.emit(this.shitObj);
  }
}
