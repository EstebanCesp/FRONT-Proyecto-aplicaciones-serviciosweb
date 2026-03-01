## Guía: Routing, diseño responsive y sidebar en Angular (standalone)

Esta guía está pensada para tu proyecto actual, que usa **componentes standalone** y el archivo `app.routes.ts` para configurar el router.

- **Versión aproximada**: Angular 17+ con standalone.
- **Objetivo**:
  - **Tener varias pantallas** en rutas diferentes.
  - **Aplicar un diseño responsive global** pensado para **móviles y escritorio**.
  - **Crear una sidebar** que use routing, sea responsive (móvil ↔ escritorio) y se pueda **ocultar/mostrar**.

---

## 1. Routing: varias pantallas en rutas diferentes

Tu archivo actual `src/app/app.routes.ts` está casi vacío:

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [];
```

### 1.1. Crear componentes de página

Desde la terminal, crea algunos componentes standalone (ejemplos):

```bash
ng generate component pages/home --standalone --inline-style=false --inline-template=false
ng generate component pages/about --standalone --inline-style=false --inline-template=false
```

Esto generará, por ejemplo:
- `src/app/pages/home/home.component.ts`
- `src/app/pages/about/about.component.ts`

### 1.2. Definir las rutas en `app.routes.ts`

Edita `src/app/app.routes.ts` para registrar las rutas:

```ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
```

- **`path: ''`**: ruta raíz (`/`).
- **`path: 'about'`**: ruta `/about`.
- **`path: '**'`**: cualquier ruta no encontrada redirige a inicio.

### 1.3. Usar el `RouterOutlet` en el componente raíz

Tu `src/app/app.ts` ya importa el `RouterOutlet`:

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
```

Asegúrate de que en `src/app/app.html` exista el `<router-outlet>` (ahí se dibujan las pantallas):

```html
<router-outlet></router-outlet>
```

Más adelante añadiremos aquí la **sidebar** y un layout más completo.

### 1.4. Navegación con enlaces

Un ejemplo de cómo navegar usando las rutas en una plantilla:

```html
<!-- Dentro de alguna plantilla de componente -->
<a routerLink="/">Inicio</a>
<a routerLink="/about">Acerca de</a>
```

Y con estilos de ruta activa:

```html
<a routerLink="/" routerLinkActive="link-activo" [routerLinkActiveOptions]="{ exact: true }">
  Inicio
</a>
<a routerLink="/about" routerLinkActive="link-activo">
  Acerca de
</a>
```

Después podrás definir la clase `.link-activo` en CSS.

---

## 2. Diseño responsive global para móviles y escritorio

En Angular, los estilos globales suelen ir en `src/styles.css` (que ya está configurado en `angular.json`) y cada componente puede tener sus propios estilos locales (`.css`).

### 2.1. Estilos base en `src/styles.css`

La idea es usar un enfoque **mobile-first**: por defecto optimizado para **móviles**, y con `@media` para ajustar en **tablet/escritorio**.

```css
/* src/styles.css */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #f5f5f5;
  color: #1f2933;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Utilidades de layout */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Breakpoints básicos */
@media (min-width: 768px) {
  .container {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 2rem;
  }
}
```

Con esto:
- En **móviles** se ve bien sin necesidad de `@media`.
- En **tablet/escritorio** los `@media` ajustan el espaciado y se aprovecha mejor el ancho.
- Todos los componentes heredan **tipografía y colores base**.
- Usas `.container` para centrar contenido de manera consistente.

### 2.2. Cómo centrar contenido con `.container`

Para centrar secciones de contenido de forma responsive (móvil y escritorio), solo necesitas **envolver tu contenido** en un elemento con la clase `container`:

```html
<div class="container">
  <h1>Mi título</h1>
  <p>Contenido centrado con ancho máximo de 1200px.</p>
</div>
```

Lo que hace cada propiedad de `.container`:

- **`width: 100%`** → ocupa todo el ancho disponible (ideal en móviles).
- **`max-width: 1200px`** → limita el ancho máximo en pantallas grandes para que el contenido no se vea demasiado ancho.
- **`margin: 0 auto`** → centra horizontalmente el bloque dentro de la página.
- **`padding: 0 1rem`** (y más padding en los `@media`) → añade espacio lateral para que el contenido no pegue contra los bordes.

### 2.3. Layout de la app en `app.html` y `app.css`

Vamos a preparar el layout principal pensando ya en la **sidebar**:

```html
<!-- src/app/app.html -->
<div class="layout">
  <!-- Aquí irá la sidebar -->
  <router-outlet></router-outlet>
</div>
```

Y en `src/app/app.css`:

```css
/* src/app/app.css */
.layout {
  min-height: 100vh;
}
```

Más adelante sustituiremos este layout simple por uno con **sidebar + contenido** usando flexbox.

---

## 3. Sidebar con routing y diseño responsive (móvil y escritorio)

La idea es:
- Crear un **componente `Sidebar` standalone**.
- Usarlo en `app.html`.
- Hacer que sea **colapsable en móviles** con un botón.
- Usar `routerLink` para navegar entre pantallas.

### 3.1. Crear el componente Sidebar

En la terminal:

