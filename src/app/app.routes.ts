import { Routes } from '@angular/router';
import { ApoyoProfesoral } from './components/apoyo-profesoral/apoyo-profesoral';
import { Aliados } from './components/aliados/aliados';
import { BecaComponent } from './components/beca/beca.components';
import { DocenteComponent } from './components/docente.component/docente.component';
import { DocenteDepartamentoComponent } from './components/docente-departamento.component/docente-departamento.component';
import { AlianzaComponent } from './components/alianza.component/alianza.component';

export const routes: Routes = [
    {
        path: 'beca',
        component: BecaComponent
    },
    {
        path: 'docente',
        component: DocenteComponent
    },
    {
        path: 'apoyo_profesoral',
        component: ApoyoProfesoral
    },
    {
        path: 'aliados',
        component: Aliados,
    },
    {
        path: 'docente_departamento',
        component: DocenteDepartamentoComponent,
    },
    {
        path: 'alianza',
        component: AlianzaComponent,
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
