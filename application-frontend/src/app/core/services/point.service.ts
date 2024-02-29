import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { PointDto } from '../dto/point.dto'
import { AttemptDto } from '../dto/attempt.dto'
import { Observable } from 'rxjs'
import {AuthService} from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class PointService {

  static API_BASE_URL: string = 'http://localhost:8090/api/v1/point'

  private readonly AUTH_HEADER: string = 'Bearer ' + this.authService.token()

  constructor(
      private readonly httpClient: HttpClient,
      private readonly authService: AuthService
  ) {}
}