import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionActionComponent } from './mission-action.component';

describe('MissionActionComponent', () => {
  let component: MissionActionComponent;
  let fixture: ComponentFixture<MissionActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
