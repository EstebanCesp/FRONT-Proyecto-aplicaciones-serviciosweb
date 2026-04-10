import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudioAc } from './estudio-ac';

describe('EstudioAc', () => {
  let component: EstudioAc;
  let fixture: ComponentFixture<EstudioAc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudioAc],
    }).compileComponents();

    fixture = TestBed.createComponent(EstudioAc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
