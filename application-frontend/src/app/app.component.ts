import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {KeycloakAngularModule} from "keycloak-angular";
import {AuthService} from "./core/services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
      CommonModule,
      RouterOutlet
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor() {}
}
