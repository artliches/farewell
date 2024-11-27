import { Component } from '@angular/core';
import { RandomNumberService } from '../random-number.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rules-reference',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rules-reference.component.html',
  styleUrl: './rules-reference.component.scss'
})
export class RulesReferenceComponent {
  constructor (
    private random: RandomNumberService
  ) {}

  chosenDowned: number = 0;
  chosenSpoils: number = 0;

  rerollDowned() {
    this.chosenDowned = this.random.getRandomNumber(1, 6);
  }

  rerollSpoils() {
    this.chosenSpoils = this.random.getRandomNumber(1, 10);
  }

}
