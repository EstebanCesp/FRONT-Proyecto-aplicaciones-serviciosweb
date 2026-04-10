import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiosRealizados } from './estudios-realizados';

describe('EstudiosRealizados', () => {
  let component: EstudiosRealizados;
  let fixture: ComponentFixture<EstudiosRealizados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudiosRealizados],
    }).compileComponents();

    fixture = TestBed.createComponent(EstudiosRealizados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
