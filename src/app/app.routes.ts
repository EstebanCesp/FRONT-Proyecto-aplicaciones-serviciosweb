

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
import { InicioComponent } from './components/inicio/inicio.component';

import { authGuard } from './auth/auth.guard';
import { ChangePComponent } from './components/changePassword/change-p.component/change-p.component';
import { ReqEmailComponent } from './components/changePassword/req-email.component/req-email.component';

export const routes: Routes = [
    {
        path: '',
        component: InicioComponent,
    },
    {
        path: 'beca',
        component: BecaComponent,
        canActivate:[authGuard]
    },
    {
        path: 'docente',
        component: DocenteComponent,
        canActivate:[authGuard]

    },
    {
        path: 'apoyo_profesoral',
        component: ApoyoProfesoral,
        canActivate:[authGuard]

    },
    {
        path: 'aliados',
        component: Aliados,
        canActivate:[authGuard]

    },
    {
        path: 'docente_departamento',
        component: DocenteDepartamentoComponent,
        canActivate:[authGuard]

    },
    {
        path: 'alianza',
        component: AlianzaComponent,
        canActivate:[authGuard]

    },
    {
        path: 'estudios_realizados',
        component: EstudiosRealizados,
        canActivate:[authGuard]

    },
    {
        path: 'estudio_ac',
        component: EstudioAc,
        canActivate:[authGuard]

    },
    { 
      path: 'reconocimiento', 
      component: ReconocimientoComponent,
      canActivate:[authGuard]

    },
      
    { 
      path: 'experiencia', 
      component: ExperienciaComponent,
      canActivate:[authGuard]

    },
    {
        path:'login/change-p',
        component: ChangePComponent,
    },
    {
        path:'login/reqEmail',
        component:ReqEmailComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: '',
    },
];