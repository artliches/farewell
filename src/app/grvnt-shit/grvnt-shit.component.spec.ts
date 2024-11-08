import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrvntShitComponent } from './grvnt-shit.component';

describe('GrvntShitComponent', () => {
  let component: GrvntShitComponent;
  let fixture: ComponentFixture<GrvntShitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrvntShitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrvntShitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
