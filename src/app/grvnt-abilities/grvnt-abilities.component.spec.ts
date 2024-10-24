import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrvntAbilitiesComponent } from './grvnt-abilities.component';

describe('GrvntAbilitiesComponent', () => {
  let component: GrvntAbilitiesComponent;
  let fixture: ComponentFixture<GrvntAbilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrvntAbilitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrvntAbilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
