import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ARMOR, FIREARMS, SIDEARMS, NICKNAMES, EMBEDDED_NAMES, WAR_SCROLLS, SCARS } from '../../assets/grvnts.constants';
import { LEADERS } from '../../assets/squads.constants';
import { RandomNumberService } from '../../random-number.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leader-maker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leader-maker.component.html',
  styleUrl: './leader-maker.component.scss'
})
export class LeaderMakerComponent implements OnInit, OnChanges {
  constructor(
    private random: RandomNumberService
  ) {}

  @Input() title: string = 'SQUAD LEADER';
  @Input() rerollGrvnt: boolean = false;

  leaderObj: {
    name: string,
    specialitiesObj: {
      specialities: string[],
      chosenSpeciality: string,
      original: string,
    },
    special: string,
    stats: {
      name: string,
      mod: number,
    }[],
    startingShit: Array<any>
  } = {
    name: '',
    specialitiesObj: {
      specialities: [],
      chosenSpeciality: '',
      original: '',
    },
    special: '',
    stats: [],
    startingShit: []
  };

  ammoObj: {value: number, die: string} = {
    value: -1,
    die: ''
  };

  hpObj: {value: number, die: string} = {
    value: -1,
    die: ''
  };

  embeddedNameObj: {first: string, middle: string, last: string} = {
    first: '',
    middle: '',
    last: ''
  };
  
  nickname: string = '';

  armorLimitNum: number = -1;
  orderedArmorTable: any[] = [];
  randomArmorTable: any[] = [];
  armorWithHelmet: boolean = false;
  armorObj: {descrip: string, currIndex: number, limitNum: number} = {
    descrip: '',
    currIndex: -1,
    limitNum: -1,
  };

  firearmLimitNum: number = -1;
  orderedFirearmsTable: any[] = [];
  randomFirearmsTable: any[] = [];
  firearmsObj: {descrip: string, currIndex: number, limitNum: number} = {
    descrip: '',
    currIndex: -1,
    limitNum: -1,
  };

  orderedSidearmsTable: any[] = [];
  randomSidearmsTable: any[] = [];
  sidearmsObj: {descrip: string, currIndex: number, limitNum: number} = {
    descrip: '',
    currIndex: -1,
    limitNum: -1,
  };

  warScrollObj: {descrip: string, currIndex: number}[] = [];
  scarObj: {descrip: string, original: string} = {
    descrip: '',
    original: ''
  };
  shockObj: {value: number, effect: string} = {
    value: 0,
    effect: ''
  };

