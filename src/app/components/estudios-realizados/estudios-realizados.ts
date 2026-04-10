import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { estudios_realizadosCreate, estudios_realizadosResponse } from '../../models/estudios_realizados';
import { docenteResponse } from '../../models/docente';
import { EstudiosRealizadosService } from '../../services/estudios-realizados.service';


@Component({
  selector: 'app-estudios-realizados',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './estudios-realizados.html',
  styleUrl: './estudios-realizados.css',
})
export class EstudiosRealizados implements OnInit {
  listaEstudiosRealizados: estudios_realizadosResponse[] = [];
  listaDocentes: docenteResponse[] = [];

  Formulario: estudios_realizadosCreate = {
    nombreSP: "",
    id: 0,
    titulo: "",
    universidad: "",
    fecha: new Date(),
    tipo: "",
    ciudad: "",
    docente: 0,
    ins_acreditada: 0,
    metodologia: "",
    perfil_egresado: "",
    pais: ""
  }
  modoFormulario: 'crear' | 'editar' | null = null;
  
  constructor(private estudiosService: EstudiosRealizadosService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.cargarEstudiosRealizados();
    this.cargarDocentes();
  }

  cargarEstudiosRealizados(): void {
    this.estudiosService.getEstudiosRealizados().subscribe({
      next: (response: any) => {
        this.listaEstudiosRealizados = (response?.resultados ?? (Array.isArray(response) ? response : [])) as estudios_realizadosResponse[];
        for(let registro of this.listaEstudiosRealizados){
          registro.docente = JSON.parse(registro.docente);
        }
        this.cdr.detectChanges();
        console.log(this.listaEstudiosRealizados);
      },
      error: (err) => console.error('Error al cargar estudios realizados:', err)
    });
  }

  cargarDocentes(): void {
    this.estudiosService.getDocentes().subscribe({
      next: (response: any) => {
        this.listaDocentes = (response?.datos ?? (Array.isArray(response) ? response : [])) as docenteResponse[];
        this.cdr.detectChanges();
        console.log(this.listaDocentes);
      },
      error: (err) => console.error('Error al cargar docentes:', err)
    });
  }

  eliminar(datos: estudios_realizadosResponse) {
    this.estudiosService.eliminarEstudiosRealizados({nombreSP: '', id: datos.id}).subscribe({
      next: () => {
        this.cargarEstudiosRealizados();
      },
      error: (err) => console.error('Error al eliminar estudio realizado:', err)
    });
  }

  abrirCrear() {
    this.modoFormulario = 'crear';
    this.Formulario = {
      nombreSP: "",
      id: 0,
      titulo: "",
      universidad: "",
      fecha: new Date(),
      tipo: "",
      ciudad: "",
      docente: 0,
      ins_acreditada: 0,
      metodologia: "",
      perfil_egresado: "",
      pais: ""
    }
  }
  
  abrirEditar(datos: estudios_realizadosResponse) {
    this.modoFormulario = 'editar';
    this.Formulario = {
      nombreSP: "",
      id: datos.id,
      titulo: datos.titulo,
      universidad: datos.universidad,
      fecha: new Date(datos.fecha),
      tipo: datos.tipo,
      ciudad: datos.ciudad,
      docente: datos.docente.cedula,
      ins_acreditada: datos.ins_acreditada,
      metodologia: datos.metodologia,
      perfil_egresado: datos.perfil_egresado,
      pais: datos.pais
    }
  } 

  guardar() {
    if (this.modoFormulario === 'crear') {
      this.estudiosService.crearEstudiosRealizados(this.Formulario).subscribe({
        next: () => {
          this.cargarEstudiosRealizados();
          this.modoFormulario = null;
        },
        error: (err) => console.error('Error al crear estudio realizado:', err)
      });
    } else {
      
      this.estudiosService.actualizarEstudiosRealizados(this.Formulario).subscribe({
        next: () => {
          this.cargarEstudiosRealizados();
          this.modoFormulario = null;
        },
        error: (err) => console.error('Error al actualizar estudio realizado:', err)
      });
    }
  }

  cancelar() {
    this.modoFormulario = null;
    this.Formulario = {
      nombreSP: "",
      id: 0,
      titulo: "",
      universidad: "",
      fecha: new Date(),
      tipo: "",
      ciudad: "",
      docente: 0,
      ins_acreditada: 0,
      metodologia: "",
      perfil_egresado: "",
      pais: ""
    } 
  }

}
