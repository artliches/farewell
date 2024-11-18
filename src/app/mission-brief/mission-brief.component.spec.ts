import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionBriefComponent } from './mission-brief.component';

describe('MissionBriefComponent', () => {
  let component: MissionBriefComponent;
  let fixture: ComponentFixture<MissionBriefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionBriefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
