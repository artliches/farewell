import { Component, OnInit } from '@angular/core';
import { RandomNumberService } from '../random-number.service';
import { NICKNAMES, REASONS, SCARS, VICES } from '../assets/grvnts.constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grvnt-identity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grvnt-identity.component.html',
  styleUrl: './grvnt-identity.component.scss'
})
export class GrvntIdentityComponent implements OnInit {
  constructor(
    private random: RandomNumberService
  ) {}

  nameObj = {
    name: '',
    currIndex: -1,
  };

  reasonObj = {
    descrip: '',
    currIndex: -1,
  };

  scarsObj = {
    descrip: '',
    currIndex: -1,
  };

  vicesObj = {
    descrip: '',
    currIndex: -1,
  };

  ngOnInit(): void {
    this.createArrays();
    this.rerollAll();
  }

  rerollAll() {
    this.rerollName();
    this.rerollReasons();
    this.rerollScars();
    this.rerollVices();
  }

  nextWordGrammer(nextSentence: string) {
    if (nextSentence.match("\\d")) {
      return '';
    }
    return nextSentence.match('^[aieoAIEO].*') ? 'an' : 'a';
  }

  rerollName() {
    let newIndex;
    const isEndOfArray = this.nameObj.currIndex + 1 === NICKNAMES.length;

    if (isEndOfArray) {
      //reshuffle array and set value
      this.random.shuffleArray(NICKNAMES);
      newIndex = 0;
    } else {
      newIndex = this.nameObj.currIndex + 1;
    }

    this.nameObj = {
      name: NICKNAMES[newIndex],
      currIndex: newIndex
    };
  }

  rerollReasons() {
    let newIndex;
    const isEndOfArray = this.reasonObj.currIndex + 1 === REASONS.length;

    if (isEndOfArray) {
      //reshuffle array and set value
      this.random.shuffleArray(REASONS);
      newIndex = 0;
    } else {
      newIndex = this.reasonObj.currIndex + 1;
    }

    this.reasonObj = {
      descrip: REASONS[newIndex],
      currIndex: newIndex
    };
  }

  rerollScars() {
    let newIndex;
    const isEndOfArray = this.scarsObj.currIndex + 1 === SCARS.length;

    if (isEndOfArray) {
      //reshuffle array and set value
      this.random.shuffleArray(SCARS);
      newIndex = 0;
    } else {
      newIndex = this.scarsObj.currIndex + 1;
    }

    this.scarsObj = {
      descrip: SCARS[newIndex],
      currIndex: newIndex
    };

    if (this.scarsObj.descrip.includes('[d6]')) {
      this.scarsObj.descrip = this.scarsObj.descrip.replace('[d6]', this.random.getRandomNumber(1, 6).toString());
    }
  }

  rerollVices() {
    let newIndex;
    const isEndOfArray = this.vicesObj.currIndex + 1 === VICES.length;

    if (isEndOfArray) {
      //reshuffle array and set value
      this.random.shuffleArray(VICES);
      newIndex = 0;
    } else {
      newIndex = this.vicesObj.currIndex + 1;
    }

    this.vicesObj = {
      descrip: VICES[newIndex],
      currIndex: newIndex
    };
  }

  private createArrays() {
    this.random.shuffleArray(NICKNAMES);
    this.random.shuffleArray(REASONS);
    this.random.shuffleArray(SCARS);
    this.random.shuffleArray(VICES);
  }
}
