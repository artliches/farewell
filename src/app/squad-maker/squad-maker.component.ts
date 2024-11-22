import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderMakerComponent } from "./leader-maker/leader-maker.component";
import { RandomNumberService } from '../random-number.service';
import { SQUADS } from '../assets/squads.constants';
import { ARMOR, FIREARMS, SIDEARMS, WAR_SCROLLS } from '../assets/grvnts.constants';

@Component({
  selector: 'app-squad-maker',
  standalone: true,
  imports: [CommonModule, LeaderMakerComponent],
  templateUrl: './squad-maker.component.html',
  styleUrl: './squad-maker.component.scss'
})
export class SquadMakerComponent implements OnInit, OnChanges {
    constructor(
      private random: RandomNumberService
    ) {}

    @Input() enemySize: string = '';

    attachmentsNum: number = 0;
    squadMakeup: {name: string[], firearms: string[], sidearms: string[], specials: string[]} = {
      name: [],
      firearms: [],
      sidearms: [],
      specials: [],
    };
    squadObj: {size: number, firearm: {descrip: any, original: string, isScroll: boolean}, sidearm: {descrip: any, original: string, isScroll: boolean}, special: string} = {
      size: 0,
      firearm: {
        descrip: '',
        original: '',
        isScroll: false,
      },
      sidearm: {
        descrip: '',
        original: '',
        isScroll: false,
      },
      special: '',
    };

    morale: number = 8;
    armor: string = '';
    hasHemlet: boolean = false;

    ngOnInit(): void {
      this.getSquadAndAttachments();
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (!changes['enemySize'].firstChange) {
        this.getSquadAndAttachments();
      }
    }

  private getSquadAndAttachments() {
    this.random.shuffleArray(SQUADS);
    switch (true) {
      case this.enemySize.includes('squad'): {
        this.getInitialSquad(5);
        this.attachmentsNum = 0;
        break;
      }
      case this.enemySize.includes('company'): {
        this.getInitialSquad(10);
        if (this.random.getRandomNumber(1, 10) >= 6) {
          //get armor and attachments
          this.attachmentsNum = 2;
        }
        break;
      }
      case this.enemySize.includes('regiment'): {
        this.getInitialSquad(20);
        this.attachmentsNum = 3;
        break;
      }
    }
  }

    getInitialSquad(size: number) {
      const squadSize = size !== 5 ? size : this.random.getRandomNumber(3, 5);
      this.squadObj.size = squadSize;
      
      //get squad makeup
      let newIndex = SQUADS.findIndex(squad => squad.name === this.squadMakeup.name);

      if (newIndex + 1 === SQUADS.length) {
        newIndex = 0;
      } else {
        do {
          newIndex ++;
        } while (SQUADS[newIndex].name === this.squadMakeup.name);
      }

      this.squadMakeup = SQUADS[newIndex];

      for (const key of Object.keys(this.squadMakeup)) {
        if (key !== 'name')
          this.random.shuffleArray(this.squadMakeup[key as keyof typeof this.squadMakeup]);
      }

      this.rerollSquadFirearms();
      this.rerollSquadSidearms();
      this.rerollSpecial();
      this.rerollMorale();
      this.rerollArmor();
    }
  
  rerollMorale() {
    const coinFlip = this.random.getRandomNumber(1, 2);
    const moraleMod = this.random.getRandomNumber(1, 2);
    if (coinFlip === 1) {
      this.morale = 8 - moraleMod;
    } else {
      this.morale = 8 + moraleMod;
    }
  }

  rerollArmor() {
    let armorIndex = ARMOR.indexOf(this.armor) === -1 ?
      this.random.getRandomNumber(0, 4) : ARMOR.indexOf(this.armor);
    
    if (armorIndex === ARMOR.length-2) {
      armorIndex = 0;
    } else {
      do {
        armorIndex ++;
      } while (ARMOR[armorIndex] === this.armor);
    }

    this.armor = ARMOR[armorIndex];
    this.hasHemlet = this.armor.includes('helmet');
  }

