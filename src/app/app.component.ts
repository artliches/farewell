import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GrvntAbilitiesComponent } from "./grvnt-abilities/grvnt-abilities.component";
import { GrvntIdentityComponent } from "./grvnt-identity/grvnt-identity.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GrvntAbilitiesComponent, GrvntIdentityComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  offWhite = '#FAF9F6';
  chromeBlack = '#010203';
  morkYellow = '#FFE900';
  pink = '#FF3EB5';
  currentTheme: string = 'nomansland';
  themeArray: Array<string> = [
    'nomansland',
    'charge',
    'bone',
    'mork',
    'gum'
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
  ];

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
    }
    return '';
  } 

  private getThemeBackgroudIndex() {
    return this.themeBackgrounds.findIndex(x => x.theme === this.currentTheme);
  }
}
