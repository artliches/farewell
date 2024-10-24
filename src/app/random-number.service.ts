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
}
