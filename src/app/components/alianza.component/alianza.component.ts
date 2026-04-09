import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlianzaService } from '../../services/alianza.service';
import { alianzaResponse, alianzasp_create } from '../../models/alianza';
import { Aliado } from '../../models/aliado';
import { programa } from '../../models/programa';
import { docenteResponse } from '../../models/docente';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-alianza.component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alianza.component.html',
  styleUrl: './alianza.component.css',
})
export class AlianzaComponent implements OnInit {
  listaAlianzas: alianzaResponse[] = [];
  listaAliados: Aliado[] = [];
  listaDepartamentos: programa[] = [];
  listaDocentes: docenteResponse[] = [];

  Formulario: alianzasp_create = {
    nombreSP:"",
    aliado:0,
    departamento:0,
    fecha_inicio:new Date(),
    fecha_fin:new Date(),
    docente:0
  }
  modoFormulario: 'crear' | 'editar' | null = null;

  constructor(private alianzaService: AlianzaService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarAlianzas();
    this.cargarAliados();
    this.cargarDepartamentos();
    this.cargarDocentes();
  }
  cargarAlianzas(): void {
    this.alianzaService.getAlianzas().subscribe({
      next: (response: any) => {
        this.listaAlianzas = (response?.resultados ?? (Array.isArray(response) ? response : [])) as alianzaResponse[];
        for(let registro of this.listaAlianzas){
          registro.aliado = JSON.parse(registro.aliado);
          registro.departamento = JSON.parse(registro.departamento);
          registro.docente = JSON.parse(registro.docente);
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar alianzas:', err)
    });
  }
  cargarAliados(): void {
    this.alianzaService.getAliados().subscribe({
      next: (response: any) => {
        this.listaAliados = (response?.datos ?? (Array.isArray(response) ? response : [])) as Aliado[];
        this.cdr.detectChanges();
        console.log(this.listaAliados);
      },
      error: (err) => console.error('Error al cargar aliados:', err)
    });
  }
  cargarDepartamentos(): void {
    this.alianzaService.getDepartamentos().subscribe({
      next: (response: any) => {
        this.listaDepartamentos = (response?.datos ?? (Array.isArray(response) ? response : [])) as programa[];
        this.cdr.detectChanges();
    },
      error: (err) => console.error('Error al cargar departamentos:', err)
    });
  }
  cargarDocentes(): void {
    this.alianzaService.getDocentes().subscribe({
      next: (response: any) => {
        this.listaDocentes = (response?.datos ?? (Array.isArray(response) ? response : [])) as docenteResponse[];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar docentes:', err)
    });
  }

  eliminar(datos: alianzaResponse){
    this.alianzaService.eliminarAlianza({nombreSP:'', aliado:datos.aliado.nit, departamento:datos.departamento.id}).subscribe({
      next: () => {
        this.cargarAlianzas();
      },
      error: (err) => console.error('Error al eliminar alianza:', err)
    });
  }

  abrirCrear(){
    this.modoFormulario = 'crear';
    this.Formulario = {
      nombreSP:"",
      aliado:0,
      departamento:0,
      fecha_inicio:new Date(),
      fecha_fin:new Date(),
      docente:0
    }
  }

  abrirEditar(registro: alianzaResponse){
    this.modoFormulario = 'editar';
    this.Formulario = {
      nombreSP:"",
      aliado:registro.aliado.nit ,
      departamento:registro.departamento.id,
      fecha_inicio:new Date(registro.fecha_inicio),
      fecha_fin:new Date(registro.fecha_fin,),
      docente:registro.docente.cedula
    }
  }

  guardar(){
    if(this.modoFormulario === 'crear'){
      this.alianzaService.crearAlianza(this.Formulario).subscribe({
        next: () => {
          this.cargarAlianzas();
        },
        error: (err) => console.error('Error al crear alianza:', err)
      });
      this.modoFormulario = null;
    }else{
      this.alianzaService.actualizarAlianza(this.Formulario).subscribe({
        next: () => {
          this.cargarAlianzas();
        },
        error: (err) => console.error('Error al actualizar alianza:', err)
      });
      this.modoFormulario = null;
    }
  }

  cancelar(){
    this.modoFormulario = null;
    this.Formulario = {
      nombreSP:"",
      aliado:0,
      departamento:0,
      fecha_inicio:new Date(),
      fecha_fin:new Date(),
      docente:0
    }
  }
}
