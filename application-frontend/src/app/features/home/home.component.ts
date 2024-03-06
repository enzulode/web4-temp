import { Component, OnInit } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatToolbar } from '@angular/material/toolbar'
import { AuthService } from '../../core/services/auth.service'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { NgIf } from '@angular/common'
import { Router } from '@angular/router'
import { SidenavComponent } from '../../core/components/sidenav/sidenav.component'

@Component({
	selector: 'app-home',
	standalone: true,
  imports: [
    MatButton,
    MatToolbar,
    NgIf,
    SidenavComponent
  ],
	templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  isMobile: boolean = false
  isTablet: boolean = false
  isDesktop: boolean = true

  constructor(
      private readonly authService: AuthService,
      private readonly responsive: BreakpointObserver,
      private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.responsive.observe([Breakpoints.XSmall, Breakpoints.Small])
    .subscribe(result => {
      this.isMobile = result.matches;
    })

    this.responsive.observe(Breakpoints.Medium)
    .subscribe(result => {
      this.isTablet = result.matches
    })

    this.responsive.observe([Breakpoints.Large, Breakpoints.XLarge])
    .subscribe(result => {
      this.isDesktop = result.matches
    })
  }

  redirectToPanel(): void {
    this.router.navigateByUrl('/panel')
  }

  login(): void {
    this.authService.login()
  }

  isLoggedIn(): boolean {
    return this.authService.hasValidToken()
  }
}
