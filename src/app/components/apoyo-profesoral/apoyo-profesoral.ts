import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { apoyo_profesoralCreate, apoyo_profesoralResponse } from '../../models/apoyo_profesoral';
import { estudios_realizadosResponse } from '../../models/estudios_realizados';
import { ApoyoProfesoralService } from '../../services/apoyo-profesoral.service';

@Component({
  selector: 'app-apoyo-profesoral',
  imports: [CommonModule, FormsModule],
  templateUrl: './apoyo-profesoral.html',
  styleUrl: './apoyo-profesoral.css',
})
export class ApoyoProfesoral implements OnInit {
  
  listaApoyoProfesoral: apoyo_profesoralResponse[] = [];
  listaEstudios: estudios_realizadosResponse[] = [];

  Formulario: apoyo_profesoralCreate = {
    nombreSP: "",
    estudios: 0,
    con_apoyo: false,
    institucion: "",
    tipo: ""

  }

  modoFormulario: 'crear' | 'editar' | null = null;

  constructor(private apoyoProfesoralService: ApoyoProfesoralService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarApoyoProfesoral();
    this.cargarEstudios();
  }

  cargarApoyoProfesoral(): void {
    this.apoyoProfesoralService.getApoyoProfesoral().subscribe({
      next: (response: any) => {
        this.listaApoyoProfesoral = (response?.resultados ?? (Array.isArray(response) ? response : [])) as apoyo_profesoralResponse[];
        for(let registro of this.listaApoyoProfesoral){
          registro.estudios = JSON.parse(registro.estudios);
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar apoyo profesoral:', err)
    });
  }

  cargarEstudios(): void {
    this.apoyoProfesoralService.getEstudios().subscribe({
      next: (response: any) => {
        this.listaEstudios = (response?.datos ?? (Array.isArray(response) ? response : [])) as estudios_realizadosResponse[];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar estudios realizados:', err)
    });  
  }

  eliminar(datos: apoyo_profesoralResponse) {
    this.apoyoProfesoralService.eliminarApoyoProfesoral({nombreSP: '', estudios: datos.estudios.id}).subscribe({
      next: () => {
        this.cargarApoyoProfesoral();
      },
      error: (err) => console.error('Error al eliminar apoyo profesoral:', err)
    });
  }

  abrirCrear() {
    this.Formulario = {
      nombreSP: "",
      estudios: 0,
      con_apoyo: false,
      institucion: "",
      tipo: ""
    };
    this.modoFormulario = 'crear';
  }

  abrirEditar(datos: apoyo_profesoralResponse) {
    this.Formulario = {
      nombreSP: "",
      estudios: datos.estudios.id,
      con_apoyo: datos.con_apoyo,
      institucion: datos.institucion,
      tipo: datos.tipo
    };
    this.modoFormulario = 'editar';
  }

  guardar() {
    if (this.modoFormulario === 'crear') {
      this.apoyoProfesoralService.crearApoyoProfesoral(this.Formulario).subscribe({
        next: () => {
          this.cargarApoyoProfesoral();
          this.modoFormulario = null;
        },
        error: (err) => console.error('Error al crear apoyo profesoral:', err)
      });
    } else if (this.modoFormulario === 'editar') {
      this.apoyoProfesoralService.actualizarApoyoProfesoral(this.Formulario).subscribe({
        next: () => {
          this.cargarApoyoProfesoral();
          this.modoFormulario = null;
        },
        error: (err) => console.error('Error al actualizar apoyo profesoral:', err)
      });
    }
  }

  cancelar() {
    this.modoFormulario = null;
    this.Formulario = {
      nombreSP: "",
      estudios: 0,
      con_apoyo: false,
      institucion: "",
      tipo: ""
    };
  } 




}