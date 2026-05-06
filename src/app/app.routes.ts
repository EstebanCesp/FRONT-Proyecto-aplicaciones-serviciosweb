

import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { ApoyoProfesoral } from './components/apoyo-profesoral/apoyo-profesoral';
import { Aliados } from './components/aliados/aliados';
import { BecaComponent } from './components/beca/beca.components';
import { DocenteDepartamentoComponent } from './components/docente-departamento.component/docente-departamento.component';
import { AlianzaComponent } from './components/alianza.component/alianza.component';
import { DocenteComponent } from './components/docente.component/docente.component';
import { EstudiosRealizados } from './components/estudios-realizados/estudios-realizados';
import { EstudioAc } from './components/estudio-ac/estudio-ac';
import { ReconocimientoComponent } from './components/Reconocimiento/Reconocimiento.components';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
  },
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
        path: 'estudios_realizados',
        component: EstudiosRealizados,
    },
    {
        path: 'estudio_ac',
        component: EstudioAc,
    },
    { 
      path: 'reconocimiento', 
      component: ReconocimientoComponent },
    { 
      path: 'experiencia', 
      component: ExperienciaComponent },
    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
     },
     {
    path: '**',
    redirectTo: 'login',
     },
];