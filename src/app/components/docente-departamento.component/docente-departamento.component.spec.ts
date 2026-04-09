import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteDepartamentoComponent } from './docente-departamento.component';

describe('DocenteDepartamentoComponent', () => {
  let component: DocenteDepartamentoComponent;
  let fixture: ComponentFixture<DocenteDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteDepartamentoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocenteDepartamentoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
