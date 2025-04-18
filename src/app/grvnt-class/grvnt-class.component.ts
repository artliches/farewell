import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../random-number.service';
import { CommonModule } from '@angular/common';
import { ClassObj } from '../grvnt-interfaces';

@Component({
  selector: 'app-grvnt-class',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grvnt-class.component.html',
  styleUrl: './grvnt-class.component.scss'
})
export class GrvntClassComponent implements OnInit, OnChanges {
  constructor(
    private random: RandomNumberService
  ) {}
  @Input() classObj: ClassObj = {} as ClassObj;
  @Input() job: any;
  @Output() newJobEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() newBeast: EventEmitter<number> = new EventEmitter();
  @Output() classObjectEmitter: EventEmitter<any> = new EventEmitter();
  @Output() toggleJuggernautArmor: EventEmitter<boolean> = new EventEmitter();
  @Output() toggleEntrenchingTool: EventEmitter<boolean> = new EventEmitter();

  skillObj: {
    descrip: string,
    data: string,
    currIndex: number,
    arrayIndex: number,
  }[] = [];

  beastObj: {
    originalArray: string[],
    currBeast: number
  } = {
    originalArray: [],
    currBeast: -1
  };

  ngOnInit(): void {
    if (Object.keys(this.classObj).length === 0) {
      this.getSkills();
      this.toggleEntrenchingTool.emit(this.skillObj.some(data => data.data.includes('Death From Below')));
      this.toggleJuggernautArmor.emit(this.skillObj.some(data => data.data.includes('Juggernaut')));

    } else {
      this.beastObj = this.classObj.beastObj;
      this.skillObj = this.classObj.skillObj;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['job'].firstChange) {
      this.skillObj = [];
      this.getSkills();

      this.toggleJuggernautArmor.emit(this.skillObj.some(data => data.data.includes('Juggernaut')));
      this.toggleEntrenchingTool.emit(this.skillObj.some(data => data.data.includes('Death From Below')));
    }
  }

  getNewJob() {
    this.newJobEmitter.emit(true);
  }

  private getSkills() {
    let newSkill: {descrip: string,  data: string,  currIndex: number, arrayIndex: number};

    if (this.job.name === 'new world engineer' || this.job.name === 'sadistic soldier') {
      let newData = this.random.shuffleArray(this.job.skills[1].table)[0];
      newSkill = {
        descrip: this.job.skills[1].descrip,
        data: newData,
        currIndex: 0,
        arrayIndex: 1,
      };
      this.skillObj.push(newSkill);
    } else if (this.job.name === 'despondent interpreter') {
      let newData = this.random.shuffleArray(this.job.skills[0].table)[0];
      newSkill = {
        descrip: this.job.skills[0].descrip,
        data: newData,
        currIndex: 0,
        arrayIndex: 1,
      };
      this.skillObj.push(newSkill);
    } else {
      this.job.skills.forEach((skill: { table: string[] | any[]; descrip: string; }, index: number) => {      
        if (this.job.name.includes('altered') && index === 1) {
          this.beastObj.originalArray = JSON.parse(JSON.stringify(skill.table));
        }
  
        if (this.job.name.includes('embedded')) {
          if (index === 0) {
            const newData = this.random.shuffleArray(skill.table)[0];
            newSkill = {
              descrip: newData.ether,
              data: `
                <div>${newData.gift}</div>
                <div>${newData.covering}</div>
              `,
              currIndex: 0,
              arrayIndex: index,
            };
          } else {
            const newData = skill.table.find(x => x.includes(this.skillObj[0].descrip));
            newSkill = {
              descrip: skill.descrip,
              data: newData,
              currIndex: 0,
              arrayIndex: index,
            };
          }
        } else {
          let newData = this.random.shuffleArray(skill.table)[0];
          if (newData.includes('[')) {
            newData = this.rollAndReplaceInString(newData);
          }
          newSkill = {
            descrip: skill.descrip,
            data: newData,
            currIndex: 0,
            arrayIndex: index,
          };
        }
        this.skillObj.push(newSkill);
    
        if (this.beastObj && this.beastObj.originalArray.length > 0) {
            this.beastObj.currBeast = this.getBeastIndex(newSkill.data);
        }
      });
    }

    this.saveAndEmitClassObject();
  }

