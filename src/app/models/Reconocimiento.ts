export interface ReconocimientoResponse {
  docente: any;
  id: number;
  tipo: string;
  fecha: string;
  institucion: string;
  nombre: string;
  ambito: string;
}

export interface reconocimientosp_read {
  nombreSP: string;
}

export interface reconocimientosp_create extends reconocimientosp_read {
  docente: number;
  tipo: string;
  fecha: string;
  institucion: string;
  nombre: string;
  ambito: string;
}

export interface reconocimientosp_update extends reconocimientosp_read {
  id: number;
  docente: number;
  tipo: string;
  fecha: string;
  institucion: string;
  nombre: string;
  ambito: string;
}

export interface reconocimientosp_delete extends reconocimientosp_read {
  id: number;
}