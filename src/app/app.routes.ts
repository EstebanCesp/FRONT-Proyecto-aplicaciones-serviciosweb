import { Routes } from '@angular/router';
import { ApoyoProfesoral } from './components/apoyo-profesoral/apoyo-profesoral';

export const routes: Routes = [
    {
        path: 'apoyo_profesoral',
        component: ApoyoProfesoral
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
    //{
    //    path: 'about',
    //    component: AboutComponent
    //},
];