  rerollSkill(index: number) {
    const isEngineerOrSoldier: boolean = this.job.name === 'new world engineer' || this.job.name === 'sadistic soldier';
    const skillIndex = isEngineerOrSoldier ? index + 1 : index;
    let newIndex = 0;
    const isEndOfArray = this.job.skills[skillIndex]['table'].length === this.skillObj[index].currIndex + 1;
    if (isEndOfArray) {
      this.random.shuffleArray(this.job.skills[skillIndex]['table']);
    } else {
      newIndex = this.skillObj[index].currIndex + 1;
    }

    if (this.job.name.includes('embedded')) {
      let newData = this.job.skills[index]['table'][newIndex];

      this.skillObj[index] = {
        descrip: newData.ether,
        data: `
          <div>${newData.gift}</div>
          <div>${newData.covering}</div>
        `,
        currIndex: newIndex,
        arrayIndex: this.skillObj[index].arrayIndex
      };

      // need to update ether use
      const updatedEtherUse = this.job.skills[index+1]['table'].find(
        (ether: any) => {
          return ether.includes(this.skillObj[index].descrip);
        }
      );
      this.skillObj[index+1].data = updatedEtherUse;

    } else {
      let newData = this.job.skills[skillIndex]['table'][newIndex];
      if (newData.includes('[')) {
        newData = this.rollAndReplaceInString(newData);
      }
  
      this.skillObj[index].data = newData;
      this.skillObj[index].currIndex = newIndex;
      if (this.beastObj && this.beastObj.originalArray.length > 0 && index === 1) {
        this.beastObj.currBeast = this.getBeastIndex(this.skillObj[index].data);    
      }
    }

    this.toggleJuggernautArmor.emit(this.skillObj.some(data => data.data.includes('Juggernaut')));
    this.toggleEntrenchingTool.emit(this.skillObj.some(data => data.data.includes('Death From Below')));
    this.saveAndEmitClassObject();
  }

  private getBeastIndex(beastDescripToMatch: string) {
    let indexToReturn = 0;
    const beastIndex = this.beastObj.originalArray.findIndex(beast => {
      return beast === beastDescripToMatch;
    });
    indexToReturn = beastIndex + 1;
    this.newBeast.emit(indexToReturn);  
    return indexToReturn;
  }

  private rollAndReplaceInString(newData: string, recursionCounter?: number) {
    const bracketStartIndex = newData.indexOf('[');
    const bracketEndIndex = newData.indexOf(']');
    const formula = newData.slice(bracketStartIndex + 1, bracketEndIndex);

    let dieNum;
    let mod = 0;
    if (formula.includes('+')) {
      mod = Number(formula.slice(formula.indexOf('+') + 1));
      dieNum = formula.slice(formula.indexOf('d') + 1, formula.indexOf('+'));
    } else {
      dieNum = formula.slice(formula.indexOf('d') + 1);
    }
    const randNum = this.random.getRandomNumber(1, Number(dieNum));
    const numToInsert = Number(randNum) + mod;
    
    newData = newData.replace(`[${formula}]`, (numToInsert).toString());

    if (newData.includes('infected') && newData.includes('[')) {
      if (recursionCounter === undefined) {
        newData = newData.replace(numToInsert.toString(), this.getFinger(numToInsert));
      }
      newData = this.rollAndReplaceInString(newData, 1);
    } else if (newData.includes('infected')) {
      newData = newData.replace(numToInsert.toString(), numToInsert === 1 ? 'left' : 'right');
    }

    return newData;
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

  private saveAndEmitClassObject() {
    this.classObj.skillObj = this.skillObj;
    this.classObj.beastObj = this.beastObj;
    this.classObjectEmitter.emit(this.classObj);
  }
}
