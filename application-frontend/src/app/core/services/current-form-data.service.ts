import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { PointDto } from '../dto/point.dto'

@Injectable({
  providedIn: 'root'
})
export class CurrentFormDataService {

  /** Subject, that represents the current form data. */
  private data$: Subject<PointDto> = new Subject<PointDto>()

  /**
   * This function submits new data to the existing subject.
   *
   * @param data data to be submitted.
   */
  setData(data: PointDto): void {
    this.data$.next(data)
  }

  /**
   * This function creates an observable. Using this observable you can easily subscribe for the
   * current form data update event.
   *
   * @returns Observable<PointDto> as a subscribable entity
   */
  getData$(): Observable<PointDto> {
    return this.data$.asObservable()
  }
}