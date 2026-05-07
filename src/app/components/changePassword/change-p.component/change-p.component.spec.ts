import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePComponent } from './change-p.component';

describe('ChangePComponent', () => {
  let component: ChangePComponent;
  let fixture: ComponentFixture<ChangePComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
