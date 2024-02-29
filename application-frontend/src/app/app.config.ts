import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from "@angular/common/http";
import { provideOAuthClient } from "angular-oauth2-oidc";
import { authServiceInitializerFactory } from "./core/factories/auth-service-initializer.factory";
import { AuthService } from "./core/services/auth.service";
import {provideAnimations} from "@angular/platform-browser/animations";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {provideToastr} from "ngx-toastr";

export const appConfig: ApplicationConfig = {

  providers: [
      provideRouter(routes, withDebugTracing()),
      provideHttpClient(),
      importProvidersFrom(NgbModule),
      provideOAuthClient(),
      {
        provide: APP_INITIALIZER,
        useFactory: authServiceInitializerFactory,
        deps: [AuthService],
        multi: true
      },
      provideAnimations(),
      provideToastr()
  ]

};
