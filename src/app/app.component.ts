import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GrvntAbilitiesComponent } from "./grvnt-abilities/grvnt-abilities.component";
import { GrvntIdentityComponent } from "./grvnt-identity/grvnt-identity.component";
import { CommonModule } from '@angular/common';
import { GrvntClassComponent } from "./grvnt-class/grvnt-class.component";
import { GrvntVitalsComponent } from "./grvnt-vitals/grvnt-vitals.component";
import { RandomNumberService } from './random-number.service';
import { JOBS } from './assets/grvnts.constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GrvntAbilitiesComponent, GrvntIdentityComponent, CommonModule, GrvntClassComponent, GrvntVitalsComponent],
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

  currentUI: string = 'stacked';
  currentTheme: string = 'nomansland';
  themeArray: Array<string> = [
    'nomansland',
    'charge',
    'mork',
    'gum',
    'bone',
    'vet',
    'sapper'
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
  ];

  jobObj = {
    name: '',
    stats: [{}],
    extras: [''],
    descrip: '',
    skills: [{}],
    currIndex: -1,
  };

  ngOnInit(): void {
    //shuffle jobs and choose the first on load
    this.random.shuffleArray(JOBS);
    this.jobObj = {
      name: JOBS[0].name,
      stats: JOBS[0].stats,
      extras: JOBS[0].extras,
      descrip: JOBS[0].descrip,
      skills: JOBS[0].skills,
      currIndex: 0
    };
  }

  getNewJob() {
    let newIndex = 0;
    const isEndOfArray = JOBS.length === this.jobObj.currIndex + 1;

    if (isEndOfArray) {
      this.random.shuffleArray(JOBS);
    } else {
      newIndex = this.jobObj.currIndex + 1;
    }

    this.jobObj = {
      name: JOBS[newIndex].name,
      stats: JOBS[newIndex].stats,
      extras: JOBS[newIndex].extras,
      descrip: JOBS[newIndex].descrip,
      skills: JOBS[newIndex].skills,
      currIndex: newIndex
    };
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
    }
    return '';
  } 

  private getThemeBackgroudIndex() {
    return this.themeBackgrounds.findIndex(x => x.theme === this.currentTheme);
  }
}
