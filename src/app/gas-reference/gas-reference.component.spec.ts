import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasReferenceComponent } from './gas-reference.component';

describe('GasReferenceComponent', () => {
  let component: GasReferenceComponent;
  let fixture: ComponentFixture<GasReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GasReferenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GasReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
