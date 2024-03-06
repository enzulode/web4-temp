import { Component, Input } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'

@Component({
  standalone: true,
  selector: 'nav-icon-item',
  templateUrl: './nav-icon-item.component.html',
  styleUrl: './nav-icon-item.component.css',
  imports: [MatCardModule, MatIcon]
})
export class NavIconItemComponent {

  @Input({ required: true })
  iconName!: string

}