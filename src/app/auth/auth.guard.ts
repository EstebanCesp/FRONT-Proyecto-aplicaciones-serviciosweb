import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const ruta = route.url.toString();
  if (authService.isAuthenticated()) {
    return authService.haveAccess('/' + ruta).pipe(
      map(hasAccess => {
        if (hasAccess) {
          return true;
        } else {
          alert('No tienes acceso a ' + ruta)
          return router.createUrlTree(['/']);
        }
      })
    );
  } else {
    return router.createUrlTree(['/login']);
  }
};