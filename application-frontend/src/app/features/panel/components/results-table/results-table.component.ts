import { Component, OnInit, ViewChild } from '@angular/core'
import { MatTable, MatTableModule } from '@angular/material/table'
import { AttemptDto } from '../../../../core/dto/attempt.dto'
import { AttemptsStorageSharedDataService } from '../../../../core/services/attempts-storage-shared-data.service'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { NgClass } from '@angular/common'

@Component({
  selector: 'app-results-table',
  standalone: true,
  imports: [MatTableModule, NgClass],
  templateUrl: './results-table.component.html',
  styleUrl: './results-table.component.css'
})
export class ResultsTableComponent implements OnInit {

  displayedColumns: string[] = ['x', 'y', 'r', 'hit']
  datasource: AttemptDto[] = []

  @ViewChild(MatTable) table!: MatTable<AttemptDto>

  isMobile: boolean = false
  isTablet: boolean = false
  isDesktop: boolean = true


  constructor(
      private readonly attemptsStorage: AttemptsStorageSharedDataService,
      private readonly responsive: BreakpointObserver
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

    this.attemptsStorage.getData$()
      .subscribe((data: AttemptDto[]): void => {
        this.removeAllElements()
        this.addElements(data)
      })
  }

  addElements(attempts: AttemptDto[]): void {
    this.datasource.push(...attempts)
    this.table.renderRows()
  }

  removeAllElements(): void {
    this.datasource = []
    this.table.renderRows()
  }
}
