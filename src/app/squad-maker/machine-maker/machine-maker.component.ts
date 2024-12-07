import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../../random-number.service';
import { MACHINES } from '../../assets/squads.constants';
import { MachineObj, MachineSaveObj } from '../../grvnt-interfaces';

@Component({
  selector: 'app-machine-maker',
  standalone: true,
  imports: [],
  templateUrl: './machine-maker.component.html',
  styleUrl: './machine-maker.component.scss'
})
export class MachineMakerComponent implements OnInit, OnChanges {
  constructor(
    private random: RandomNumberService
  ) {}

  @Input() getNewMachines: boolean = false;
  @Input () rerollAttachments: boolean = false;
  @Input() machineSaveObj: MachineSaveObj = {} as MachineSaveObj;
  @Output() machineSaveObjEmitter: EventEmitter<any> = new EventEmitter();

  machineObj: MachineObj = {
    name: '',
    hp: 0,
    morale: '-',
    weapon: '',
    armor: '',
    special: '',
  };

  ngOnInit(): void {
      if (!this.machineSaveObj) {
        this.random.shuffleArray(MACHINES);
        this.rerollMachine();
      } else {
        this.machineObj = this.machineSaveObj.machineInfo;
      }

  }
  
  ngOnChanges(changes: SimpleChanges): void {
      if (
        (changes['getNewMachines'] && !changes['getNewMachines'].firstChange) ||
        (changes['rerollAttachments'] && !changes['rerollAttachments'].firstChange)
      ) {
        this.rerollMachine();
      }
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

    this.machineSaveObjEmitter.emit(this.machineObj);
  }
}
