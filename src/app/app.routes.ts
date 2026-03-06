import { Routes } from '@angular/router';
import { Aliados } from './components/aliados/aliados';

export const routes: Routes = [
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
