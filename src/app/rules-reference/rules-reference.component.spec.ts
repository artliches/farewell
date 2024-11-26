import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesReferenceComponent } from './rules-reference.component';

describe('RulesReferenceComponent', () => {
  let component: RulesReferenceComponent;
  let fixture: ComponentFixture<RulesReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesReferenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulesReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
