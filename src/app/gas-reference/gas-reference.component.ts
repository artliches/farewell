import { Component } from '@angular/core';
import { RandomNumberService } from '../random-number.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gas-reference',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gas-reference.component.html',
  styleUrl: './gas-reference.component.scss'
})
export class GasReferenceComponent {
  constructor(
    private random: RandomNumberService
  ) {}

  gasTable = [
  `<strong>MIRACULOUS IMMUNITY.</strong> You are unaffected`,
  `<strong>DROWNED LUNGS.</strong> If ever GASSED again, you <strong>Become GAS</strong>`,
  `<strong>FRACTURED MIND.</strong> You cannot use Omens`,
  `<strong>SEARED EYES.</strong> You cannot Aim`,
  `<strong>BOILED FLESH.</strong> All your Armor rolls are 1 (if you have Armor)`,
  `<strong>MELTED HANDS.</strong> You may only use the weapon you are holding, forever`,
  `<strong>RUINED BODY.</strong> Roll on the Downed table +2`,
  `<strong>BECOME GAS.</strong> Your body ascends from its solid state… (get weird with it)`,
  ];
  chosenGas: number = 0;

  rollGas() {
    this.chosenGas = this.random.getRandomNumber(1, 8);
  }
}
