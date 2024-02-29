import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core'
import {PointDto} from '../../../../core/dto/point.dto'
import {CurrentFormDataService} from '../../../../core/services/current-form-data.service'
import {AttemptService} from '../../../../core/services/attempt.service'
import {AttemptDto} from '../../../../core/dto/attempt.dto'
import {AttemptsStorageSharedDataService} from '../../../../core/services/attempts-storage-shared-data.service'
import {CurrentErrorService} from '../../../../core/services/current-error.service'

@Component({
  selector: 'app-point-graph',
  standalone: true,
  template: `<canvas height="300" width="300" #pointGraphCanvas></canvas>`
})
export class PointGraphComponent implements AfterViewInit {

  @ViewChild('pointGraphCanvas', { static: false })
  canvas: ElementRef<HTMLCanvasElement> | undefined

  private ctx: CanvasRenderingContext2D | undefined | null

  private storedAttempts: AttemptDto[] = []

  private currentFormData: PointDto | undefined
  private dynamicScaling: number = 1

  constructor(
      private readonly pointSharedDataService: CurrentFormDataService,
      private readonly attemptService: AttemptService,
      private readonly attemptsStorage: AttemptsStorageSharedDataService,
      private readonly errorService: CurrentErrorService
  ) {}

  ngAfterViewInit(): void {
    this.pointSharedDataService.getData$() // redraw canvas in compliance with updated radius
      .subscribe((data: PointDto): void => {
        this.currentFormData = data
        this.redrawCanvas()
      })

    if (this.canvas) { // configuring canvas for specific DPI
      this.ctx = this.canvas.nativeElement.getContext('2d')

      let dpi: number = window.devicePixelRatio
      let height: number = +getComputedStyle(this.canvas.nativeElement).getPropertyValue('height').slice(0, -2)
      let width: number = +getComputedStyle(this.canvas.nativeElement).getPropertyValue('width').slice(0, -2)

      this.canvas.nativeElement.setAttribute('height', `${height * dpi}`)
      this.canvas.nativeElement.setAttribute('width', `${width * dpi}`)

      this.clear()

      this.canvas.nativeElement.addEventListener('click', (e: MouseEvent) => this.onClick(e))
    }

    this.attemptsStorage.getData$()
      .subscribe((data: AttemptDto[]): void => {
        this.storedAttempts = data
        this.redrawCanvas()
      })
  }

  private isRadiusValid(): boolean {
    return !!this.currentFormData && !!this.currentFormData.r && this.currentFormData.r >= 1 && this.currentFormData.r <= 5
  }

  private redrawCanvas(): void {
    if (this.canvas) { // canvas should exist, so check it
      if (this.currentFormData && this.isRadiusValid()) { // if canvas & radius are ok - redraw canvas
        let baseScaling: number = this.canvas.nativeElement.width / 6
        this.dynamicScaling = baseScaling / this.currentFormData.r
        this.clear()
        this.drawSemiCircle(this.currentFormData.r)
        this.drawTriangle(this.currentFormData.r)
        this.drawRectangle(this.currentFormData.r)
        this.drawCartesian()
        this.drawTicks(this.currentFormData.r)
        this.drawLabels(this.currentFormData.r)

        this.drawAttempts(this.storedAttempts)
      } else { // otherwise clear canvas and do nothing
        this.clear()
        return
      }
    }
  }

