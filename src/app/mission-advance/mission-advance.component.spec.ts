import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionAdvanceComponent } from './mission-advance.component';

describe('MissionAdvanceComponent', () => {
  let component: MissionAdvanceComponent;
  let fixture: ComponentFixture<MissionAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionAdvanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
