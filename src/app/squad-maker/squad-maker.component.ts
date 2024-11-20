import { Component, OnInit } from '@angular/core';
import { RandomNumberService } from '../random-number.service';
import { LEADERS } from '../assets/squads.constants';
import { CommonModule } from '@angular/common';
import { ARMOR, FIREARMS, NICKNAMES, SIDEARMS, WAR_SCROLLS } from '../assets/grvnts.constants';

@Component({
  selector: 'app-squad-maker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './squad-maker.component.html',
  styleUrl: './squad-maker.component.scss'
})
export class SquadMakerComponent implements OnInit {
  constructor(
    private random: RandomNumberService
  ) {}

  leaderObj: {
    name: string,
    specialitiesObj: {
      specialities: string[],
      chosenSpeciality: string,
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

  ngOnInit(): void {
    this.random.shuffleArray(LEADERS);
    this.orderedArmorTable = JSON.parse(JSON.stringify(ARMOR));
    this.orderedFirearmsTable = JSON.parse(JSON.stringify(FIREARMS));
    this.orderedSidearmsTable = JSON.parse(JSON.stringify(SIDEARMS));
    this.random.shuffleArray(NICKNAMES);
    this.random.shuffleArray(WAR_SCROLLS);
    //get a squad leader
    this.rerollSquadLeader();
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
    if (this.leaderObj.startingShit.find(shit => shit.armor)) {
      this.armorLimitNum = this.leaderObj.startingShit.find(shit => shit.armor).armor;
      this.randomArmorTable = this.random.shuffleArray(JSON.parse(JSON.stringify(this.orderedArmorTable)).splice(0, this.armorLimitNum));

      this.rerollArmor(this.armorLimitNum);
    }
    if (this.leaderObj.startingShit.find(shit => shit.firearms)) {
      if (isNaN(this.leaderObj.startingShit.find(shit => shit.firearms).firearms)) {
        this.firearmsObj = {
          descrip: this.leaderObj.startingShit.find(shit => shit.firearms).firearms,
          currIndex: -1,
          limitNum: -1,
        }
      } else {
        this.firearmLimitNum = this.leaderObj.startingShit.find(shit => shit.firearms).firearms;
        this.randomFirearmsTable = this.random.shuffleArray(JSON.parse(JSON.stringify(this.orderedFirearmsTable)).splice(0, this.firearmLimitNum));
        
        this.rerollFireArms(this.firearmLimitNum);
      }
    }
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
    const warscrolls = this.leaderObj.startingShit.find(shit => shit.warscroll);
    if (warscrolls) {
      let loopNum = 0;
      do {
        this.rerollWarScroll();
        loopNum ++;
      } while (loopNum !== warscrolls.warscroll);
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
        this.leaderObj.specialitiesObj.chosenSpeciality
      );

      if (newIndex + 1 === this.leaderObj.specialitiesObj.specialities.length) {
        newIndex = 0;
      } else {
        do {
          newIndex++;
        }
        while (this.leaderObj.specialitiesObj.chosenSpeciality === this.leaderObj.specialitiesObj.specialities[newIndex]);
      }

      this.leaderObj.specialitiesObj.chosenSpeciality = this.leaderObj.specialitiesObj.specialities[newIndex];
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
