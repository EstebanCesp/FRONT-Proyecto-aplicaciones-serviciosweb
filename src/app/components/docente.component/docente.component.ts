import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocentesService } from '../../services/docentes.service';
import { docenteResponse, docente_Create} from '../../models/docente';
import { EstudiosRealizadosService } from '../../services/estudios-realizados.service';
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
  vista: 'listar' | 'ver' | 'formulario' = 'listar';
  docenteSeleccionado: docenteResponse | null = null;
  estudiosDelDocente: any[] = [];
  cargandoEstudios = false;

  constructor(
    private docenteService: DocentesService, 
    private estudiosService: EstudiosRealizadosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obtenerDocentes();
    this.obtenerLineasInvestigacion();
  }

  obtenerDocentes(){
    this.docenteService.getDocentes().subscribe({
      next: (response: any) => {
        const datos = (response?.resultados || response?.Resultados || (Array.isArray(response) ? response : [])) as any[];
        
        for(let registro of datos){
          if (typeof registro.linea_investigacion === 'string') {
            try { registro.linea_investigacion = JSON.parse(registro.linea_investigacion); } 
            catch(e) { registro.linea_investigacion = { nombre: registro.linea_investigacion }; }
          }
        }

        this.listaDocentes = datos as docenteResponse[];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
        this.listaDocentes = [];
        this.cdr.detectChanges();
      }
    });
  }

  verEstudios(docente: docenteResponse) {
    this.docenteSeleccionado = docente;
    this.vista = 'ver';
    this.cargandoEstudios = true;
    this.estudiosDelDocente = [];
    
    this.estudiosService.getEstudiosRealizados().subscribe({
      next: (resp: any) => {
        const todos = (resp?.resultados || resp?.Resultados || (Array.isArray(resp) ? resp : [])) as any[];
        this.estudiosDelDocente = todos.filter(e => {
          const docId = e.docente?.cedula || e.docente;
          return docId === docente.cedula;
        });
        this.cargandoEstudios = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargandoEstudios = false;
        this.cdr.detectChanges();
      }
    });
  }

  cerrarEstudios() {
    this.docenteSeleccionado = null;
    this.vista = 'listar';
    this.estudiosDelDocente = [];
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
    if (!confirm('¿Está seguro de eliminar este docente?')) return;
    this.docenteService.eliminarDocente({nombreSP:'sp_eliminar_docente', cedula:datos.cedula}).subscribe({
      next: () => {
        alert('Docente eliminado');
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
          alert('Éxito: Docente registrado.');
          this.obtenerDocentes();
          this.modoFormulario = null;
        },
        error: (error) => {
          console.error(error);
          alert('Error al crear docente.');
        }
      });
    }else{
      this.docenteService.actualizarDocente(this.Formulario).subscribe({
        next: () => {
          alert('Éxito: Docente actualizado.');
          this.obtenerDocentes();
          this.modoFormulario = null;
        },
        error: (error) => {
          console.error(error);
          alert('Error al actualizar docente.');
        }
      });
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
