import { Routes } from '@angular/router';
import { ApoyoProfesoral } from './components/apoyo-profesoral/apoyo-profesoral';
import { Aliados } from './components/aliados/aliados';
import { BecaComponent } from './components/beca/beca.components';

export const routes: Routes = [
    {
        path: 'beca',
        component: BecaComponent
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
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
