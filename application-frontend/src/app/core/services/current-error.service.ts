import {Injectable} from '@angular/core'
import {Observable, Subject} from 'rxjs'
import {ErrorStateDto} from '../dto/error-state.dto'

@Injectable({
  providedIn: 'root'
})
export class CurrentErrorService {
  private error$: Subject<ErrorStateDto> = new Subject<ErrorStateDto>()
  private errorInstance: ErrorStateDto = {errored: false, message: ''}

  setError(error: ErrorStateDto): void {
    if (!this.errorInstance.errored && error && error.errored && error.message) {
      this.error$.next(error)
    }
  }

  getError$(): Observable<ErrorStateDto> {
    return this.error$.asObservable()
  }

  isErrored(): boolean {
    return !!this.errorInstance && this.errorInstance.errored
  }

  clearError(): void {
    this.errorInstance = {errored: false, message: ''}
    this.error$.next(this.errorInstance)
  }
}