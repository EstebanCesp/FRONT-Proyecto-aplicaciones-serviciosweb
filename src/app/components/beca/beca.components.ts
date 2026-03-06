import { Component, OnInit } from '@angular/core';
import { BecaService } from '../../services/beca.service';
import { Beca } from '../../models/Beca';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-beca',
  standalone: true,                        // ← agrega esto
  imports: [FormsModule, CommonModule],    // ← agrega esto
  templateUrl: './beca.component.html',
  styleUrls: ['./beca.component.css']
})
export class BecaComponent implements OnInit {

  becas: Beca[] = [];
  becaSeleccionada: Beca | null = null;
  modoFormulario: 'crear' | 'editar' | null = null;

  // Modelo vacío para el formulario
  formulario: Beca = {
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
    this.formulario = { estudios: 0, tipo: '', institucion: '', fecha_inicio: '', fecha_fin: null };
  }

  abrirEditar(beca: Beca): void {
    this.modoFormulario = 'editar';
    this.formulario = { ...beca };
  }

  guardar(): void {
  if (this.modoFormulario === 'crear') {
    this.becaService.postBeca(this.formulario).subscribe(() => {
      this.cargarBecas();
      this.modoFormulario = null;
    });
  } else if (this.modoFormulario === 'editar') {
    this.becaService.putBeca(this.formulario, this.formulario.estudios).subscribe(() => {
      this.cargarBecas();
      this.modoFormulario = null;
    });
  }
}

  eliminar(estudios: number): void {
  if (confirm('¿Seguro que quieres eliminar esta beca?')) {
    this.becaService.deleteBeca(estudios).subscribe(() => {
      this.cargarBecas();
    });
  }
}

  cancelar(): void {
    this.modoFormulario = null;
  }
}
