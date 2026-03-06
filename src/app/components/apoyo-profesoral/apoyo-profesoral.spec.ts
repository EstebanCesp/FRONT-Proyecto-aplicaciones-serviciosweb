import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApoyoProfesoral } from './apoyo-profesoral';

describe('ApoyoProfesoral', () => {
  let component: ApoyoProfesoral;
  let fixture: ComponentFixture<ApoyoProfesoral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApoyoProfesoral],
    }).compileComponents();

    fixture = TestBed.createComponent(ApoyoProfesoral);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
