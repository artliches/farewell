import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../random-number.service';
import { EMBEDDED_NAMES, NICKNAMES, REASONS, SCARS, VICES } from '../assets/grvnts.constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grvnt-identity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grvnt-identity.component.html',
  styleUrl: './grvnt-identity.component.scss'
})
export class GrvntIdentityComponent implements OnInit, OnChanges {
  constructor(
    private random: RandomNumberService
  ) {}

  @Input() isEmbedded: boolean = false;

  nameObj = {
    name: '',
    currIndex: -1,
  };

  embeddedNameObj: {
    part: string,
    currIndex: number
  }[] = [];

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

  ngOnChanges(changes: SimpleChanges): void {
      if (!changes['isEmbedded'].firstChange) {
        if (changes['isEmbedded'].currentValue) {
          this.getNewEmbeddedName();
        } else {
          this.rerollName();
        }
      }
  }

  rerollAll() {
    if (this.isEmbedded) {
      this.getNewEmbeddedName();
    } else {
      this.rerollName();
    }
    this.rerollReasons();
    this.rerollScars();
    this.rerollVices();
  }

  private getNewEmbeddedName() {
    for (let index = 0; index < EMBEDDED_NAMES.length; index++) {
      // we already have names, just modify them
      if (this.embeddedNameObj[index]) {
        let newIndex;
        const isEndOfArray = this.embeddedNameObj[index].currIndex + 1 === EMBEDDED_NAMES[index].length;

        if (isEndOfArray) {
          this.random.shuffleArray(EMBEDDED_NAMES[index]);
          newIndex = 0;
        } else {
          newIndex = this.embeddedNameObj[index].currIndex + 1;
        }
        this.embeddedNameObj[index] = {
          part: EMBEDDED_NAMES[index][newIndex],
          currIndex: newIndex
        };
      } else { //we are fresh
        const newPart = {
          part: EMBEDDED_NAMES[index][0],
          currIndex: 0
        };
        this.embeddedNameObj.push(newPart);
      }
    }
  }

  rerollEmbeddedName(index: number): any {
    let newIndex;
    const isEndOfArray = this.embeddedNameObj[index].currIndex + 1 === EMBEDDED_NAMES[index].length;
    
    if (isEndOfArray) {
      this.random.shuffleArray(EMBEDDED_NAMES[index]);
      newIndex = 0;
    } else {
      newIndex = this.embeddedNameObj[index].currIndex + 1;
    }

    this.embeddedNameObj[index] = {
      part: EMBEDDED_NAMES[index][newIndex],
      currIndex: newIndex
    };
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
    } else if (this.scarsObj.descrip.includes('infected')) {
      const hand = this.random.getRandomNumber(1, 2) === 1 ? 'left' : 'right';
      const finger = this.getFinger(this.random.getRandomNumber(1, 4));

      this.scarsObj.descrip = this.scarsObj.descrip.replace('[d4]', finger);
      this.scarsObj.descrip = this.scarsObj.descrip.replace('[d2]', hand);
    }
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
    for (let index = 0; index < EMBEDDED_NAMES.length; index++) {
      this.random.shuffleArray(EMBEDDED_NAMES[index]);
    }
  }
}
