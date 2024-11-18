import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionAftermathComponent } from './mission-aftermath.component';

describe('MissionAftermathComponent', () => {
  let component: MissionAftermathComponent;
  let fixture: ComponentFixture<MissionAftermathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionAftermathComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionAftermathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
