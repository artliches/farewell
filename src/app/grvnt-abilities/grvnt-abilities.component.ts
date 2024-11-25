import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../random-number.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grvnt-abilities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grvnt-abilities.component.html',
  styleUrl: './grvnt-abilities.component.scss'
})
export class GrvntAbilitiesComponent implements OnInit, OnChanges {
  constructor(
    private random: RandomNumberService
  ) {}
  @Input() job: any;
  @Input() showRolls: boolean = false;
  @Input() beastHP: number = 0;
  @Input() promoteGrvnt: boolean = false;
  @Input() clearPromos: boolean = false;
  @Output() presence: EventEmitter<any> = new EventEmitter();

  statsArray: Array<{
    name: string,
    descrip: string,
    value: number,
    rollsArray: Array<any>,
    statMod: string,
    promoRolls: any,
  }> = [
    {
      name: 'toughness',
      descrip: 'resist shock/gas/cold/heat',
      value: 0,
      rollsArray: [],
      statMod: '',
      promoRolls: ''
    },
    {
      name: 'agility',
      descrip: 'defend, sneak, avoid explosions',
      value: 0,
      rollsArray: [],
      statMod: '',
      promoRolls: ''
    },
    {
      name: 'presence',
      descrip: 'shoot, perceive, use war scrolls',
      value: 0,
      rollsArray: [],
      statMod: '',
      promoRolls: ''
    },
    {
      name: 'strength',
      descrip: 'melee, throw, carry requisitions',
      value: 0,
      rollsArray: [],
      statMod: '',
      promoRolls: ''
    }
  ];

  vitalsArray: Array<{
    name: string,
    descrip: string,
    value?: number,
    valueObj?: {
      current: number,
      die: string,
    },
    rollsArray: string,
    promoRolls?: any,
  }> = [
    {
      name: 'hp',
      descrip: '0 or -1: downed | -2: DEATH',
      value: 1,
      rollsArray: '',
      promoRolls: '',
    },
    {
      name: 'omens',
      descrip: 'twist cruel fate',
      valueObj: {
        current: 0,
        die: 'd2'
      },
      rollsArray: '',
    },
    {
      name: 'powers',
      descrip: 'd4+presence/day',
      value: 1,
      rollsArray: '',
    },
    {
      name: 'silver',
      descrip: 'shrapnel waiting to happen',
      value: 0,
      rollsArray: '',
    }
  ];

