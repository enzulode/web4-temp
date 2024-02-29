import { AuthService } from '../services/auth.service';

export function authServiceInitializerFactory(authService: AuthService) {
  return () => authService.runInitialLoginSequence()
}