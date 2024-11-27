import { Component } from '@angular/core';

@Component({
  selector: 'app-shock-reference',
  standalone: true,
  imports: [],
  templateUrl: './shock-reference.component.html',
  styleUrl: './shock-reference.component.scss'
})
export class ShockReferenceComponent {
  shockTable: string[] = [
    `<strong>THE SHAKES.</strong> Always have last Initiative`,
    `<strong>PRIMAL FEAR.</strong> Next SHOCK roll is d6`,
    `<strong>THOUSAND-LEAGUE STARE.</strong> Your mindlessness causes you to leave an item behind`,
    `<strong>VISIONS OF DEATH.</strong> -1 to all damage rolls`,
    `<strong>JAMMED.</strong> Cannot target for d2 rounds`,
    `<strong>BLIND FIRE.</strong> Immediately fire at the nearest enemy (DR16)`,
    `<strong>DESPAIR.</strong> Lose an Omen (if none to lose, Dark Thoughts)`,
    `<strong>DARK THOUGHTS.</strong> Damage self with your Sidearm`,
    `<strong>PANIC.</strong> Run screaming from battle to the nearest “safe” location and SHOCK nearby allies`,
    `<strong>CONFUSION.</strong> Attack nearest comrade with your strongest weapon`,
    `<strong>ABJECT SORROW.</strong> Lay down arms and run directly at the enemy`,
    `<strong>ENDGAME.</strong> Fall dead where you stand`,
  ];

}
