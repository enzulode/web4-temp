import {AuthConfig} from 'angular-oauth2-oidc';

const issuerUri: string = 'http://localhost:9000/realms/lab4-web'

const oauthDevConfig: AuthConfig = {
  preserveRequestedRoute: true,
  logoutUrl: issuerUri + '/protocol/openid-connect/logout',
  issuer: issuerUri,
  tokenEndpoint: issuerUri + '/protocol/openid-connect/token',
  userinfoEndpoint: issuerUri + '/protocol/openid-connect/userinfo',
  revocationEndpoint: issuerUri + '/protocol/openid-connect/revoke',
  clientId: 'lab4-web-client',
  responseType: 'code',
  scope: 'profile email',
  showDebugInformation: true,
  useSilentRefresh: false,
  redirectUri: 'http://localhost:8888/',
  requireHttps: false
}

export const environment = {
  production: false,
  attemptDevApiBase: 'http://localhost:8090/api/v1',
  oauthConfig: oauthDevConfig
};
