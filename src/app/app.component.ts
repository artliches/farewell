import { Component, OnInit } from '@angular/core';
import { GrvntAbilitiesComponent } from "./grvnt-abilities/grvnt-abilities.component";
import { GrvntIdentityComponent } from "./grvnt-identity/grvnt-identity.component";
import { CommonModule } from '@angular/common';
import { GrvntClassComponent } from "./grvnt-class/grvnt-class.component";
import { GrvntVitalsComponent } from "./grvnt-vitals/grvnt-vitals.component";
import { RandomNumberService } from './random-number.service';
import { JOBS } from './assets/grvnts.constants';
import { GrvntShitComponent } from "./grvnt-shit/grvnt-shit.component";
import { MissionBriefComponent } from './mission-brief/mission-brief.component';
import { MissionAdvanceComponent } from "./mission-advance/mission-advance.component";
import { MissionActionComponent } from "./mission-action/mission-action.component";
import { MissionAftermathComponent } from "./mission-aftermath/mission-aftermath.component";
import { MissionRewardsComponent } from "./mission-rewards/mission-rewards.component";
import { SquadMakerComponent } from "./squad-maker/squad-maker.component";
import { SQUAD_SIZE } from './assets/missions.constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GrvntAbilitiesComponent, GrvntIdentityComponent, CommonModule, GrvntClassComponent, GrvntVitalsComponent, GrvntShitComponent, MissionBriefComponent, MissionAdvanceComponent, MissionActionComponent, MissionAftermathComponent, MissionRewardsComponent, SquadMakerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private random: RandomNumberService
  ) {}
  offWhite = '#FAF9F6';
  chromeBlack = '#010203';
  morkYellow = '#FFE900';
  pink = '#FF3EB5';
  red = 'red';

  currentUI: string = 'stacked';
  currentTheme: string = 'nomansland';
  themeArray: Array<string> = [
    'nomansland',
    'charge',
    'mork',
    'gum',
    'bone',
    'vet',
    'sapper',
    'marks',
  ];
  themeBackgrounds: Array<any> = [
    {
      theme: 'nomansland',
      background: this.chromeBlack,
      color: this.offWhite,
    },
    {
      theme: 'charge',
      background: '#40BFBF',
      color: this.chromeBlack,
    },
    {
      theme: 'bone',
      background: this.offWhite,
      color: this.chromeBlack,
    },
    {
      theme: 'mork',
      background: this.morkYellow,
      color: this.chromeBlack,
    },
    {
      theme: 'gum',
      background: this.pink,
      color: this.offWhite,
    },
    {
      theme: 'vet',
      background: this.offWhite,
      color: this.chromeBlack,
    },
    {
      theme: 'sapper',
      background: this.offWhite,
      color: this.chromeBlack,
    },
    {
      theme: 'marks',
      background: this.red,
      color: this.offWhite,
    },
  ];

  showRolls: boolean = false;

  jobObj: {
    name: string,
    stats: {name: string, mod: number | string}[],
    extras: string[],
    startingGear: Array<any>,
    startingShit: Array<any>,
    descrip: string,
    skills: {descrip: string, table: string[] | {ether: string, gift: string, covering: string}[]}[],
    currIndex: number,
  } = {
    name: '',
    stats: [],
    extras: [''],
    startingGear: [],
    startingShit: [],
    descrip: '',
    skills: [],
    currIndex: -1,
  };

  isEmbedded: boolean = false;

  beastHP: number = 0;
  presenceNum: number = -5;
  getNewAll: boolean = false;
  getNewMission: boolean = false;
  getNewSquad: boolean = false;
  rollPromotion: boolean = false;
  numPromotions: number = 0;
  sectionToShow: string = 'grvnts';
  squadSize: string = '';
  clearPromo: boolean = false;
  promoEquipObj: {show: boolean, descrip: string} = {
    show: false,
    descrip: '',
  };

  ngOnInit(): void {
    //shuffle jobs and choose the first on load
    this.random.shuffleArray(JOBS);
    this.jobObj = {
      name: JOBS[0].name,
      stats: JOBS[0].stats,
      extras: JOBS[0].extras,
      startingGear: JOBS[0].startingGear,
      startingShit: JOBS[0].startingShit,
      descrip: JOBS[0].descrip,
      skills: JOBS[0].skills,
      currIndex: 0
    };
    this.isEmbedded = this.jobObj.name === 'embedded one';
    this.random.shuffleArray(SQUAD_SIZE);
  }

  print() {
    window.print();
  }

  toggleRolls() {
    this.showRolls = !this.showRolls;
  }

  rerollAll() {
    this.numPromotions = 0;
    this.clearPromo = !this.clearPromo;
    this.getNewJob();
    this.getNewAll = !this.getNewAll;
  }

  rerollAllMission() {
    this.getNewMission = !this.getNewMission;
  }

  rerollAllSquad() { 
    this.rerollSquadSize();
    this.getNewSquad = !this.getNewSquad;
  }

  promoteGrvnt() {
    if (this.numPromotions !== 2) {
      this.rollPromotion = !this.rollPromotion;
      this.numPromotions += 1;
      
      const merits = this.random.getRandomNumber(1, 6);
      switch (true) {
        case merits === 4: {
          this.promoEquipObj = {
            show: !this.promoEquipObj.show,
            descrip: 'war scroll',
          };
          break;
        }
        case merits === 5: {
          this.promoEquipObj = {
            show: !this.promoEquipObj.show,
            descrip: 'ready',
          };
          break;
        }
        case merits === 6: {
          this.promoEquipObj = {
            show: !this.promoEquipObj.show,
            descrip: 'A piece of SLAGVARRA',
          };
          break;
        }
      }
    }
  }

  displaySection(sectionName: string) {
    this.sectionToShow = sectionName;
    if (this.sectionToShow === 'squads') {
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

  getNewJob() {
    let newIndex = 0;
    const isEndOfArray = JOBS.length === this.jobObj.currIndex + 1;

    if (!isEndOfArray) {
      newIndex = this.jobObj.currIndex + 1;
    } 

    this.jobObj = {
      name: JOBS[newIndex].name,
      stats: JOBS[newIndex].stats,
      extras: JOBS[newIndex].extras,
      startingGear: JOBS[newIndex].startingGear,
      startingShit: JOBS[newIndex].startingShit,
      descrip: JOBS[newIndex].descrip,
      skills: JOBS[newIndex].skills,
      currIndex: newIndex
    };

    this.isEmbedded = this.jobObj.name === 'embedded one';
  }

  addBeastHP(beastHP: number) {
    setTimeout(() => {
      this.beastHP = beastHP;
    });
  }

  getPresence(presenceNum: any) {
    setTimeout(() => {
      this.presenceNum = presenceNum;
    });
  }

  shuffleUI() {
    this.currentUI = this.currentUI === 'stacked' ? 'killroy' : 'stacked';
  }

  shuffleTheme() {
    const currThemeIndex = this.themeArray.indexOf(this.currentTheme);
    const maxArrayLength = this.themeArray.length - 1;
    this.currentTheme = currThemeIndex === maxArrayLength ?
      this.themeArray[0] : this.themeArray[currThemeIndex + 1];
    
    document.body.style.backgroundColor = this.themeBackgrounds[
      this.getThemeBackgroudIndex()
    ].background;

    document.body.style.color = this.themeBackgrounds[
      this.getThemeBackgroudIndex()
    ].color;
  }

  getThemeName(): string {
    switch (true) {
      case this.currentTheme === 'nomansland': {
        return `NO MAN\'S LAND`;
      }
      case this.currentTheme === 'charge': {
        return `CHARGE!`;
      }
      case this.currentTheme === 'bone': {
        return `BLOOD & BONE`;
      }
      case this.currentTheme === 'mork': {
        return `MÖRK`;
      }
      case this.currentTheme === 'gum': {
        return `CHEWING GUM`;
      }
      case this.currentTheme === 'vet': {
        return `VETERAN`;
      }
      case this.currentTheme === 'sapper': {
        return `SAPPER`;
      }
      case this.currentTheme === 'marks': {
        return `MARKSMAN`;
      }
    }
    return '';
  } 

  private getThemeBackgroudIndex() {
    return this.themeBackgrounds.findIndex(x => x.theme === this.currentTheme);
  }
}
