import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EvaluacionDocenteComponent } from './evaluacion_docente.component';

describe('EvaluacionDocenteComponent', () => {
  let component: EvaluacionDocenteComponent;
  let fixture: ComponentFixture<EvaluacionDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionDocenteComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluacionDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});