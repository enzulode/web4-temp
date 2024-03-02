import { AuthConfig } from 'angular-oauth2-oidc';

/*
  OAUTH2 IDENTITY PROVIDER CONFIGURATION
 */
const IDENTITY_PROVIDER_PROTOCOL: string = 'http' // FIXME
const IDENTITY_PROVIDER_HOST: string = '0.0.0.0' // FIXME
const IDENTITY_PROVIDER_PORT: string = '9000' // FIXME
const IDENTITY_PROVIDER_KEYCLOAK_REALM: string = 'prod-realm-name' // FIXME
const IDENTITY_PROVIDER_CLIENT: string = 'prod-client-id' // FIXME
const IDENTITY_PROVIDER_AUTHORIZATION_FLOW: string = 'code'
const IDENTITY_PROVIDER_SCOPES: string = 'profile email'
const IDENTITY_PROVIDER_REDIRECT_URI: string = window.location.origin
const IDENTITY_PROVIDER_ISS_URI: string = `${IDENTITY_PROVIDER_PROTOCOL}://${IDENTITY_PROVIDER_HOST}:${IDENTITY_PROVIDER_PORT}/realms/${IDENTITY_PROVIDER_KEYCLOAK_REALM}`

/*
  API CONFIGURATION
 */
const ATTEMPT_API_PROTOCOL: string = 'http' // FIXME
const ATTEMPT_API_HOST: string = '0.0.0.0' // FIXME
const ATTEMPT_API_PORT: string = '8090' // FIXME
const ATTEMPT_API_VERSION: string = 'v1'

/*
  DO NOT MODIFY THE FOLLOWING CODE BLOCKS
 */
const PRODUCTION_MODE: boolean = true

const oauthDevConfig: AuthConfig = {
  preserveRequestedRoute: true,
  logoutUrl: `${IDENTITY_PROVIDER_ISS_URI}/protocol/openid-connect/logout`,
  issuer: IDENTITY_PROVIDER_ISS_URI,
  tokenEndpoint: `${IDENTITY_PROVIDER_ISS_URI}/protocol/openid-connect/token`,
  userinfoEndpoint: `${IDENTITY_PROVIDER_ISS_URI}/protocol/openid-connect/userinfo`,
  revocationEndpoint: `${IDENTITY_PROVIDER_ISS_URI}/protocol/openid-connect/revoke`,
  clientId: IDENTITY_PROVIDER_CLIENT,
  responseType: IDENTITY_PROVIDER_AUTHORIZATION_FLOW,
  scope: IDENTITY_PROVIDER_SCOPES,
  useSilentRefresh: false,
  redirectUri: IDENTITY_PROVIDER_REDIRECT_URI,
  showDebugInformation: !PRODUCTION_MODE,
  requireHttps: false
}

export const environment = {
  production: PRODUCTION_MODE,
  oauthConfig: oauthDevConfig,
  attemptApiBase: `${ATTEMPT_API_PROTOCOL}://${ATTEMPT_API_HOST}:${ATTEMPT_API_PORT}/api/${ATTEMPT_API_VERSION}`
};
