import { Injectable } from '@angular/core'
import { OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc'
import { BehaviorSubject, ReplaySubject } from 'rxjs'
import { Router } from '@angular/router'
import { environment } from '../../../environments/environment'
import { from } from 'rxjs'
import { CurrentErrorService } from './current-error.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false)
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable()

  private isDoneLoadingSubject$ = new ReplaySubject<boolean>()
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable()

  constructor(
      private readonly router: Router,
      private readonly oauthService: OAuthService,
      private readonly errorService: CurrentErrorService
  ) {
    this.oauthService.configure(environment.oauthConfig)

    this.oauthService.events.subscribe(_ => {
      this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken())
    });

    this.oauthService.setupAutomaticSilentRefresh()
  }

  public runInitialLoginSequence(): void {
    from(this.oauthService.loadDiscoveryDocument())
      .subscribe({
        next: (e: OAuthSuccessEvent): void => {
          this.errorService.clearError()
          from(this.oauthService.tryLoginCodeFlow())
            .subscribe(() => {
              this.isDoneLoadingSubject$.next(true)
            })
        },
        error: (): void => {
          this.errorService.setError({errored: true, message: 'Authentication server is down. Try again later :c'})
        }
      })
  }

  login(targetUrl?: string) { this.oauthService.initCodeFlow(targetUrl || this.router.url) }

  logout() { this.oauthService.logOut() }
  token(): string { return this.oauthService.getAccessToken() }

  hasValidToken(): boolean { return this.oauthService.hasValidAccessToken() }

  // TODO: make the following PIECE OF SHIT less useless than now...
  public hasRole(role: string): boolean {
    let claims: any = this.oauthService.getIdentityClaims();
    if (claims && claims.groups) {
      let roles: string[] = claims.groups;
      roles = roles.map(role => role.toUpperCase());
      return roles.includes(role.toLocaleUpperCase());
    }
    return false;
  }
}