import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrvntVitalsComponent } from './grvnt-vitals.component';

describe('GrvntVitalsComponent', () => {
  let component: GrvntVitalsComponent;
  let fixture: ComponentFixture<GrvntVitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrvntVitalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrvntVitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
