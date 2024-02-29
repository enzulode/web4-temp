import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { PointDto } from '../dto/point.dto'
import { AttemptDto } from '../dto/attempt.dto'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AttemptService {

  static API_BASE_URL: string = 'http://localhost:8090/api/v1/attempt'
  private readonly AUTH_HEADER: string = 'Bearer ' + this.authService.token()

  constructor(
      private readonly httpClient: HttpClient,
      private readonly authService: AuthService
  ) {}

  newAttempt(pointDto: PointDto): Observable<AttemptDto> {
    return  this.httpClient.post<AttemptDto>(AttemptService.API_BASE_URL + '/new', pointDto, {
      headers: { 'Authorization': this.AUTH_HEADER }
    })
  }

  fetchPaged(pageSize: number, page: number): Observable<AttemptDto[]> {
    let args: HttpParams = new HttpParams()
    args.append('pageSize', pageSize)
    args.append('page', pageSize)

    return this.httpClient.get<AttemptDto[]>(AttemptService.API_BASE_URL + '/fetch', {
      params: args,
      headers: { 'Authorization': this.AUTH_HEADER }
    })
  }

  clearAttempts(): Observable<void> {
    return this.httpClient.delete<void>(AttemptService.API_BASE_URL, {
      headers: { 'Authorization': this.AUTH_HEADER }
    })
  }

  fetchAll(): Observable<AttemptDto[]> {
    return this.httpClient.get<AttemptDto[]>(AttemptService.API_BASE_URL + '/all', {
      headers: { 'Authorization': this.AUTH_HEADER }
    })
  }
}
