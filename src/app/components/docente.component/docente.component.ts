import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocentesService } from '../../services/docentes.service';
import { docenteResponse, docente_Create} from '../../models/docente';
import { linea_investigacion } from '../../models/linea_investigacion';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-docente.component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css',
})
export class DocenteComponent implements OnInit{

  listaDocentes: docenteResponse[] = [];
  listaLineasInvestigacion: linea_investigacion[] = [];

  Formulario: docente_Create = {
    nombreSP:"",
    cedula:0,
    nombres:"",
    apellidos:"",
    genero:"",
    cargo:"",
    fecha_nacimiento:new Date(),
    correo:"",
    telefono:"",
    url_cvlac:"",
    fecha_actualizacion:new Date(),
    escalafon:"",
    perfil:"",
    cat_minciencia:"",
    conv_minciencia:"",
    nacionalidaad:"",
    linea_investigacion:0
  }
  modoFormulario: 'crear' | 'editar' | null = null;

  constructor(private docenteService: DocentesService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.obtenerDocentes();
    this.obtenerLineasInvestigacion();
  }

  obtenerDocentes(){
    this.docenteService.getDocentes().subscribe({
      next: (response: any) => {
        this.listaDocentes = (response?.resultados ?? (Array.isArray(response) ? response : [])) as docenteResponse[];
        for(let registro of this.listaDocentes){
          registro.linea_investigacion = JSON.parse(registro.linea_investigacion);
        }
        this.cdr.detectChanges();
        console.log(this.listaDocentes);      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  obtenerLineasInvestigacion(){
    this.docenteService.getLineasInvestigacion().subscribe({
      next: (response: any) => {
        this.listaLineasInvestigacion = (response?.datos ?? (Array.isArray(response) ? response : [])) as linea_investigacion[];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  eliminar(datos: docenteResponse){
    this.docenteService.eliminarDocente({nombreSP:'', cedula:datos.cedula}).subscribe({
      next: () => {
        this.obtenerDocentes();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  abrirCrear(){
    this.modoFormulario = 'crear';
    this.Formulario = {
      nombreSP:"",
      cedula:0,
      nombres:"",
      apellidos:"",
      genero:"",
      cargo:"",
      fecha_nacimiento:new Date(),
      correo:"",
      telefono:"",
      url_cvlac:"",
      fecha_actualizacion:new Date(),
      escalafon:"",
      perfil:"",
      cat_minciencia:"",
      conv_minciencia:"",
      nacionalidaad:"",
      linea_investigacion:0
    }
  }
  abrirEditar(datos: docenteResponse){
    this.modoFormulario = 'editar';
    this.Formulario = {
      nombreSP:"",
      cedula:datos.cedula,
      nombres:datos.nombres,
      apellidos:datos.apellidos,
      genero:datos.genero,
      cargo:datos.cargo,
      fecha_nacimiento:datos.fecha_nacimiento,
      correo:datos.correo,
      telefono:datos.telefono,
      url_cvlac:datos.url_cvlac,
      fecha_actualizacion:datos.fecha_actualizacion,
      escalafon:datos.escalafon,
      perfil:datos.perfil,
      cat_minciencia:datos.cat_minciencia,
      conv_minciencia:datos.conv_minciencia,
      nacionalidaad:datos.nacionalidaad,
      linea_investigacion:datos.linea_investigacion.id
    }
  }
  guardar(){
    if(this.modoFormulario === 'crear'){
      this.docenteService.crearDocente(this.Formulario).subscribe({
        next: () => {
          this.obtenerDocentes();
        },
        error: (error) => {
          console.log(error);
        }
      });
      this.modoFormulario = null;
    }else{
      this.docenteService.actualizarDocente(this.Formulario).subscribe({
        next: () => {
          this.obtenerDocentes();
        },
        error: (error) => {
          console.log(error);
        }
      });
      this.modoFormulario = null;
    }
  }
  cancelar(){
    this.modoFormulario = null;
    this.Formulario = {
      nombreSP:"",
      cedula:0,
      nombres:"",
      apellidos:"",
      genero:"",
      cargo:"",
      fecha_nacimiento:new Date(),
      correo:"",
      telefono:"",
      url_cvlac:"",
      fecha_actualizacion:new Date(),
      escalafon:"",
      perfil:"",
      cat_minciencia:"",
      conv_minciencia:"",
      nacionalidaad:"",
      linea_investigacion:0
    }
  }
}