  ngOnInit(): void {
    this.beastHP = 0;
    this.statsArray.forEach(stat => {
      this.rerollStat(stat.name);
    });
    this.vitalsArray.forEach(vital => {
      this.rerollVital(vital.name)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['job'] && !changes['job'].firstChange) {
      this.rerollAll();
    }
    if (changes['beastHP'] && changes['beastHP'].currentValue > 0) {
      const hpIndex = this.vitalsArray.findIndex(vital => vital.name === 'hp');
      if (hpIndex !== undefined && this.vitalsArray[hpIndex].value) {
        this.vitalsArray[hpIndex].value -= changes['beastHP'].previousValue;
        this.vitalsArray[hpIndex].value += this.beastHP;
      }
    }
    if (changes['promoteGrvnt'] && !changes['promoteGrvnt'].firstChange) {
      this.grvntPromotor();
    }
    if (changes['clearPromos'] && !changes['clearPromos'].firstChange) {
      this.statsArray.forEach((stat, index, array) => {
        array[index].promoRolls = '';
      });
      const vitalsHP = this.vitalsArray[this.vitalsArray.findIndex(vital => vital.name === 'hp')];
      vitalsHP.promoRolls = '';
    }
  }

  private grvntPromotor() {
    const currentHP = this.vitalsArray.find(vital => vital.name === 'hp');
    const rollTotal = this.random.rollMultipleDie(6, 10);
    const getNewHP = rollTotal >= currentHP?.value!;
    const vitalsHP = this.vitalsArray[this.vitalsArray.findIndex(vital => vital.name === 'hp')];

    vitalsHP.promoRolls = `<div>Roll Total (6d10): ${rollTotal}</div>`;
    if (getNewHP) {
      const extraHPValue = this.random.getRandomNumber(1, 6);
      vitalsHP.value = currentHP?.value! + extraHPValue;
      vitalsHP.promoRolls = vitalsHP.promoRolls + `<div>Additional HP (+d6): ${extraHPValue}</div>`;
    }

    //roll for new stats
    this.statsArray.forEach((stat, index, array) => {
      const rollToCompare = this.random.getRandomNumber(1, 6);

      array[index].promoRolls = `
          <div>Previous Value: ${stat.value} || Roll to Compare: ${rollToCompare}</div>
        `;
      if (stat.value <= 1) {
        //always increase unless the rollToCompare is 1
        if (rollToCompare !== 1) {
          array[index].value = stat.value + 1;
        } else {
          array[index].value = stat.value - 1 === -4 ? -3 : stat.value - 1;
        }
      } else {
        if (stat.value <= rollToCompare) {
          array[index].value = stat.value + 1 === 7 ? 6 : stat.value + 1;
        } else {
          array[index].value = stat.value - 1 === -4 ? -3 : stat.value - 1;
        }
      }
    });
  }

  rerollAll() {
    this.statsArray.forEach(stat => {
      stat.value = 0;
      stat.rollsArray = [];
      stat.statMod = '';
    });

    this.vitalsArray.forEach(vital => {
      vital.rollsArray = '';
      if (vital.value) {
        vital.value = 0;
      } else if (vital.valueObj) {
        vital.valueObj.current = 0;
        vital.valueObj.die = 'd2';
      }
    });
    this.statsArray.forEach(stat => {
      this.rerollStat(stat.name);
    });
    
    this.vitalsArray.forEach(vital => {
      this.rerollVital(vital.name)
    });
  }

  rerollVital(vitalName: string) {
    const vital = this.vitalsArray.find(vital => vital.name === vitalName);
    if (vital) {
      const jobMod = this.job.stats.find((mod: {name: string}) => mod.name === vital.name);
      if (vital.name === 'hp') {
        const roll = this.random.getRandomNumber(1, jobMod.mod);
        const toughness = this.statsArray.find(stat => stat.name === 'toughness')?.value;
        
        if (toughness !== undefined) {
          vital.rollsArray = `${roll} ${toughness < 0 ? '' : '+'} ${toughness}`;
          vital.value = roll + toughness > 0 ? roll + toughness + this.beastHP : 1 + this.beastHP;
        }
      } else if (vital.name === 'omens') {
        const roll = this.random.getRandomNumber(1, jobMod.mod);
        if (vital.valueObj) {
          vital.valueObj.current = roll;
          vital.valueObj.die = `d${jobMod.mod}`;
        }
      } else if (vital.name === 'silver') {
        const numberOfDie = Number(jobMod.mod[0]);
        const dieSize = Number(
          jobMod.mod.slice(
            jobMod.mod.indexOf('d') + 1, jobMod.mod.indexOf('x')
          )
        );
        const multiplier = Number(
          jobMod.mod.slice(
            jobMod.mod.indexOf('x') + 1
          )
        );
        const roll = this.random.rollMultipleDie(numberOfDie, dieSize);

        vital.rollsArray = `${roll} x ${multiplier}`;
        vital.value = roll * multiplier;
      } else if (vital.name === 'powers') {
        const roll = this.random.getRandomNumber(1, 4);
        const presence = this.statsArray.find(stat => stat.name === 'presence')?.value;
        if (presence !== undefined) {
          vital.rollsArray = `${roll} ${presence < 0 ? '' : '+'} ${presence}`;
          vital.value = roll + presence;
        }
      }
    }
  }

  rerollStat(statName: string) {
    const stat = this.statsArray.find(stat => stat.name === statName);
    if (stat) {
      stat.value = 0;
      stat.rollsArray = [];
      //get numbers
      let rawRoll = 0;
      for (let i = 0; i < 3; i++) {
        const roll = this.random.getRandomNumber(1, 6);
        stat.rollsArray.push(roll);
        rawRoll += roll;
      };
      const jobMod = this.job.stats.find((mod: { name: string; }) => mod.name === stat.name);
      if (jobMod) {
        stat.statMod = !jobMod.mod.toString().includes('-') ? `+${jobMod.mod}` : jobMod.mod;
        rawRoll += jobMod.mod;
      }
      // convert rawRoll according to table
      stat.value = this.getModifierFromRawRoll(rawRoll);
      if (statName === 'presence') {
        this.presence.emit(stat.value);
      }
      if (statName === 'toughness') {
        const hp = this.vitalsArray.find(vital => vital.name === 'hp');
        if (hp && hp.rollsArray) {
          const currentHPRoll = Number(hp.rollsArray[0]);
          const newHP = currentHPRoll + stat.value;
          
          //beastHP is 0 if not a beast, or positive if it is
          hp.value = newHP + this.beastHP;
          hp.rollsArray = `${currentHPRoll} ${stat.value < 0 ? '' : '+'} ${stat.value}`;
        }
      }
    } else {
      console.error('undefined');
    }
  }

  private getModifierFromRawRoll(rawRoll: number): number {
    switch (true) {
      case rawRoll <= 4: {
        return -3;
      }
      case rawRoll === 5 || rawRoll === 6: {
        return -2;
      }
      case rawRoll === 7 || rawRoll === 8: {
        return -1;
      }
      case rawRoll >= 9 && rawRoll <= 12: {
        return 0;
      }
      case rawRoll === 13 || rawRoll === 14: {
        return 1;
      }
      case rawRoll === 15 || rawRoll === 16: {
        return 2;
      }
      case rawRoll >= 17 && rawRoll <= 20: {
        return 3;
      }
      default:
        return -5;
    }
  }
}
