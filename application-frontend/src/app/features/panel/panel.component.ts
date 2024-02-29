import {Component, OnInit} from '@angular/core';
import {AttemptService} from "../../core/services/attempt.service";
import {NgClass, NgIf} from "@angular/common";
import {ResultsTableComponent} from "./components/results-table/results-table.component";
import {MatButtonModule} from "@angular/material/button";
import {PointFormComponent} from "./components/point-form/point-form.component";
import {PointGraphComponent} from "./components/point-graph/point-graph.component";
import {AttemptsStorageSharedDataService} from "../../core/services/attempts-storage-shared-data.service";
import {AttemptDto} from "../../core/dto/attempt.dto";
import {CurrentErrorService} from "../../core/services/current-error.service";
import {ToastrService} from "ngx-toastr";
import {ErrorStateDto} from "../../core/dto/error-state.dto";
import {MatToolbar} from "@angular/material/toolbar";
import {AuthService} from "../../core/services/auth.service";
import {MatGridList, MatGridTile, MatGridTileText} from "@angular/material/grid-list";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-point-check-panel',
  standalone: true,
  imports: [NgIf, ResultsTableComponent, MatButtonModule, PointFormComponent, PointGraphComponent, MatToolbar, MatGridList, MatGridTile, MatGridTileText, NgClass],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {

  isMobile: boolean = false
  isTablet: boolean = false
  isDesktop: boolean = true
  isDesktop4KResolution: boolean = false

  /**
   * Constructs panel component using provided dependencies.
   *
   * @param attemptsStorage attempts storage instance
   * @param attemptService attempt service instance
   * @param errorService current error service instance
   * @param toastrService toastr service instance
   * @param authService auth service instance
   * @param responsive breakpoint observer instance
   */
  constructor(
      private readonly attemptsStorage: AttemptsStorageSharedDataService,
      private readonly attemptService: AttemptService,
      private readonly errorService: CurrentErrorService,
      private readonly toastrService: ToastrService,
      private readonly authService: AuthService,
      private readonly responsive: BreakpointObserver
  ) {}

  /**
   * This function performs the single source of truth initialization: an array of the stored attempts.
   */
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

    this.responsive.observe('(min-width: 3840px)')
    .subscribe(result => {
      this.isDesktop4KResolution = result.matches
    })

    this.attemptService.fetchAll()
      .subscribe((attempts: AttemptDto[]): void => {
        this.attemptsStorage.setData(attempts)
      })

    this.errorService.getError$()
      .subscribe((err: ErrorStateDto): void => {
        if (err.errored) {
          this.toastrService.error(err.message, 'Failed to perform attempt')
        }
      })
  }

  logout(): void {
    this.authService.logout()
  }

}
