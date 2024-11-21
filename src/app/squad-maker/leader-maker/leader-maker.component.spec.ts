import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderMakerComponent } from './leader-maker.component';

describe('LeaderMakerComponent', () => {
  let component: LeaderMakerComponent;
  let fixture: ComponentFixture<LeaderMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderMakerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
