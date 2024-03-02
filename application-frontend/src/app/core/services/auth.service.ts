import { Injectable } from '@angular/core'
import { OAuthService } from 'angular-oauth2-oidc'
import { oauthConfig } from '../../oauth.config'
import { BehaviorSubject, ReplaySubject } from 'rxjs'
import { Router } from '@angular/router'

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
      private readonly oauthService: OAuthService
  ) {
    this.oauthService.configure(oauthConfig)

    this.oauthService.events.subscribe(_ => {
      this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken())
    });

    this.oauthService.setupAutomaticSilentRefresh()
  }

  public runInitialLoginSequence() {
    try {
      this.oauthService.loadDiscoveryDocument()
      this.oauthService.tryLoginCodeFlow()
      this.isDoneLoadingSubject$.next(true)
    } catch {
      this.isDoneLoadingSubject$.next(true)
    }
  }

  login(targetUrl?: string) { this.oauthService.initCodeFlow(targetUrl || this.router.url) }

  logout() { this.oauthService.logOut() }
  token(): string { return this.oauthService.getAccessToken() }

  // TODO: make the following PIECE OF SHIT less useless than now...
  hasValidToken(): boolean { return this.oauthService.hasValidAccessToken() }

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