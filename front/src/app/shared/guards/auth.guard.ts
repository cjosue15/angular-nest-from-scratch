import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../data-access/auth-state.service';

export const privateGuard = (): CanActivateFn => {
  return () => {
    const authState = inject(AuthStateService);
    const router = inject(Router);

    const session = authState.getSession();

    if (session) {
      return true;
    }

    router.navigateByUrl('/auth/log-in');

    return false;
  };
};

export const publicGuard = (): CanActivateFn => {
  return () => {
    const authState = inject(AuthStateService);
    const router = inject(Router);

    const session = authState.getSession();

    console.log(session);

    if (session) {
      router.navigateByUrl('/dashboard');
      return false;
    }

    return true;
  };
};
