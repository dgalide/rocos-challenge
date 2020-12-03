import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttitudeDataService {

  constructor(private httpClient: HttpClient) {}

  public registerReceiver(): Observable<any> {
    return this.httpClient.post('https://api2.rocos.io/teletubby.v1.TelemetryGateway/RegisterReceiver', {});
  }
}