```bash
ng generate component shared/sidebar --standalone --inline-style=false --inline-template=false
```

Esto creará algo como:
- `src/app/shared/sidebar/sidebar.component.ts`
- `src/app/shared/sidebar/sidebar.component.html`
- `src/app/shared/sidebar/sidebar.component.css`

### 3.2. Lógica básica de la sidebar (TS)

En `sidebar.component.ts`:

```ts
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  readonly isOpen = signal(false);

  toggle(): void {
    this.isOpen.update((value) => !value);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
```

- Se usa un **`signal`** para manejar el estado abierto/cerrado.
- `toggle()` alterna la visibilidad.
- `close()` cierra el menú (útil al hacer clic en un enlace en móvil).

### 3.3. Plantilla de la sidebar (HTML)

En `sidebar.component.html`:

```html
<!-- Botón hamburguesa visible en móviles -->
<button class="sidebar-toggle" type="button" (click)="toggle()">
  ☰ Menú
</button>

<nav class="sidebar" [class.sidebar--open]="isOpen()">
  <div class="sidebar__header">
    <span class="sidebar__title">Mi Aplicación</span>
    <button class="sidebar__close" type="button" (click)="toggle()">
      ✕
    </button>
  </div>

  <ul class="sidebar__nav">
    <li>
      <a
        routerLink="/"
        routerLinkActive="sidebar__link--active"
        [routerLinkActiveOptions]="{ exact: true }"
        class="sidebar__link"
        (click)="close()"
      >
        Inicio
      </a>
    </li>
    <li>
      <a
        routerLink="/about"
        routerLinkActive="sidebar__link--active"
        class="sidebar__link"
        (click)="close()"
      >
        Acerca de
      </a>
    </li>
    <!-- Agrega más enlaces según tus rutas -->
  </ul>
</nav>
```

### 3.4. Estilos responsive de la sidebar (CSS)

En `sidebar.component.css`:

```css
/* Botón hamburguesa solo en móvil */
.sidebar-toggle {
  position: fixed;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 40;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: none;
  background-color: #111827;
  color: #ffffff;
  font-size: 0.9rem;
  cursor: pointer;
}

.sidebar {
  position: fixed;
  inset-block: 0;
  left: 0;
  width: 260px;
  background-color: #111827;
  color: #e5e7eb;
  transform: translateX(-100%);
  transition: transform 200ms ease-in-out;
  z-index: 30;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.75rem;
}

.sidebar--open {
  transform: translateX(0);
}

.sidebar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.sidebar__title {
  font-weight: 600;
  font-size: 1rem;
}

.sidebar__close {
  border: none;
  background: transparent;
  color: #9ca3af;
  font-size: 1.1rem;
  cursor: pointer;
}

.sidebar__nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar__link {
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  color: inherit;
}

.sidebar__link:hover {
  background-color: #1f2937;
}

.sidebar__link--active {
  background-color: #2563eb;
  color: #ffffff;
}

/* A partir de tablet/escritorio: sidebar fija y siempre visible */
@media (min-width: 768px) {
  .sidebar-toggle {
    display: none;
  }

  .sidebar {
    transform: translateX(0);
    position: sticky;
    top: 0;
    height: 100vh;
  }
}
```

Con esto:
- En móviles, la sidebar **entra/sale** desde la izquierda.
- En pantallas grandes, la sidebar queda **fija siempre visible**.

### 3.5. Integrar la sidebar en el layout principal

Ahora actualiza `src/app/app.ts` para importar la Sidebar:

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
```

Y actualiza `src/app/app.html` para tener un layout con sidebar + contenido:

```html
<div class="app-layout">
  <app-sidebar></app-sidebar>

  <main class="app-main">
    <div class="app-main__inner container">
      <router-outlet></router-outlet>
    </div>
  </main>
</div>
```

Finalmente, adapta `src/app/app.css`:

```css
/* src/app/app.css */
.app-layout {
  min-height: 100vh;
}

.app-main {
  padding-top: 3rem; /* espacio para el botón hamburguesa en móvil */
}

@media (min-width: 768px) {
  .app-layout {
    display: grid;
    grid-template-columns: 260px 1fr; /* sidebar + contenido */
  }

  .app-main {
    padding-top: 0;
  }
}
```

---

## 4. Resumen de pasos para implementarlo

- **Routing**:
  - Crear componentes de página (`home`, `about`, etc.).
  - Registrar rutas en `app.routes.ts`.
  - Usar `<router-outlet>` en `app.html`.
- **Diseño responsive global**:
  - Definir estilos base y breakpoints en `src/styles.css`.
  - Usar clases utilitarias (`.container`, etc.) en tus componentes.
- **Sidebar responsive**:
  - Crear un componente `Sidebar` standalone.
  - Añadir enlaces con `routerLink` y `routerLinkActive`.
  - Usar `signal` para abrir/cerrar en móvil.
  - Integrarlo en `app.html` con un layout responsive (`flex`/`grid`).

Con esta estructura ya tendrás una app con **múltiples pantallas**, **diseño responsive global** y una **sidebar navegable y colapsable**. Puedes ir ampliando las rutas, estilos y contenido según lo necesites.