  ngOnInit(): void {
    this.random.shuffleArray(LEADERS);
    this.orderedArmorTable = JSON.parse(JSON.stringify(ARMOR));
    this.orderedFirearmsTable = JSON.parse(JSON.stringify(FIREARMS));
    this.orderedSidearmsTable = JSON.parse(JSON.stringify(SIDEARMS));
    this.random.shuffleArray(NICKNAMES);
    for (let i = 0; i < EMBEDDED_NAMES.length; i++) {
      this.random.shuffleArray(EMBEDDED_NAMES[i]);
    }
    this.random.shuffleArray(WAR_SCROLLS);
    this.random.shuffleArray(SCARS);
    //get a squad leader
    this.rerollSquadLeader();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['rerollGrvnt'] && !changes['rerollGrvnt'].firstChange) {
        this.rerollSquadLeader();
      }
  }

  rerollSquadLeader() {
    this.armorObj = {
      descrip: '',
      currIndex: -1,
      limitNum: -1
    };
    this.armorWithHelmet = false;

    this.firearmsObj = {
      descrip: '',
      currIndex: -1,
      limitNum: -1
    };

    this.sidearmsObj = {
      descrip: '',
      currIndex: -1,
      limitNum: -1
    };

    this.warScrollObj = [];

    let newIndex = LEADERS.findIndex(leader => leader.name === this.leaderObj.name);

    if (newIndex + 1 === LEADERS.length) {
      newIndex = 0;
    } else {
      do {
        newIndex++;
      }
      while (LEADERS[newIndex].name === this.leaderObj.name);
    }

    for (const [key, value] of Object.entries(LEADERS[newIndex])) {
      if (key === 'specialities') {
        this.leaderObj.specialitiesObj.specialities = this.random.shuffleArray(value);
      } else {
        this.leaderObj[key as keyof typeof this.leaderObj] = value;
      }
    }
    
    this.rerollNickname();
    this.rerollSpecialities();
    this.rerollHP();
    this.rerollAmmo();
    this.getInitialArmor();
    this.getInitialFirearm();
    this.getInitialSidearm();
    this.getInitialWarscrolls();

    this.rerollScars();
    this.getInitialShock();
  }

  private getInitialArmor() {
    if (this.leaderObj.startingShit.find(shit => shit.armor)) {
      this.armorLimitNum = this.leaderObj.startingShit.find(shit => shit.armor).armor;
      this.randomArmorTable = this.random.shuffleArray(JSON.parse(JSON.stringify(this.orderedArmorTable)).splice(0, this.armorLimitNum));

      this.rerollArmor(this.armorLimitNum);
    }
  }

  private getInitialFirearm() {
    if (this.leaderObj.startingShit.find(shit => shit.firearms)) {
      if (isNaN(this.leaderObj.startingShit.find(shit => shit.firearms).firearms)) {
        this.firearmsObj = {
          descrip: this.leaderObj.startingShit.find(shit => shit.firearms).firearms,
          currIndex: -1,
          limitNum: -1,
        };
      } else {
        this.firearmLimitNum = this.leaderObj.startingShit.find(shit => shit.firearms).firearms;
        this.randomFirearmsTable = this.random.shuffleArray(JSON.parse(JSON.stringify(this.orderedFirearmsTable)).splice(0, this.firearmLimitNum));

        this.rerollFireArms(this.firearmLimitNum);
      }
    }
  }

  private getInitialSidearm() {
    const sidearm = this.leaderObj.startingShit.find(shit => shit.sidearm);
    if (sidearm) {
      if (isNaN(sidearm.sidearm)) {
        this.sidearmsObj = {
          descrip: sidearm.sidearm,
          currIndex: -1,
          limitNum: -1
        };
      } else {
        this.randomSidearmsTable = this.random.shuffleArray(JSON.parse(JSON.stringify(this.orderedSidearmsTable)).splice(0, sidearm.sidearm));

        this.rerollSidearms(sidearm.sidearm);
      }
    }
  }

  private getInitialWarscrolls() {
    const warscrolls = this.leaderObj.startingShit.find(shit => shit.warscroll);
    if (warscrolls) {
      let loopNum = 0;
      do {
        this.rerollWarScroll();
        loopNum++;
      } while (loopNum !== warscrolls.warscroll);
    }
  }

  private getInitialShock() {
    this.shockObj.value = this.random.getRandomNumber(1, 2);
    this.shockObj.effect = this.shockObj.value === 1 ?
      `<strong class="underline">THE SHAKES.</strong> Always have last initiative` :
      `<strong class="underline">PRIMAL FEAR.</strong> Next <strong>SHOCK</strong> roll is d6`;
  }

  rerollShock() {
    this.shockObj.value = this.shockObj.value === 2 ? 1 : 2;
    this.shockObj.effect = this.shockObj.value === 1 ?
      `<strong class="underline">THE SHAKES.</strong> Always have last initiative` :
      `<strong class="underline">PRIMAL FEAR.</strong> Next <strong>SHOCK</strong> roll is d6`;
  }

  rerollScars() {
    let newIndex = SCARS.indexOf(this.scarObj.original);

    if (newIndex + 1 === SCARS.length) {
      newIndex = 0;
    } else {
      do {
        newIndex ++;
      } while (SCARS[newIndex] === this.scarObj.original);
    }

    this.scarObj = {
      descrip: SCARS[newIndex],
      original: SCARS[newIndex],
    };


    if (this.scarObj.original.includes('knees') || this.scarObj.original.includes('headaches')) {
      this.scarObj.descrip = this.scarObj.original.replace('you', 'them');
    } else if (this.scarObj.original.includes('your')) {
      this.scarObj.descrip = this.scarObj.original.replace('your', 'their');
    } else if (this.scarObj.original.includes('you') || this.scarObj.original.includes('You')) {
      if (this.scarObj.original.includes('You')) {
        this.scarObj.descrip = this.scarObj.original.replace('You', 'They');
      } else {
        this.scarObj.descrip = this.scarObj.original.replace('you', 'they');
      }
    }

    if (this.scarObj.original.includes('[d6]')) {
      this.scarObj.descrip = this.scarObj.original.replace('[d6]', this.random.getRandomNumber(1, 6).toString());
    } else if (this.scarObj.original.includes('infected')) {
      const hand = this.random.getRandomNumber(1, 2) === 1 ? 'left' : 'right';
      const finger = this.getFinger(this.random.getRandomNumber(1, 4));

      this.scarObj.descrip = this.scarObj.original.replace('[d4]', finger);
      this.scarObj.descrip = this.scarObj.descrip.replace('[d2]', hand);
    } 
  }

  nextWordGrammer(nextSentence: string) {
    if (nextSentence.match("\\d")) {
      return '';
    }
    return nextSentence.match('^[aieoAIEO].*') ? 'an' : 'a';
  }

  private getFinger(fingerIndex: number) {
    switch (true) {
      case fingerIndex === 1: {
        return 'pointer';
      }
      case fingerIndex === 2: {
        return 'middle';
      }
      case fingerIndex === 3: {
        return 'ring';
      }
      case fingerIndex === 4: {
        return 'little';
      }
      default: {
        return 'null';
      }
    }
  }

  rerollWarScroll(index?: number) {
    //add new warscroll to empy list
    if (this.warScrollObj.length === 0) {
      this.warScrollObj.push({
        descrip: WAR_SCROLLS[0],
        currIndex: 0
      });
    } else if (index !== undefined) {
      //reroll existing warscroll
      let indexesToSkip: number[] = [];
      let newIndex = this.warScrollObj[index].currIndex;

      this.warScrollObj.forEach(warscroll => {
        indexesToSkip.push(warscroll.currIndex);
      });

      do {
        newIndex ++;
      } while (indexesToSkip.includes(newIndex));

      if (newIndex >= WAR_SCROLLS.length) {
        newIndex = 0;
      }

      this.warScrollObj[index] = {
        descrip: WAR_SCROLLS[newIndex],
        currIndex: newIndex
      };
    } else {
      //add to an already populated array
      let newIndex = -1;
      let indexesToSkip: number[] = [];
      this.warScrollObj.forEach(warscroll => {
        indexesToSkip.push(warscroll.currIndex);
      });

      do {
        newIndex ++;
      } while (indexesToSkip.includes(newIndex));

      if (newIndex >= WAR_SCROLLS.length) {
        newIndex = 0;
      }

      this.warScrollObj.push({
        descrip: WAR_SCROLLS[newIndex],
        currIndex: newIndex
      });
    }
  }

  rerollNickname() {
    if (this.leaderObj.name === 'embedded one') {
      this.nickname = '';
      for (const [key, value] of Object.entries(this.embeddedNameObj)) {
        let arrayToRoll: string[] = [];
        switch (true) {
          case key === 'first': {
            arrayToRoll = EMBEDDED_NAMES[0];
            break;
          }
          case key === 'middle': {
            arrayToRoll = EMBEDDED_NAMES[1];
            break;
          }
          case key === 'last': {
            arrayToRoll = EMBEDDED_NAMES[2];
            break;
          }
          default: break;
        };

        let newIndex = arrayToRoll.indexOf(this.embeddedNameObj[key as keyof typeof this.embeddedNameObj]);

        if (newIndex + 1 === arrayToRoll.length) {
          newIndex = 0;
        } else {
          do {
            newIndex ++;
          } while (arrayToRoll[newIndex] === this.embeddedNameObj[key as keyof typeof this.embeddedNameObj]);
        }

        this.embeddedNameObj[key as keyof typeof this.embeddedNameObj] = arrayToRoll[newIndex];
      }
    } else {
      this.embeddedNameObj = {
        first: '',
        middle: '',
        last: ''
      };

      let newIndex = NICKNAMES.indexOf(this.nickname);

      if (newIndex + 1 === NICKNAMES.length) {
        newIndex = 0;
      } else {
        do {
          newIndex ++;
        } while (NICKNAMES[newIndex] === this.nickname);
      }
  
      this.nickname = NICKNAMES[newIndex];
    }

  }

  rerollSidearms(modNumber: number) {
    setTimeout(() => {
      let newIndex;
      const isEndOfArray = this.sidearmsObj.currIndex + 1 === this.randomSidearmsTable.length;

      if (isEndOfArray) {
        newIndex = 0;
      } else {
        newIndex = this.sidearmsObj.currIndex + 1;
      }

      const newDescrip = this.randomSidearmsTable[newIndex].includes('[') ?
        this.parseAndReplaceNumberString(this.randomSidearmsTable[newIndex]) :
        this.randomSidearmsTable[newIndex];

      this.sidearmsObj = {
        descrip: newDescrip,
        currIndex: newIndex,
        limitNum: modNumber,
      };
    }, 10);
  }

  rerollFireArms(modNumber: number) {
    setTimeout(() => {
      let newIndex;
      const isEndOfArray = this.firearmsObj.currIndex + 1 === this.randomFirearmsTable.length;

      if (isEndOfArray) {
        newIndex = 0;
      } else {
        newIndex = this.firearmsObj.currIndex + 1;
      }

      const newDescrip = this.randomFirearmsTable[newIndex];

      this.firearmsObj = {
        descrip: newDescrip,
        currIndex: newIndex,
        limitNum: modNumber,
      };
    }, 10);
  }

  rerollArmor(modNumber: number) {
    //in case of fast clicks, this slows it down enough to process but fast enough to not be noticed
    setTimeout(() => {
      let newIndex;
      const isEndOfArray = this.armorObj.currIndex + 1 === this.randomArmorTable.length;
  
      if (isEndOfArray) {
        newIndex = 0;
      } else {
        newIndex = this.armorObj.currIndex + 1;
      }
  
      const newDescrip = this.randomArmorTable[newIndex];
  
      this.armorObj = {
        descrip: newDescrip,
        currIndex: newIndex,
        limitNum: modNumber,
      };
  
      this.armorWithHelmet = this.armorObj.descrip.includes('helmet');
    }, 10);
  }

  rerollHP() {
    const hpInfo = this.leaderObj.stats.find(stat => stat.name === 'hp');
    const roll = this.random.getRandomNumber(1, hpInfo!.mod);

    this.hpObj = {
      value: roll,
      die: `(d${hpInfo!.mod})`
    };
  }

  rerollAmmo() {
    if (!this.leaderObj.stats.some(stat => stat.name === 'ammo')) {
      this.ammoObj = {
        value: -1,
        die: ''
      };
      return;
    }

    const ammoInfo = this.leaderObj.stats.find(stat => stat.name === 'ammo');
    const roll = this.random.getRandomNumber(1, ammoInfo!.mod);

    this.ammoObj = {
      value: roll,
      die: `(d${ammoInfo!.mod})`
    };
  }

  rerollSpecialities() {
    if (this.leaderObj.specialitiesObj.specialities.length > 0) {
      let newIndex = this.leaderObj.specialitiesObj.specialities.indexOf(
        this.leaderObj.specialitiesObj.original
      );

      if (newIndex + 1 === this.leaderObj.specialitiesObj.specialities.length) {
        newIndex = 0;
      } else {
        do {
          newIndex++;
        }
        while (this.leaderObj.specialitiesObj.original === this.leaderObj.specialitiesObj.specialities[newIndex]);
      }

      this.leaderObj.specialitiesObj.chosenSpeciality = this.leaderObj.specialitiesObj.specialities[newIndex];
      this.leaderObj.specialitiesObj.original = this.leaderObj.specialitiesObj.specialities[newIndex];

      if (this.leaderObj.specialitiesObj.original.includes('[')) {
        const stringToReplace = this.leaderObj.specialitiesObj.original.slice(
          this.leaderObj.specialitiesObj.original.indexOf('['),
          this.leaderObj.specialitiesObj.original.indexOf(']') + 1
        );
        const dieSize = stringToReplace.slice(
          stringToReplace.indexOf('d') + 1,
          stringToReplace.length - 1
        );

        this.leaderObj.specialitiesObj.chosenSpeciality =
          this.leaderObj.specialitiesObj.original.replace(stringToReplace, this.random.getRandomNumber(1, Number(dieSize)).toString());
      }
    }
  }

  private parseAndReplaceNumberString(descrip: string): string {
    // parse and replace
    const firstBracketIndex = descrip.indexOf('[') + 1;

    const die = descrip.slice(firstBracketIndex, descrip.indexOf(']'));
    const dieSize = die.slice(die.indexOf('d')+1);

    return descrip.replace(`[d${dieSize}]`, this.random.getRandomNumber(1, Number(dieSize)).toString());
  }
  
}
