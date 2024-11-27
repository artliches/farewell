import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShockReferenceComponent } from './shock-reference.component';

describe('ShockReferenceComponent', () => {
  let component: ShockReferenceComponent;
  let fixture: ComponentFixture<ShockReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShockReferenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShockReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