  private clear(): void {
    if (this.canvas && this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height)
    }
  }

  private onClick(e: MouseEvent): void {
    if (this.canvas && this.currentFormData && this.currentFormData.r && this.isRadiusValid()) {

      const x: number = e.clientX - this.canvas.nativeElement.getBoundingClientRect().left
      const y: number = e.clientY - this.canvas.nativeElement.getBoundingClientRect().top

      const graphX: number = Math.round((x - this.canvas.nativeElement.width / 2) / this.dynamicScaling)
      const graphY: number = (this.canvas.nativeElement.height / 2 - y) / this.dynamicScaling
      const graphR: number = this.currentFormData.r

      if (this.currentFormData.r > 0) {
        this.attemptService.newAttempt({x: graphX, y: graphY, r: graphR})
          .subscribe({
            next: (res: AttemptDto): void => {
              this.attemptsStorage.appendData(res)
              this.errorService.clearError()
            },
            error:(err): void => {
              if (err.error) {
                let errorMessage: string = err.error.message ? err.error.message : 'Unknown error'
                this.errorService.setError({errored: true, message: errorMessage})
              }
            }
          })
      }
    }
  }


  /*
  -------------------------------------------------------------------------------
  | A block of functions that simply draw shapes and other stuff on the canvas. |
  -------------------------------------------------------------------------------
   */

  /**
   * This function draws a semicircle with provided parameters on the canvas.
   *
   * @param radius semicircle radius
   * @param color semicircle color
   * @private
   */
  private drawSemiCircle(radius: number, color: string = '#198fe3'): void {
    let { canvas, ctx } = this
    if (ctx && canvas) {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(
          canvas.nativeElement.width / 2,
          canvas.nativeElement.height / 2,
          radius * this.dynamicScaling,
          Math.PI,
          3 * Math.PI / 2,
          false
      )
      ctx.lineTo(canvas.nativeElement.width / 2, canvas.nativeElement.height / 2)
      ctx.fill()
    }
  }

  /**
   * This function draws a triangle with provided parameters on the canvas.
   *
   * @param radius which is not an actual radius. This property is a special variable, that the
   * triangle shape size depends on
   * @param color triangle color
   * @private
   */
  private drawTriangle(radius: number, color: string = '#198fe3'): void {
    let { canvas, ctx } = this
    if (ctx && canvas) {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(canvas.nativeElement.width / 2, canvas.nativeElement.height / 2)
      ctx.lineTo(canvas.nativeElement.width / 2, canvas.nativeElement.height / 2 + radius * this.dynamicScaling)
      ctx.lineTo(canvas.nativeElement.width / 2 - radius / 2 * this.dynamicScaling, canvas.nativeElement.height / 2)
      ctx.fill()
    }
  }

  /**
   * This function draws a rectangle with provided parameters on the canvas.
   *
   * @param radius which is not an actual radius. This property is a special variable, that the
   * rectangle shape size depends on
   * @param color rectangle color
   * @private
   */
  private drawRectangle(radius: number, color: string = '#198fe3'): void {
    let { canvas, ctx } = this
    if (canvas && ctx) {
      ctx.fillStyle = color
      ctx.fillRect(
          canvas.nativeElement.width / 2,
          canvas.nativeElement.height / 2,
          radius * this.dynamicScaling,
          radius * this.dynamicScaling
      )
    }
  }

  /**
   * This function draws an axis from one point (x1, y1) to another (x2, y2).
   *
   * @param x1 first point x coordinate
   * @param y1 first point y coordinate
   * @param x2 second point x coordinate
   * @param y2 second point y coordinate
   * @param color axis color
   * @private
   */
  private drawAxis(x1: number, y1: number, x2: number, y2: number, color: string = '#000000'): void {
    const headLength: number = 10
    const angle: number = Math.atan2(y2 - y1, x2 - x1)

    if (this.canvas && this.ctx) {
      this.ctx.strokeStyle = color
      this.ctx.beginPath()
      this.ctx.moveTo(x1, y1)
      this.ctx.lineTo(x2, y2)
      this.ctx.lineTo(x2 - headLength * Math.cos(angle - Math.PI / 6), y2 - headLength * Math.sin(angle - Math.PI / 6))
      this.ctx.moveTo(x2, y2)
      this.ctx.lineTo(x2 - headLength * Math.cos(angle + Math.PI / 6), y2 - headLength * Math.sin(angle + Math.PI / 6))
      this.ctx.stroke()
    }
  }

  /**
   * This function draws a cartesian coordinate system on the canvas.
   *
   * @private
   */
  private drawCartesian(): void {
    if (this.canvas && this.ctx) {
      let canvas: HTMLCanvasElement = this.canvas.nativeElement

      this.ctx.lineWidth = 1
      this.drawAxis(0, canvas.height / 2, canvas.width, canvas.height / 2) // X - axis
      this.drawAxis(canvas.width / 2, canvas.height, canvas.width / 2, 0) // Y - axis
    }
  }

  /**
   * This function draws ticks for the cartesian coordinate system on the canvas.
   *
   * @param r current r parameter
   * @param color ticks color
   * @private
   */
  private drawTicks(r: number, color: string = '#000000'): void {
    if (this.canvas && this.ctx) {
      let canvas: HTMLCanvasElement = this.canvas.nativeElement
      const tickLength: number = 5
      this.ctx.strokeStyle = color

      // X-axis ticks
      for (let tickValue: number = -r; tickValue <= r; tickValue += r / 2) {
        const xTickPosition: number = canvas.width / 2 + tickValue * this.dynamicScaling;
        this.ctx.beginPath();
        this.ctx.moveTo(xTickPosition, canvas.height / 2 - tickLength / 2);
        this.ctx.lineTo(xTickPosition, canvas.height / 2 + tickLength / 2);
        this.ctx.stroke();
      }

      // Y-axis ticks
      for (let tickValue: number = -r; tickValue <= r; tickValue += r / 2) {
        const yTickPosition: number = canvas.height / 2 - tickValue * this.dynamicScaling;
        this.ctx.beginPath();
        this.ctx.moveTo(canvas.width / 2 - tickLength / 2, yTickPosition);
        this.ctx.lineTo(canvas.width / 2 + tickLength / 2, yTickPosition);
        this.ctx.stroke();
      }
    }
  }

  /**
   * This function draws labels for the already drawn ticks for the cartesian coordinate system
   * on the canvas.
   *
   * @param r current r parameter
   * @param color labels color
   * @private
   */
  private drawLabels(r: number, color: string = '#000000'): void {
    if (this.canvas && this.ctx) {
      let canvas: HTMLCanvasElement = this.canvas.nativeElement
      this.ctx.strokeStyle = color

      const labelSize: string = r.toString()
      const labelSizeHalf: string = (r/2).toString()
      const xOffset: number = 10
      const yOffset: number = 5

      this.ctx.fillStyle = color

      // 	X axis labels
      this.ctx.fillText('-' + labelSize, canvas.width / 2 - r * this.dynamicScaling, canvas.height / 2 + xOffset)
      this.ctx.fillText('-' + labelSizeHalf, canvas.width / 2 - (r / 2) * this.dynamicScaling, canvas.height / 2 + xOffset)
      this.ctx.fillText(labelSizeHalf, canvas.width / 2 + (r / 2) * this.dynamicScaling, canvas.height / 2 + xOffset)
      this.ctx.fillText(labelSize, canvas.width / 2 + r * this.dynamicScaling, canvas.height / 2 + xOffset)

      // 	Y axis labels
      this.ctx.fillText(labelSize, canvas.width / 2 + yOffset, canvas.height / 2 - r * this.dynamicScaling)
      this.ctx.fillText(labelSizeHalf, canvas.width / 2 + yOffset, canvas.height / 2 - (r / 2) * this.dynamicScaling)
      this.ctx.fillText('-' + labelSizeHalf, canvas.width / 2 + yOffset, canvas.height / 2 + (r / 2) * this.dynamicScaling)
      this.ctx.fillText('-' + labelSize, canvas.width / 2 + yOffset, canvas.height / 2 + r * this.dynamicScaling)
    }
  }

  /**
   * This function draws a hit attempt with color, depends on the targeted area hit status.
   *
   * @param attempt attempt instance to be drawn
   */
  public drawAttempt(attempt: AttemptDto): void {
    if (this.canvas && this.ctx) {
      const cX: number = this.canvas.nativeElement.width / 2 + attempt.x * this.dynamicScaling
      const cY: number = this.canvas.nativeElement.height / 2 - attempt.y * this.dynamicScaling

      this.ctx.fillStyle = attempt.hit ? '#19fa00' : '#ff1100'
      this.ctx.beginPath()
      this.ctx.arc(cX, cY, 3, 0, Math.PI * 2)
      this.ctx.fill()
    }
  }

  /**
   * This function draws multiple attempts in one time.
   *
   * @param attempts an array of attempts
   * @private
   */
  private drawAttempts(attempts: AttemptDto[]): void {
    if (this.canvas && this.ctx && this.currentFormData && this.currentFormData.r > 0) {
      for (let ptr: number = 0; ptr < attempts.length; ptr++) {
        if (this.currentFormData.r == attempts[ptr].r) {
          this.drawAttempt(attempts[ptr])
        }
      }
    }
  }
}
