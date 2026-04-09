import { Component, OnInit } from '@angular/core';
import { DocenteDepartamentoService } from '../../services/docente-departamento.service';
import { CommonModule } from '@angular/common';
import { docente_departamentoResponse, docente_departamento_create } from '../../models/docente_departamento';
import { programa } from '../../models/programa';
import { docenteResponse } from '../../models/docente';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-docente-departamento.component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './docente-departamento.component.html',
  styleUrl: './docente-departamento.component.css',
})
export class DocenteDepartamentoComponent implements OnInit{

  listaDocenteDepartamento: docente_departamentoResponse[] = [];
  listaDocentes: docenteResponse[] = [];
  listaDepartamentos: programa[] = [];

  Formulario: docente_departamento_create = {
    nombreSP:"",
    docente:0,
    departamento:0,
    dedicacion:"",
    modalidad:"",
    fecha_ingreso:new Date(),
    fecha_salida:new Date()
  }
  modoFormulario: 'crear' | 'editar' | null = null;


  constructor(private docenteDepartamentoService: DocenteDepartamentoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarDocenteDepartamento();
    this.cargarDocentes();
    this.cargarDepartamentos();
  }

  cargarDocenteDepartamento(): void {
    this.docenteDepartamentoService.getDocenteDepartamentos().subscribe({
      next: (response: any) => {
        this.listaDocenteDepartamento = (response?.resultados ?? (Array.isArray(response) ? response : [])) as docente_departamentoResponse[];
        for(let registro of this.listaDocenteDepartamento){
          registro.docente = JSON.parse(registro.docente);
          registro.departamento = JSON.parse(registro.departamento);
        }
        this.cdr.detectChanges();
        console.log(this.listaDocenteDepartamento);
      },
      error: (err) => console.error('Error al cargar docentes:', err)
    });
  }

  cargarDocentes(): void {
    this.docenteDepartamentoService.getDocentes().subscribe({
      next: (response: any) => {
        this.listaDocentes = (response?.datos ?? (Array.isArray(response) ? response : [])) as docenteResponse[];
        this.cdr.detectChanges();
        console.log(this.listaDocentes);
      },
      error: (err) => console.error('Error al cargar docentes:', err)
    });
  }

  cargarDepartamentos(): void {
    this.docenteDepartamentoService.getDepartamentos().subscribe({
      next: (response: any) => {
        this.listaDepartamentos = (response?.datos ?? (Array.isArray(response) ? response : [])) as programa[];
        this.cdr.detectChanges();
        console.log(this.listaDepartamentos);
      },
      error: (err) => console.error('Error al cargar departamentos:', err)
    });
  }

  eliminar(datos: docente_departamentoResponse){
    this.docenteDepartamentoService.eliminarDocenteDepartamento({nombreSP:'', docente:datos.docente.cedula, departamento:datos.departamento.id}).subscribe({
      next: () => {
        this.cargarDocenteDepartamento();
      },
      error: (err) => console.error('Error al eliminar docente:', err)
    }); 
  }


  abrirCrear(){
    this.modoFormulario = 'crear';
    this.Formulario = {
      nombreSP:"",
      docente:0,
      departamento:0,
      dedicacion:"",
      modalidad:"",
      fecha_ingreso:new Date(),
      fecha_salida:new Date()
    }

  }

  abrirEditar(registro: docente_departamentoResponse){
    this.modoFormulario = 'editar';
    this.Formulario = {
      nombreSP:"",
      docente:registro.docente.cedula,
      departamento:registro.departamento.id,
      dedicacion:registro.dedicacion,
      modalidad:registro.modalidad,
      fecha_ingreso:registro.fecha_ingreso,
      fecha_salida:registro.fecha_salida
    }
  }

  guardar(){
    if(this.modoFormulario === 'crear'){
      
      this.docenteDepartamentoService.crearDocenteDepartamento(this.Formulario).subscribe({
        next: () => {
          this.cargarDocenteDepartamento();
        },
        error: (err) => console.error('Error al crear docente:', err)
      });
    }else{
      this.docenteDepartamentoService.actualizarDocenteDepartamento(this.Formulario).subscribe({
        next: () => {
          this.cargarDocenteDepartamento();
        },
        error: (err) => console.error('Error al actualizar docente:', err)
      });
    }
  }

  cancelar(){
    this.modoFormulario = null;
    this.Formulario = {
      nombreSP:"",
      docente:0,
      departamento:0,
      dedicacion:"",
      modalidad:"",
      fecha_ingreso:new Date(),
      fecha_salida:new Date()
    }
  }
}
