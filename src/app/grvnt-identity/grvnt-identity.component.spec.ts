import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrvntIdentityComponent } from './grvnt-identity.component';

describe('GrvntIdentityComponent', () => {
  let component: GrvntIdentityComponent;
  let fixture: ComponentFixture<GrvntIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrvntIdentityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrvntIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
