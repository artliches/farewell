import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomNumberService {

  constructor() { }

  shuffleArray(array: Array<any>): Array<any> {
    let i = array.length,
    j = 0,
    temp;

    while (i--) {
      j = Math.floor(Math.random() * (i+1));

      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  rollMultipleDie(numDie: number, dieSize: number): number {
    let sumOfRolls = 0;
    for (let i = 0; i < numDie; i++) {
      sumOfRolls += this.getRandomNumber(1, dieSize);
    }
    return sumOfRolls;
  }
}
