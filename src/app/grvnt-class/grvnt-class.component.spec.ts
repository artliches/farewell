import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrvntClassComponent } from './grvnt-class.component';

describe('GrvntClassComponent', () => {
  let component: GrvntClassComponent;
  let fixture: ComponentFixture<GrvntClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrvntClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrvntClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
