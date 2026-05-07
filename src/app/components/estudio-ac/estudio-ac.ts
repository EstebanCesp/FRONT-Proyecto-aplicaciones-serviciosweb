import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { estudio_acCreate, estudio_acResponse } from '../../models/estudio_ac';
import { estudios_realizadosResponse } from '../../models/estudios_realizados';
import { area_conocimientoResponse } from '../../models/area_conocimiento';
import { EstudioAcService } from '../../services/estudio-ac.service';

@Component({
  selector: 'app-estudio-ac',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './estudio-ac.html',
  styleUrl: './estudio-ac.css',
})
export class EstudioAc implements OnInit {
  listaEstudioAc: estudio_acResponse[] = [];
  listaEstudio: estudios_realizadosResponse[] = []
  listaAreaConocimiento: area_conocimientoResponse[] = [];

  formulario: estudio_acCreate = {
    nombreSP: "",
    estudios: 0,
    area_conocimiento: 0,
  }
  modoFormulario: 'crear' | 'editar' | null = null;

  constructor(private estudioacService: EstudioAcService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarEstudioAc();
    this.cargarEstudios();
    this.cargarAreaConocimiento();
  }

  cargarEstudioAc(): void {
    this.estudioacService.getEstudiosAc().subscribe({
      next: (response: any) => {
        this.listaEstudioAc = (response?.resultados ?? (Array.isArray(response) ? response : [])) as estudio_acResponse[];
        for(let registro of this.listaEstudioAc){
          registro.estudios = JSON.parse(registro.estudios);
          registro.area_conocimiento = JSON.parse(registro.area_conocimiento);
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar estudios_ac:', err)
    });
  }

  cargarEstudios(): void {
    this.estudioacService.getEstudios().subscribe({
      next: (response: any) => {
        this.listaEstudio = (response?.datos ?? (Array.isArray(response) ? response : [])) as estudios_realizadosResponse[];
        this.cdr.detectChanges();
        console.log(this.listaEstudio);
      },
      error: (err) => console.error('Error al cargar estudios:', err)
    });
  }

  cargarAreaConocimiento(): void {
    this.estudioacService.getAreasConocimiento().subscribe({
      next: (response: any) => {
        this.listaAreaConocimiento = (response?.datos ?? (Array.isArray(response) ? response : [])) as area_conocimientoResponse[];
        this.cdr.detectChanges();
        console.log(this.listaAreaConocimiento);
      },
      error: (err) => console.error('Error al cargar áreas de conocimiento:', err)
    });
  }

  eliminar(estudioAc: estudio_acResponse): void {
    this.estudioacService.eliminarEstudioAc({nombreSP:'', estudios:estudioAc.estudios.id, area_conocimiento:estudioAc.area_conocimiento.id}).subscribe({
      next: () => {
        this.cargarEstudioAc();
      },
      error: (err) => console.error('Error al eliminar estudio_ac:', err)
    });
  }

  abrirCrear(): void {
    this.modoFormulario = 'crear';
    this.formulario = {
      nombreSP: "",
      estudios: 0,
      area_conocimiento: 0,
    };
  }

  abrirEditar(registro: estudio_acResponse){
    this.modoFormulario = 'editar';
    this.formulario = {
      nombreSP: "",
      estudios: registro.estudios.id,
      area_conocimiento: registro.area_conocimiento.id,
    }
  }
  
  guardar() {
    if(this.modoFormulario === 'crear'){
      this.estudioacService.crearEstudioAc(this.formulario).subscribe({
        next: () => {
          this.cargarEstudioAc();
        },
        error: (err) => console.error('Error al crear estudio_ac:', err)
      });
    } else if(this.modoFormulario === 'editar'){
      this.estudioacService.actualizarEstudioAc(this.formulario).subscribe({
        next: () => {
          this.cargarEstudioAc();
        },
        error: (err) => console.error('Error al actualizar estudio_ac:', err)
      });
    } 
  }
  
  cancelar(): void {
    this.modoFormulario = null;
    this.formulario = {
      nombreSP: "",
      estudios: 0,
      area_conocimiento: 0,
    };
  }

}