  rerollSpecial() {
    let newIndex = this.squadMakeup.specials.indexOf(this.squadObj.special);

    if (newIndex + 1 === this.squadMakeup.specials.length) {
      newIndex = 0;
    } else {
      do {
        newIndex ++;
      } while (this.squadMakeup.specials[newIndex] === this.squadObj.special);
    }

    this.squadObj.special = this.squadMakeup.specials[newIndex];
    if (this.squadObj.special.includes('2d2')) {
      const newNum = this.random.rollMultipleDie(2, 2);
      this.squadObj.special = this.squadObj.special.replace('2d2', newNum.toString());
    }
  }

  rerollSquadFirearms() {
    let newIndex = this.squadMakeup.firearms.indexOf(this.squadObj.firearm.original);

    if (newIndex + 1 === this.squadMakeup.firearms.length) {
      newIndex = 0;
    } else {
      do {
        newIndex++;
      } while (this.squadMakeup.firearms[newIndex] === this.squadObj.firearm.original);
    }
    this.squadObj.firearm = {
      descrip: this.squadMakeup.firearms[newIndex],
      original: this.squadMakeup.firearms[newIndex],
      isScroll: false,
    };

    let fullFirearmName: any = '';
    if (this.squadObj.firearm.original.includes('Casts')) {
      this.squadObj.firearm.isScroll = true;
      const substringToRemove = this.squadObj.firearm.original.slice(
        this.squadObj.firearm.original.indexOf('['),
        this.squadObj.firearm.original.indexOf(']') + 1
      );
      const stringToSearch = this.squadObj.firearm.original.replace(substringToRemove, '').trim();
      fullFirearmName = WAR_SCROLLS.find(warscroll => warscroll.includes(stringToSearch));
    } else {
      fullFirearmName = FIREARMS.find(firearm => firearm.includes(this.squadObj.firearm.original));
    }

    this.squadObj.firearm.descrip = fullFirearmName;
  }

  rerollSquadSidearms() {
    let newIndex = this.squadMakeup.sidearms.indexOf(this.squadObj.sidearm.original);

    if (newIndex + 1 === this.squadMakeup.sidearms.length) {
      newIndex = 0;
    } else {
      do {
        newIndex++;
      } while (this.squadMakeup.sidearms[newIndex] === this.squadObj.sidearm.original);
    }
    this.squadObj.sidearm = {
      descrip: this.squadMakeup.sidearms[newIndex],
      original: this.squadMakeup.sidearms[newIndex],
      isScroll: false,
    };

    let fullSidearmName: any = '';
    if (this.squadObj.sidearm.original.includes('Casts')) {
      this.squadObj.sidearm.isScroll = true;
      const substringToRemove = this.squadObj.sidearm.original.slice(
        this.squadObj.sidearm.original.indexOf('['),
        this.squadObj.sidearm.original.indexOf(']') + 1
      );
      const stringToSearch = this.squadObj.sidearm.original.replace(substringToRemove, '').trim();
      fullSidearmName = WAR_SCROLLS.find(warscroll => warscroll.includes(stringToSearch));
    } else if (this.squadObj.sidearm.original.includes('Tergol')) {
      fullSidearmName = this.squadObj.sidearm.original;
    } else if (this.squadObj.sidearm.original.includes('Short Bow')) {
      fullSidearmName = SIDEARMS.find(sidearm => sidearm.includes(this.squadObj.sidearm.original));
      const substringToRemove = fullSidearmName.slice(
        fullSidearmName.indexOf('('),
        fullSidearmName.indexOf(')') + 1,
      );
      fullSidearmName = fullSidearmName.replace(substringToRemove, '');
    } else {
      fullSidearmName = SIDEARMS.find(sidearm => sidearm.includes(this.squadObj.sidearm.original));

      if (fullSidearmName.includes('[')) {
        const substringToRemove = fullSidearmName.slice(
          fullSidearmName.indexOf('['),
          fullSidearmName.indexOf(']') + 1
        );
  
        fullSidearmName = fullSidearmName.replace(substringToRemove, '');
      }
    }

    this.squadObj.sidearm.descrip = fullSidearmName;
  }
}
