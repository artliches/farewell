import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadMakerComponent } from './squad-maker.component';

describe('SquadMakerComponent', () => {
  let component: SquadMakerComponent;
  let fixture: ComponentFixture<SquadMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadMakerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquadMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
