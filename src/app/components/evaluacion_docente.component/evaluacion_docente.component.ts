import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EvaluacionDocenteService } from '../../services/evaluacion-docente.service';
import { evaluacion_docente_create, evaluacion_docente_delete } from '../../models/evaluacion_docente';

@Component({
  selector: 'app-evaluacion-docente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './evaluacion_docente.component.html',
  styleUrls: ['./evaluacion_docente.component.css']
})
export class EvaluacionDocenteComponent implements OnInit {

  evaluaciones: any[] = [];
  docentes: any[] = [];
  modoFormulario: 'crear' | 'editar' | null = null;

  formulario: evaluacion_docente_create = {
    nombreSP: '', id: 0, docente: 0,
    calificacion: 0, semestre: ''
  };

  constructor(private evaluacionService: EvaluacionDocenteService) {}

  ngOnInit(): void {
    this.cargarEvaluaciones();
    this.evaluacionService.getDocentes().subscribe((data: any) => {
      this.docentes = data;
    });
  }

  cargarEvaluaciones(): void {
    this.evaluacionService.getEvaluacionDocentes().subscribe((data: any) => {
      this.evaluaciones = data;
    });
  }

  abrirCrear(): void {
    this.modoFormulario = 'crear';
    this.formulario = { nombreSP: '', id: 0, docente: 0, calificacion: 0, semestre: '' };
  }

  abrirEditar(e: any): void {
    this.modoFormulario = 'editar';
    this.formulario = {
      nombreSP: '',
      id: e.id,
      docente: e.docente?.cedula ?? e.docente,
      calificacion: e.calificacion,
      semestre: e.semestre
    };
  }

  guardar(): void {
    if (this.modoFormulario === 'crear') {
      this.evaluacionService.crearEvaluacionDocente({ ...this.formulario }).subscribe(() => {
        this.cargarEvaluaciones();
        this.modoFormulario = null;
      });
    } else {
      this.evaluacionService.actualizarEvaluacionDocente({ ...this.formulario }).subscribe(() => {
        this.cargarEvaluaciones();
        this.modoFormulario = null;
      });
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta evaluación?')) {
      const data: evaluacion_docente_delete = { nombreSP: 'sp_eliminar_evaluacion_docente', id };
      this.evaluacionService.eliminarEvaluacionDocente(data).subscribe(() => {
        this.cargarEvaluaciones();
      });
    }
  }

  cancelar(): void { this.modoFormulario = null; }
}