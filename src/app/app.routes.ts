import { Routes } from '@angular/router';
import { Aliados } from './components/aliados/aliados';

export const routes: Routes = [
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
    //{
    //    path: 'about',
    //    component: AboutComponent
    //},
    {
        path: '/aliados',
        component : Aliados
    }
];
