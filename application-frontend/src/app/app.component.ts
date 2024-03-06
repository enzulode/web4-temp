import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { SidenavComponent } from './core/components/sidenav/sidenav.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidenavComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor() {}
}
