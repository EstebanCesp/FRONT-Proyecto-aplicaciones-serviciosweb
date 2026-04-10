import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BecaService } from '../../services/beca.service';
import { becasp_create, becasp_delete } from '../../models/Beca';

@Component({
  selector: 'app-beca',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './beca.component.html',
  styleUrls: ['./beca.component.css']
})
export class BecaComponent implements OnInit {

  becas: any[] = [];
  modoFormulario: 'crear' | 'editar' | null = null;

  formulario: becasp_create = {
    nombreSP: '',
    estudios: 0,
    tipo: '',
    institucion: '',
    fecha_inicio: '',
    fecha_fin: null
  };

  constructor(private becaService: BecaService) {}

  ngOnInit(): void {
    this.cargarBecas();
  }

  cargarBecas(): void {
    this.becaService.getBecas().subscribe((data: any) => {
      this.becas = data;
    });
  }

  abrirCrear(): void {
    this.modoFormulario = 'crear';
    this.formulario = { nombreSP: '', estudios: 0, tipo: '', institucion: '', fecha_inicio: '', fecha_fin: null };
  }

  abrirEditar(beca: any): void {
    this.modoFormulario = 'editar';
    this.formulario = {
      nombreSP: '',
      estudios: beca.estudios?.id ?? beca.estudios,
      tipo: beca.tipo,
      institucion: beca.institucion,
      fecha_inicio: beca.fecha_inicio,
      fecha_fin: beca.fecha_fin
    };
  }

  guardar(): void {
    if (this.modoFormulario === 'crear') {
      this.becaService.crearBeca({ ...this.formulario }).subscribe(() => {
        this.cargarBecas();
        this.modoFormulario = null;
      });
    } else {
      this.becaService.actualizarBeca({ ...this.formulario }).subscribe(() => {
        this.cargarBecas();
        this.modoFormulario = null;
      });
    }
  }

  eliminar(estudios: number): void {
    if (confirm('¿Seguro que deseas eliminar esta beca?')) {
      const data: becasp_delete = { nombreSP: 'sp_eliminar_beca', estudios };
      this.becaService.eliminarBeca(data).subscribe(() => {
        this.cargarBecas();
      });
    }
  }

  cancelar(): void {
    this.modoFormulario = null;
  }
}
