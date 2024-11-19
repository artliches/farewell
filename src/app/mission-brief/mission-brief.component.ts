import { Component, OnInit } from '@angular/core';
import { RandomNumberService } from '../random-number.service';
import { BEGGARS_INTROS, BEGGARS_TWISTS, COMBATANT_OBJECTIVE, FAITHSPIRE_INTROS, FAITHSPIRE_TWISTS, LOCATION, MAD_INTROS, MAD_TWISTS, MATERIAL_OBJECTIVE, NONCOMBAT_OBJECTIVE, STRUCTURE_OBJECTIVE, TIME, TIME_LIMIT, WHITE_INTRO, WHITE_TWISTS } from '../assets/missions.constants';

@Component({
  selector: 'app-mission-brief',
  standalone: true,
  imports: [],
  templateUrl: './mission-brief.component.html',
  styleUrl: './mission-brief.component.scss'
})

export class MissionBriefComponent implements OnInit {
  constructor(
    private random: RandomNumberService
  ) {}

  briefObj: {intro: string, location: string, time: string} = {
    intro: '',
    location: '',
    time: '',
  };

  missionObjectivesList = ['material', 'non-combatant', 'combatant', 'structure'];
  missionObjectives: {objective: string, target: string, type: string, currIndex: number}[] = [];

  twistsList = ['faithspire', 'beggars', 'mad', 'white'];
  twists: {type: string, descrips: string[]} = {
    type: '',
    descrips: []
  };

  ngOnInit(): void {
    this.rerollMission();
    this.rerollTwists();

    // lets get a few different intros for the opposition
    this.rerollBriefSummary();
  }

  private rerollBriefSummary() {
    switch (true) {
      case this.twists.type === 'faithspire': {
        this.random.shuffleArray(FAITHSPIRE_INTROS);
        this.briefObj.intro = FAITHSPIRE_INTROS[0];
        break;
      }
      case this.twists.type === 'beggars': {
        this.random.shuffleArray(BEGGARS_INTROS);
        this.briefObj.intro = BEGGARS_INTROS[0];
        break;
      }
      case this.twists.type === 'mad': {
        this.random.shuffleArray(MAD_INTROS);
        this.briefObj.intro = MAD_INTROS[0];
        break;
      }
      case this.twists.type === 'white': {
        this.random.shuffleArray(WHITE_INTRO);
        this.briefObj.intro = WHITE_INTRO[0];
        break;
      }
    }

    this.briefObj.location = this.random.shuffleArray(LOCATION)[0];
    this.briefObj.time = this.random.shuffleArray(TIME_LIMIT)[0];
  }

  rerollAll() {
    this.rerollMission();
    this.rerollTwists();
    this.rerollBriefSummary();
  }

  rerollIndividualBrief(sectionToReroll: string) {
    const section = sectionToReroll === 'intro' ? 'intro' : sectionToReroll === 'location' ? 'location' : 'time';

    let arrayToCompare: string[] = [];
    switch (true) {
      case section === 'intro': {
        switch (true) {
          case this.twists.type === 'faithspire': {
            arrayToCompare = FAITHSPIRE_INTROS;
            break;
          }
          case this.twists.type === 'beggars': {
            arrayToCompare = BEGGARS_INTROS;
            break;
          }
          case this.twists.type === 'mad': {
            arrayToCompare = MAD_INTROS
            break;
          }
          case this.twists.type === 'white': {
            arrayToCompare = WHITE_INTRO;
            break;
          }
        }
        break;
      }
      case section === 'location': {
        arrayToCompare = LOCATION;
        break;
      }
      case section === 'time': {
        arrayToCompare = TIME_LIMIT;
        break;
      }
      default: break;
    }

    let newIndex = arrayToCompare.indexOf(this.briefObj[section]);
    if (newIndex + 1 === arrayToCompare.length) {
      newIndex = 0;
    } else {
      do {
        newIndex += 1;
      } while (this.briefObj[section] === arrayToCompare[newIndex]);
    }

    this.briefObj[section] = arrayToCompare[newIndex];
  }

  rerollIndividualTwist(index: number) {
    const twistType = this.twists.type;
    let newIndex = -1;
    switch (true) {
      case twistType === 'faithspire': {
        do {
          newIndex += 1;
        } while (this.twists.descrips.some(twist => twist === FAITHSPIRE_TWISTS[newIndex]));
        this.twists.descrips[index] = FAITHSPIRE_TWISTS[newIndex];
        break;
      }
      case twistType === 'beggars': {
        do {
          newIndex += 1;
        } while (this.twists.descrips.some(twist => twist === BEGGARS_TWISTS[newIndex]));
        this.twists.descrips[index] = BEGGARS_TWISTS[newIndex];
        break;
      }
      case twistType === 'mad': {
        do {
          newIndex += 1;
        } while (this.twists.descrips.some(twist => twist === MAD_TWISTS[newIndex]));
        this.twists.descrips[index] = MAD_TWISTS[newIndex];
        break;
      }
      case twistType === 'white': {
        do {
          newIndex += 1;
        } while (this.twists.descrips.some(twist => twist === WHITE_TWISTS[newIndex]));
        this.twists.descrips[index] = WHITE_TWISTS[newIndex];
        break;
      }
    }
  }

