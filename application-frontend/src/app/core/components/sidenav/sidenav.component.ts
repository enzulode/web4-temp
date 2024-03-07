import { Component } from '@angular/core'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbar } from '@angular/material/toolbar'
import { NgIf } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { NavItemComponent } from '../nav-item/nav-item.component'
import { NavHeaderComponent } from '../nav-header/nav-header.component'
import { NavIconItemComponent } from '../nav-icon-item/nav-icon-item.component'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatFormField,
    MatToolbar,
    NgIf,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    NavItemComponent,
    NavHeaderComponent,
    NavIconItemComponent,
    RouterLink
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  constructor(
      private readonly authService: AuthService
  ) {}

  isAuthenticated(): boolean {
    return this.authService.hasValidToken()
  }

  login(): void {
    this.authService.login()
  }

  logout(): void {
    this.authService.logout()
  }
}
