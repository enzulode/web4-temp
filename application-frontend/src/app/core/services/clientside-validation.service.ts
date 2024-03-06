import { Injectable } from '@angular/core'
import { PointDto } from '../dto/point.dto'

@Injectable({
  providedIn: 'root'
})
export class ClientsideValidationService {

  private validXR: number[] = [-3, -2, -1, 0, 1, 2, 3, 4, 5]

  checkPoint(point: PointDto): boolean {
    return this.checkX(point.x) && this.checkY(point.y) && this.checkR(point.r)
  }

  checkX(xCoord: number | undefined | null): boolean {
    return xCoord != undefined && this.validXR.includes(xCoord)
  }

  checkY(yCoord: number | undefined | null): boolean {
    return yCoord != undefined && yCoord > -3 && yCoord < 3
  }

  checkR(rValue: number | undefined | null): boolean {
    return rValue != undefined && this.validXR.includes(rValue)
  }
}
