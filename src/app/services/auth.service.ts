import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface ITokenResponse {
  expiresIn: number;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public getToken(params: {applicationId: string, secret: string}): Observable<ITokenResponse> {
    return this.httpClient.post("https://api2.rocos.io/applications/auth", params) as Observable<ITokenResponse>;
  }
}
