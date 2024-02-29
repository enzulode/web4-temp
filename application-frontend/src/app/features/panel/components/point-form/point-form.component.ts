import {Component, OnInit} from '@angular/core'
import {MatSelectModule} from '@angular/material/select'
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatButtonModule} from '@angular/material/button'
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import {AttemptService} from '../../../../core/services/attempt.service'
import {PointDto} from '../../../../core/dto/point.dto'
import {AttemptDto} from '../../../../core/dto/attempt.dto'
import {CurrentFormDataService} from '../../../../core/services/current-form-data.service'
import {AttemptsStorageSharedDataService} from '../../../../core/services/attempts-storage-shared-data.service'
import {NgClass, NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-point-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './point-form.component.html',
  styleUrl: './point-form.component.css'
})
export class PointFormComponent implements OnInit {

  formGroup: FormGroup

  isMobile: boolean = false
  isTablet: boolean = false
  isDesktop: boolean = true

  constructor(
      private readonly attemptService: AttemptService,
      private readonly currentFormDataService: CurrentFormDataService,
      private readonly attemptsStorage: AttemptsStorageSharedDataService,
      private readonly formBuilder: FormBuilder,
      private readonly toastrService: ToastrService,
      private readonly responsive: BreakpointObserver
  ) {
    this.formGroup = this.formBuilder.group({
      x: new FormControl<number>(0, [Validators.required, Validators.min(-3), Validators.max(5)]),
      y: new FormControl<string>('', [Validators.required, Validators.pattern('[-+]?[0-9]*\.?[0-9]+'), PointFormComponent.customYValueValidator]),
      r: new FormControl<number>(-3, [Validators.required, Validators.min(1), Validators.max(5)])
    })

    this.formGroup.valueChanges // subscribing for the form data changes events
      .subscribe((formData: PointDto): void => {
        this.currentFormDataService.setData(formData)
      })
  }

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

  /**
   * Custom Y coordinate property validator.
   *
   * @param control an abstract string-typed control to be validated
   */
  static customYValueValidator(control: AbstractControl<string>) {
    let currentY: number = parseFloat(control.value)

    // check that current y value is out of bound
    if (currentY >= 3 || currentY <= -3) {
      return {invalidYPropertyValue: true}
    }

    return null
  }

  /**
   * This function returns form validity status.
   *
   */
  isInvalid(): boolean {
    return !this.formGroup.valid
  }

  /**
   * This function acts on the form submission.
   *
   */
  onSubmit(): void {
    let formData: PointDto = this.getData()

    if (this.isInvalid()) {
      this.toastrService.error('Form data is invalid', 'Form submit failed')
      return
    }

    this.attemptService.newAttempt(formData)
      .subscribe((res: AttemptDto): void => {
        this.attemptsStorage.appendData(res)
      })
  }

  /**
   * This function fetches data from the point form.
   *
   */
  public getData(): PointDto {
    let x: number = this.formGroup.controls['x'].value
    let y: number = parseFloat(this.formGroup.controls['y'].value)
    let r: number = this.formGroup.controls['r'].value
    return { x: x, y: y, r: r }
  }

  /**
   * This function clears the attempts for the current user.
   *
   */
  clearAttempts(): void {
    this.attemptService.clearAttempts()
      .subscribe((): void => {
        this.attemptsStorage.clearData()
      })
  }
}

