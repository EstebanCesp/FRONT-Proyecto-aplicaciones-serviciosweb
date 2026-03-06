import { Component } from '@angular/core';
import { apoyo_profesoralService } from '../../services/apoyo_profesoral.service';
import { CommonModule } from '@angular/common';
import { apoyo_profesoral, apoyo_profesoralUpdate } from '../../models/apoyo_profesoral';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-apoyo-profesoral',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './apoyo-profesoral.html',
  styleUrl: './apoyo-profesoral.css',
})
export class ApoyoProfesoral {
  public listaApoyoProfesoral:any;
  modoFormulario: 'crear' | 'editar' | null = null;
  formulario: apoyo_profesoral = {
    estudios : 0,
    con_apoyo: 0,
    institucion: '',
    tipo: '',

  };
  constructor(private apoyo_profesoralService : apoyo_profesoralService) {}

  cancelar(): void {
    this.modoFormulario = null;
  }

  abrirCrear(): void {
    this.modoFormulario = 'crear';
    this.formulario = {
      estudios : 0,
      con_apoyo: 0,
      institucion: '',
      tipo: ''
    };
  }

  abrirEditar(apoyo_profesoral: apoyo_profesoralUpdate): void {
    this.modoFormulario = 'editar';
    this.formulario = {
      estudios : apoyo_profesoral.estudios??0,
      con_apoyo: apoyo_profesoral.con_apoyo??0,
      institucion: apoyo_profesoral.institucion??'',
      tipo: apoyo_profesoral.tipo??'',
     
    };
  }

  guardar(): void {
    if (this.modoFormulario === 'crear') {
      this.apoyo_profesoralService.postApoyo_profesoral(this.formulario).subscribe(() => {
        this.ObtenerApoyo_Profesoral();
        this.modoFormulario = null;
      });
    } else if (this.modoFormulario === 'editar') {
      this.apoyo_profesoralService.putApoyo_profesoral(this.formulario.estudios,this.formulario).subscribe(() => {
        this.ObtenerApoyo_Profesoral();
        this.modoFormulario = null;
      });
    }
  }

  ngOnInit(){
    this.ObtenerApoyo_Profesoral()
  }

  ObtenerApoyo_Profesoral(){ 
    let isOk: boolean;
    let responseList : any ;
    this.apoyo_profesoralService.getApoyo_profesoral().subscribe(
      {
        next: (response:any) => {this.listaApoyoProfesoral = (response?.datos??(Array.isArray(response)?response:[]))as apoyo_profesoral[]},
        error: (err) => {console.error('Error al obtener datos', err); this.listaApoyoProfesoral = []},
        
      }
    );
  }

eliminarApoyoProfesoral(apoyo_profesoral:number){
    this.apoyo_profesoralService.deleteApoyo_profesoral(apoyo_profesoral).subscribe({
      next: (response :any) => {
        console.log(response)
      }
    })
  }
}

