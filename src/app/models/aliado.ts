export interface Aliado{
    nit : number
    razon_social : string
    nombre_contacto: string
    correo : string
    telefono : string
    ciudad : string
}
export interface aliadoCreate{
    nit : number
    razon_social :string
    nombre_contacto : string
    correo : string
    telefono :string
    ciudad  :string
}

export interface aliadoUpdate{
    nit: number|null
    razon_social :string|null,
    nombre_contacto : string|null,
    correo : string|null,
    telefono :string|null,
    ciudad  :string|null
}