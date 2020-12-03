import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ITokenResponse } from '../models/ITokenReponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: string;

  constructor(private httpClient: HttpClient) { }

  public getToken(params: {applicationId: string, secret: string}): Observable<ITokenResponse> {
    return this.httpClient.post('https://api2.rocos.io/applications/auth', params).
    pipe(
      tap((res: ITokenResponse) => this.token = res.token)
      ) as Observable<ITokenResponse>;
  }
}
