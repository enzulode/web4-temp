import {Injectable} from '@angular/core'
import {Observable, Subject} from 'rxjs'
import {AttemptDto} from '../dto/attempt.dto'

@Injectable({
  providedIn: 'root'
})
export class AttemptsStorageSharedDataService {

  private data$: Subject<AttemptDto[]> = new Subject<AttemptDto[]>()
  private storedAttempts: AttemptDto[] = []

  setData(attempts: AttemptDto[]): void {
    this.storedAttempts = attempts
    this.data$.next(this.storedAttempts)
  }

  clearData(): void {
    this.storedAttempts = []
    this.data$.next(this.storedAttempts)
  }

  appendData(attempt: AttemptDto): void {
    this.storedAttempts.push(attempt)
    this.data$.next(this.storedAttempts)
  }

  getData$(): Observable<AttemptDto[]> {
    return this.data$.asObservable()
  }
}
