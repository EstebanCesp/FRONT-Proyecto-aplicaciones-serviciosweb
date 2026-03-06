import { Routes } from '@angular/router';
import { ApoyoProfesoral } from './components/apoyo-profesoral/apoyo-profesoral';
import { Aliados } from './components/aliados/aliados';

export const routes: Routes = [
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
