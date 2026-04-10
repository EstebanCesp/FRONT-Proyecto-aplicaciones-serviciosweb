export interface ExperienciaResponse {
  docente: any;
  id: number;
  nombre_cargo: string;
  institucion: string;
  tipo: string;
  fecha_inicio: string;
  fecha_fin: string | null;
}

export interface experienciasp_read {
  nombreSP: string;
}

export interface experienciasp_create extends experienciasp_read {
  docente: number;
  nombre_cargo: string;
  institucion: string;
  tipo: string;
  fecha_inicio: string;
  fecha_fin: string | null;
}

export interface experienciasp_update extends experienciasp_read {
  id: number;
  docente: number;
  nombre_cargo: string;
  institucion: string;
  tipo: string;
  fecha_inicio: string;
  fecha_fin: string | null;
}

export interface experienciasp_delete extends experienciasp_read {
  id: number;
}