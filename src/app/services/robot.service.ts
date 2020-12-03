import { IRobotResponse } from './../models/IRobotResponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RobotService {

  constructor(private httpClient: HttpClient) {}

  public getRobots(projectId: string): Observable<IRobotResponse[]> {
    return this.httpClient.get(`https://api2.rocos.io/projects/${projectId}/robots`) as Observable<IRobotResponse[]>;
  }
}
