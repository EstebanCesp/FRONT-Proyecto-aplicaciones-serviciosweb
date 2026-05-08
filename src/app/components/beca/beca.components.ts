import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BecaService } from '../../services/beca.service';
import { EstudiosRealizadosService } from '../../services/estudios-realizados.service';
import { becasp_create, becasp_delete } from '../../models/Beca';

@Component({
  selector: 'app-beca',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './beca.component.html',
  styleUrls: ['./beca.component.css']
})
export class BecaComponent implements OnInit {

  // Las 3 vistas: 'listar', 'ver', 'formulario'
  vista: 'listar' | 'ver' | 'formulario' = 'listar';

  estudios: any[] = [];       // lista de estudios (maestro)
  estudioActual: any = null;  // estudio seleccionado para ver/editar
  becas: any[] = [];          // lista de becas (detalle)
  becaActual: any = null;     // beca del estudio seleccionado
  editando = false;
  cargando = true;

  formulario: becasp_create = {
    nombreSP: '', estudios: 0, tipo: '',
    institucion: '', fecha_inicio: '', fecha_fin: null
  };

  constructor(
    private becaService: BecaService,
    private estudiosService: EstudiosRealizadosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarEstudios();
  }

  // VISTA LISTAR
  cargarEstudios(): void {
    this.cargando = true;
    this.estudiosService.getEstudiosRealizados().subscribe({
      next: (response: any) => {
        this.estudios = (response?.resultados || response?.Resultados || (Array.isArray(response) ? response : [])) as any[];
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando estudios:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  abrirCrearGeneral(): void {
    this.editando = false;
    this.estudioActual = null;
    this.formulario = {
      nombreSP: '', estudios: 0, tipo: '',
      institucion: '', fecha_inicio: '', fecha_fin: null
    };
    this.vista = 'formulario';
  }

  // VISTA VER
  verEstudio(estudio: any): void {
    this.estudioActual = estudio;
    this.becaService.getBecas().subscribe({
      next: (response: any) => {
        const becas = (response?.resultados || response?.Resultados || (Array.isArray(response) ? response : [])) as any[];
        this.becaActual = becas.find(
          (b: any) => b.estudios?.id === estudio.id || b.estudios === estudio.id
        ) ?? null;
        this.vista = 'ver';
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando becas:', err);
        this.becaActual = null;
        this.vista = 'ver';
        this.cdr.detectChanges();
      }
    });
  }

  // VISTA FORMULARIO
  abrirCrear(estudio: any): void {
    this.editando = false;
    this.estudioActual = estudio;
    this.formulario = {
      nombreSP: '', estudios: estudio.id, tipo: '',
      institucion: '', fecha_inicio: '', fecha_fin: null
    };
    this.vista = 'formulario';
  }

  abrirEditar(beca: any): void {
    this.editando = true;
    this.formulario = {
      nombreSP: '',
      estudios: beca.estudios?.id ?? beca.estudios,
      tipo: beca.tipo,
      institucion: beca.institucion,
      fecha_inicio: beca.fecha_inicio,
      fecha_fin: beca.fecha_fin
    };
    this.vista = 'formulario';
  }

  guardar(): void {
    if (this.editando) {
      this.becaService.actualizarBeca({ ...this.formulario }).subscribe(() => {
        this.cargarEstudios();
        this.vista = 'listar';
      });
    } else {
      this.becaService.crearBeca({ ...this.formulario }).subscribe(() => {
        this.cargarEstudios();
        this.vista = 'listar';
      });
    }
  }

  eliminar(estudios: number): void {
    if (confirm('¿Seguro que deseas eliminar esta beca?')) {
      const data: becasp_delete = { nombreSP: 'sp_eliminar_beca', estudios };
      this.becaService.eliminarBeca(data).subscribe(() => {
        this.cargarEstudios();
        this.vista = 'listar';
      });
    }
  }

  volver(): void {
    this.cargarEstudios();
    this.vista = 'listar';
  }
}