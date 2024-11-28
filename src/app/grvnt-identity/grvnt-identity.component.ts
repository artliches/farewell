import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../random-number.service';
import { EMBEDDED_NAMES, NICKNAMES, REASONS, SCARS, VICES } from '../assets/grvnts.constants';
import { CommonModule } from '@angular/common';
import { DescripIndexObj, EmbeddedNameObj, IdentityObj, ShockObj } from '../grvnt-interfaces';

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

  @Input() identityObj: IdentityObj = {} as IdentityObj;
  @Input() isEmbedded: boolean = false;
  @Input() shuffleAll: boolean = false;
  @Output() identityObjectEmitter: EventEmitter<any> = new EventEmitter();

  nameObj: DescripIndexObj = {
    descrip: '',
    currIndex: -1,
  };

  embeddedNameObj: EmbeddedNameObj[] = [];

  reasonObj: DescripIndexObj = {
    descrip: '',
    currIndex: -1,
  };

  scarsObj: DescripIndexObj = {
    descrip: '',
    currIndex: -1,
  };

  vicesObj: DescripIndexObj = {
    descrip: '',
    currIndex: -1,
  };

  shockObj: ShockObj = {
    value: 2,
    effect: 'd2'
  };

  ngOnInit(): void {
    this.createArrays();
    this.rerollAll(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEmbedded'] && !changes['isEmbedded'].firstChange) {
      if (changes['isEmbedded'].currentValue) {
          this.getNewEmbeddedName();
        } else {
          this.rerollName();
        }
      }
    if (changes['shuffleAll'] && !changes['shuffleAll'].firstChange) {
      this.identityObj = {} as IdentityObj;
      this.createArrays();
      this.rerollAll(true);
    }
  }

  rerollAll(isPageLoad: boolean) {
    if (Object.keys(this.identityObj).length === 0) {
      if (this.isEmbedded) {
        this.getNewEmbeddedName();
      } else {
        this.rerollName();
      }
      this.rerollReasons();
      this.rerollScars();
      this.rerollVices();
  
      this.getShock(isPageLoad);
    } else {
      if (this.isEmbedded) {
        this.embeddedNameObj = this.identityObj.embeddedNameObj;
      } else {
        this.nameObj = this.identityObj.nameObj;
      }
      this.reasonObj = this.identityObj.reasonObj;
      this.scarsObj = this.identityObj.scarsObj;
      this.vicesObj = this.identityObj.vicesObj;
      this.shockObj = this.identityObj.shockObj;
    }

  }

  getShock(isPageLoad: boolean) {
    if (isPageLoad) {
      this.shockObj.value = this.random.getRandomNumber(1, 2);
    } else {
      this.shockObj.value = this.shockObj.value === 2 ? 1 : 2;
    }
    this.shockObj.effect = this.shockObj.value === 1 ?
      `<strong class="underline">THE SHAKES.</strong> Always have last initiative` : `<strong class="underline">PRIMAL FEAR.</strong> Next <strong>SHOCK</strong> roll is d6`

    this.identityObj.shockObj = this.shockObj;
    this.identityObjectEmitter.emit(this.identityObj);
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

    this.identityObj.embeddedNameObj = this.embeddedNameObj;
    this.identityObjectEmitter.emit(this.identityObj);
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

    this.identityObj.embeddedNameObj = this.embeddedNameObj;
    this.identityObjectEmitter.emit(this.identityObj);
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
      descrip: NICKNAMES[newIndex],
      currIndex: newIndex
    };

    this.identityObj.nameObj = this.nameObj;
    this.identityObjectEmitter.emit(this.identityObj);
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
    
    this.identityObj.reasonObj = this.reasonObj;
    this.identityObjectEmitter.emit(this.identityObj);
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

    this.identityObj.scarsObj = this.scarsObj;
    this.identityObjectEmitter.emit(this.identityObj);
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

    this.identityObj.vicesObj = this.vicesObj;
    this.identityObjectEmitter.emit(this.identityObj);
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
