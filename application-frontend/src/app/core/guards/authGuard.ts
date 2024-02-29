import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { filter, switchMap, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  let isAuthenticated: boolean
  const authService: AuthService = inject(AuthService)
  authService.isAuthenticated$.subscribe(i => isAuthenticated = i)

  return authService.isDoneLoading$
  .pipe(
      filter(isDone => isDone),
      switchMap(_ => authService.isAuthenticated$),
      tap(isAuthenticated => isAuthenticated || authService.login(state.url))
  )
}