  rerollTwists() {
    this.twists = {
      type: '',
      descrips: []
    };
    this.random.shuffleArray(this.twistsList);
    const chosenTwistArray = this.twistsList[0];
    this.twists.type = chosenTwistArray;

    switch (true) {
      case chosenTwistArray === 'faithspire': {
        this.random.shuffleArray(FAITHSPIRE_TWISTS);
        for (let i = 0; i < 3; i++) {
          this.twists.descrips.push(FAITHSPIRE_TWISTS[i]);
        }
        break;
      }
      case chosenTwistArray === 'beggars': {
        this.random.shuffleArray(BEGGARS_TWISTS);
        for (let i = 0; i < 3; i++) {
          this.twists.descrips.push(BEGGARS_TWISTS[i]);
        }
        break;
      }
      case chosenTwistArray === 'mad': {
        this.random.shuffleArray(MAD_TWISTS);
        for (let i = 0; i < 3; i++) {
          this.twists.descrips.push(MAD_TWISTS[i]);
        }
        break;
      }
      case chosenTwistArray === 'white': {
        this.random.shuffleArray(WHITE_TWISTS);
        for (let i = 0; i < 3; i++) {
          this.twists.descrips.push(WHITE_TWISTS[i]);
        }
        break;
      }
    }
  }

  rerollIndividualMissionPart(index: number, missionPart: string) {
    const missionType = this.missionObjectives[index]['type'];
    const arrayIndex = missionPart === 'objective' ? 0 : 1;
    const part = missionPart === 'objective' ? 'objective': 'target';

    switch (true) {
      case missionType === 'material': {
        let newIndex = MATERIAL_OBJECTIVE[arrayIndex]
          .indexOf(this.missionObjectives[index][part]);

        if (newIndex + 1 === MATERIAL_OBJECTIVE[arrayIndex].length) {
          newIndex = 0;
        } else {
          newIndex += 1;
        }

        this.missionObjectives[index][part] = MATERIAL_OBJECTIVE[arrayIndex][newIndex];
        break;
      }
      case missionType === 'non-combatant': {
        let newIndex = NONCOMBAT_OBJECTIVE[arrayIndex]
          .indexOf(this.missionObjectives[index][part]);

        if (newIndex + 1 === NONCOMBAT_OBJECTIVE[arrayIndex].length) {
          newIndex = 0;
        } else {
          newIndex += 1;
        }

        this.missionObjectives[index][part] = NONCOMBAT_OBJECTIVE[arrayIndex][newIndex];
        break;
      }
      case missionType === 'combatant': {
        let newIndex = COMBATANT_OBJECTIVE[arrayIndex]
          .indexOf(this.missionObjectives[index][part]);

        if (newIndex + 1 === COMBATANT_OBJECTIVE[arrayIndex].length) {
          newIndex = 0;
        } else {
          newIndex += 1;
        }

        this.missionObjectives[index][part] = COMBATANT_OBJECTIVE[arrayIndex][newIndex];
        break;
      }
      case missionType === 'structure': {
        let newIndex = STRUCTURE_OBJECTIVE[arrayIndex]
          .indexOf(this.missionObjectives[index][part]);

        if (newIndex + 1 === STRUCTURE_OBJECTIVE[arrayIndex].length) {
          newIndex = 0;
        } else {
          newIndex += 1;
        }

        this.missionObjectives[index][part] = STRUCTURE_OBJECTIVE[arrayIndex][newIndex];
        break;
      }
      default: break;
    }
  }

  rerollMission() {
    this.missionObjectives = [];
    this.random.shuffleArray(this.missionObjectivesList);
    for (let i = 0; i < 3; i++) {
      const mission = this.missionObjectivesList[i];
      this.missionObjectives.push(this.getObjectiveAndTarget(mission));
    }
  }

  private getObjectiveAndTarget(missionType: string, missionPart?: string): any {
    switch (true) {
      case missionType === 'material': {
        for (let i = 0; i < MATERIAL_OBJECTIVE.length; i++) {
          this.random.shuffleArray(MATERIAL_OBJECTIVE[i]);
        }
        return {
          objective: MATERIAL_OBJECTIVE[0][0],
          target: MATERIAL_OBJECTIVE[1][0],
          type: missionType,
        };
      }
      case missionType === 'non-combatant': {
        for (let i = 0; i < NONCOMBAT_OBJECTIVE.length; i++) {
          this.random.shuffleArray(NONCOMBAT_OBJECTIVE[i]);
        }
        return {
          objective: NONCOMBAT_OBJECTIVE[0][0],
          target: NONCOMBAT_OBJECTIVE[1][0],
          type: missionType,
        };
      }
      case missionType === 'combatant': {
        for (let i = 0; i < COMBATANT_OBJECTIVE.length; i++) {
          this.random.shuffleArray(COMBATANT_OBJECTIVE[i]);
        }
        return {
          objective: COMBATANT_OBJECTIVE[0][0],
          target: COMBATANT_OBJECTIVE[1][0],
          type: missionType,
        };
      }
      case missionType === 'structure': {
        for (let i = 0; i < STRUCTURE_OBJECTIVE.length; i++) {
          this.random.shuffleArray(STRUCTURE_OBJECTIVE[i]);
        }
        return {
          objective: STRUCTURE_OBJECTIVE[0][0],
          target: STRUCTURE_OBJECTIVE[1][0],
          type: missionType,
        };
      }
      default: {
        return null
      }
    }
  }
}
