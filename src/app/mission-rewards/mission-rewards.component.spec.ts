import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionRewardsComponent } from './mission-rewards.component';

describe('MissionRewardsComponent', () => {
  let component: MissionRewardsComponent;
  let fixture: ComponentFixture<MissionRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionRewardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
