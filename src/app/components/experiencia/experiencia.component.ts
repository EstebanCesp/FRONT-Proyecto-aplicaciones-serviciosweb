import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExperienciaService } from '../../services/experiencia.service';
import { experienciasp_create, experienciasp_delete, experienciasp_update } from '../../models/experiencia';

@Component({
  selector: 'app-experiencia',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experiencias: any[] = [];
  docentes: any[] = [];
  modoFormulario: 'crear' | 'editar' | null = null;

  formulario: experienciasp_update = {
    nombreSP: '', id: 0, docente: 0,
    nombre_cargo: '', institucion: '', tipo: '',
    fecha_inicio: '', fecha_fin: null
  };

  constructor(private experienciaService: ExperienciaService) {}

  ngOnInit(): void {
    this.cargarExperiencias();
    this.experienciaService.getDocentes().subscribe((data: any) => {
      this.docentes = data;
    });
  }

  cargarExperiencias(): void {
    this.experienciaService.getExperiencias().subscribe((data: any) => {
      this.experiencias = data;
    });
  }

  abrirCrear(): void {
    this.modoFormulario = 'crear';
    this.formulario = {
      nombreSP: '', id: 0, docente: 0,
      nombre_cargo: '', institucion: '', tipo: '',
      fecha_inicio: '', fecha_fin: null
    };
  }

  abrirEditar(e: any): void {
    this.modoFormulario = 'editar';
    this.formulario = {
      nombreSP: '',
      id: e.id,
      docente: e.docente?.cedula ?? e.docente,
      nombre_cargo: e.nombre_cargo,
      institucion: e.institucion,
      tipo: e.tipo,
      fecha_inicio: e.fecha_inicio,
      fecha_fin: e.fecha_fin
    };
  }

  guardar(): void {
    if (this.modoFormulario === 'crear') {
      const crear: experienciasp_create = { ...this.formulario };
      this.experienciaService.crearExperiencia(crear).subscribe(() => {
        this.cargarExperiencias();
        this.modoFormulario = null;
      });
    } else {
      this.experienciaService.actualizarExperiencia({ ...this.formulario }).subscribe(() => {
        this.cargarExperiencias();
        this.modoFormulario = null;
      });
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta experiencia?')) {
      const data: experienciasp_delete = { nombreSP: 'sp_eliminar_experiencia', id };
      this.experienciaService.eliminarExperiencia(data).subscribe(() => {
        this.cargarExperiencias();
      });
    }
  }

  cancelar(): void { this.modoFormulario = null; }
}