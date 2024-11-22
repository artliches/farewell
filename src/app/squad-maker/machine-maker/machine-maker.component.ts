import { Component, OnInit } from '@angular/core';
import { RandomNumberService } from '../../random-number.service';
import { MACHINES } from '../../assets/squads.constants';

@Component({
  selector: 'app-machine-maker',
  standalone: true,
  imports: [],
  templateUrl: './machine-maker.component.html',
  styleUrl: './machine-maker.component.scss'
})
export class MachineMakerComponent implements OnInit {
  constructor(
    private random: RandomNumberService
  ) {}

  machineObj: {name: string, hp: number | string, morale: number | string, weapon: string, armor: string, special: string} = {
    name: '',
    hp: 0,
    morale: '-',
    weapon: '',
    armor: '',
    special: '',
  };

  ngOnInit(): void {
      this.random.shuffleArray(MACHINES);
      this.rerollMachine();
  }

  rerollMachine() {
    let newIndex = MACHINES.findIndex(machine => machine.name === this.machineObj.name);

    if (newIndex + 1 === MACHINES.length) {
      newIndex = 0;
    } else {
      do {
        newIndex++;
      } while (MACHINES[newIndex].name === this.machineObj.name);
    }

    this.machineObj = MACHINES[newIndex];
  }
}
