import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Aliado, aliadoUpdate} from '../../models/aliado';
import { aliadoService } from '../../services/aliado.service';

@Component({
  selector: 'app-aliados',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './aliados.html',
  styleUrl: './aliados.css',
})
export class Aliados {
  public listaAliados: Aliado[] = [];
  modoFormulario: 'crear' | 'editar' | null = null;

  formulario: Aliado = {
    nit : 0,
    razon_social: '',
    nombre_contacto: '',
    correo: '',
    telefono: '',
    ciudad : ''
  };
  constructor(
    private aliadoService: aliadoService,
  ) {}

  ngOnInit() {
    this.ObtenerAliados();
  }

  abrirCrear(): void {
    this.modoFormulario = 'crear';
    this.formulario = {
      nit : 0,
      razon_social: '',
      nombre_contacto: '',
      correo: '',
      telefono: '',
      ciudad : ''
    };
  }

  abrirEditar(aliado: aliadoUpdate): void {
    this.modoFormulario = 'editar';
    this.formulario = {
      nit : aliado.nit??0,
      razon_social: aliado.razon_social??'',
      nombre_contacto: aliado.nombre_contacto??'',
      correo: aliado.correo??'',
      telefono: aliado.correo??'',
      ciudad : aliado.correo??''
    };
  }

  guardar(): void {
    if (this.modoFormulario === 'crear') {
      this.aliadoService.postAliado(this.formulario).subscribe(() => {
        this.ObtenerAliados();
        this.modoFormulario = null;
      });
    } else if (this.modoFormulario === 'editar') {
      this.aliadoService.putAliado(this.formulario, this.formulario.nit).subscribe(() => {
        this.ObtenerAliados();
        this.modoFormulario = null;
      });
    }
  }
  

  ObtenerAliados() {
    this.aliadoService.getAliados().subscribe({
      next: (response: any) => {
        this.listaAliados = (response?.datos ?? (Array.isArray(response) ? response : [])) as Aliado[];
      },
      error: (err) => {
        console.error('Error al obtener datos', err);
        this.listaAliados = [];
      },
    });
  }


  cancelar(): void {
    this.modoFormulario = null;
  }

  eliminarAliado(aliado:number){
    this.aliadoService.deleteAliado(aliado).subscribe({
      next: (response :any) => {
        console.log(response)
      }
    })
  }

}