# FrontAplicacionesServiciosWeb

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Trabajo en Equipo: Instrucciones para CRUD de 3 Tablas

Este proyecto es colaborativo. Cada persona del equipo debe encargarse de una tabla diferente y desarrollar todas las funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) para su tabla asignada. A continuación, se describen los pasos para coordinar el trabajo y cumplir con los objetivos:

### 1. Asignación de Tablas
- Sebastian: Red
- David : Beca
- Carolina: apoyo profesional
- Esteban: Aliado

### 2. Creación del Modelo

**Cada persona debe:**
- Crear el archivo correspondiente al modelo en `src/app/models`.
- Definir la interfaz o clase TypeScript que represente su entidad, con todos los campos relevantes.

### 3. Creación de los DTOs (Data Transfer Objects)

**Cada persona debe:**
- Crear un archivo dentro de la carpeta `src/app/models/dtos`.
- Definir al menos dos DTOs:
  - DTO para crear
  - DTO para actualizar
  - DTO para leer
- Asegurarse que los DTOs contengan únicamente los campos necesarios para cada operación.

### Ejemplo Genérico de DTO

A continuación se muestra un ejemplo sencillo de cómo podría ser un DTO en TypeScript para una entidad genérica "Usuario":

```typescript
// DTO para crear un nuevo usuario
export interface CreateUsuarioDto {
  nombre: string;
  email: string;
  password: string;
}

// DTO para actualizar un usuario existente
export interface UpdateUsuarioDto {
  nombre?: string;
  email?: string;
  password?: string;
}

// DTO para leer (listar o mostrar detalles de) un usuario
export interface ReadUsuarioDto {
  id: number;
  nombre: string;
  email: string;
}
```
Este ejemplo ayuda a ilustrar cómo se separan los campos necesarios según la operación a realizar. Puedes tomarlo como referencia para crear los DTOs de tus propias entidades.


### 4. Creación del Servicio

**Cada persona debe:**
- Crear un servicio en `src/app/services` con el nombre: `<entidad>.service.ts`
- Implementar métodos para:
  - Obtener todos los registros (`getAll`)
  - Obtener por id (`getById`)
  - Crear nuevo registro (`create`)
  - Actualizar registro (`update`)
  - Eliminar registro (`delete`)
- Utilizar HttpClient para comunicarse con la API.

### 5. Creación del Componente

**Cada persona debe:**
- Crear una carpeta de componente bajo `src/app/components/<entidad>`.
- Generar el componente con Angular CLI, ejemplo:  
  `ng generate component components/<entidad>`
- El componente debe mostrar la lista de registros de la tabla asignada.
- Incluir botones para:
  - Crear nuevo registro
  - Editar registro existente
  - Eliminar registro
  - Visualizar detalles (opcional)
- Crear los formularios necesarios para creación y edición, reutilizando los DTOs.

### 6. Integración y Pull Requests

- Realizar commits y push frecuentes a su propia rama siguiendo buenas prácticas de Git.
- Crear PRs claros y solicitar revisión antes de fusionar a la rama principal.
- Probar la integración con las otras tablas del equipo en la aplicación general.

### 7. Documentación

- Comentar el código donde sea necesario para explicar la lógica.
- Resumir en el README o en un archivo aparte los endpoints y las funcionalidades cubiertas por cada persona.

---
