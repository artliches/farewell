import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineMakerComponent } from './machine-maker.component';

describe('MachineMakerComponent', () => {
  let component: MachineMakerComponent;
  let fixture: ComponentFixture<MachineMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachineMakerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
