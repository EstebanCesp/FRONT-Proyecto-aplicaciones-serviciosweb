import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReconocimientoService } from '../../services/Reconocimiento.service';
import { reconocimientosp_create, reconocimientosp_delete, reconocimientosp_update } from '../../models/Reconocimiento';

@Component({
  selector: 'app-reconocimiento',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './Reconocimiento.component.html',
  styleUrls: ['./Reconocimiento.component.css']
})
export class ReconocimientoComponent implements OnInit {

  reconocimientos: any[] = [];
  docentes: any[] = [];
  modoFormulario: 'crear' | 'editar' | null = null;

  formulario: reconocimientosp_update = {
    nombreSP: '', id: 0, docente: 0,
    tipo: '', fecha: '', institucion: '', nombre: '', ambito: ''
  };

  constructor(private reconocimientoService: ReconocimientoService) {}

  ngOnInit(): void {
    this.cargarReconocimientos();
    this.reconocimientoService.getDocentes().subscribe((data: any) => {
      this.docentes = data;
    });
  }

  cargarReconocimientos(): void {
    this.reconocimientoService.getReconocimientos().subscribe((data: any) => {
      this.reconocimientos = data;
    });
  }

  abrirCrear(): void {
    this.modoFormulario = 'crear';
    this.formulario = { nombreSP: '', id: 0, docente: 0, tipo: '', fecha: '', institucion: '', nombre: '', ambito: '' };
  }

  abrirEditar(r: any): void {
    this.modoFormulario = 'editar';
    this.formulario = {
      nombreSP: '', id: r.id,
      docente: r.docente?.cedula ?? r.docente,
      tipo: r.tipo, fecha: r.fecha,
      institucion: r.institucion, nombre: r.nombre, ambito: r.ambito
    };
  }

  guardar(): void {
    if (this.modoFormulario === 'crear') {
      const crear: reconocimientosp_create = { ...this.formulario };
      this.reconocimientoService.crearReconocimiento(crear).subscribe(() => {
        this.cargarReconocimientos();
        this.modoFormulario = null;
      });
    } else {
      this.reconocimientoService.actualizarReconocimiento({ ...this.formulario }).subscribe(() => {
        this.cargarReconocimientos();
        this.modoFormulario = null;
      });
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este reconocimiento?')) {
      const data: reconocimientosp_delete = { nombreSP: 'sp_eliminar_reconocimiento', id };
      this.reconocimientoService.eliminarReconocimiento(data).subscribe(() => {
        this.cargarReconocimientos();
      });
    }
  }

  cancelar(): void { this.modoFormulario = null; }
}