import { share, map, tap } from 'rocos-js/node_modules/rxjs/operators'; // Typing conflict otherwise, might check version
import { Injectable } from '@angular/core';
import { IRocosClientOptions, RocosClient } from 'rocos-js';
import { Observable } from 'rxjs';

export interface ICredentials {
  appId: string;
  appKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class RcClientService {

  private client: RocosClient;
  private token$: Observable<string>;
  private credentials: ICredentials;

  private clientOptions: IRocosClientOptions = {
    baseURL: 'https://api2.rocos.io'
  };

  constructor() {
    this.client = new RocosClient(this.clientOptions);
  }

  public authenticate(appId: string, appKey: string): Observable<string> {

    this.credentials = {
      appId,
      appKey
    };

    // No need for unsubscribe, it auto unsubscribe once all observer have unsubscribe themselves
    this.token$ = this.client.user.applicationAuth(appId, appKey)
      .pipe(
        share(),
        map(res => res.data.token),
        tap(token => this.client.updateToken(token))) as any;

    return this.token$;
  }

  public getClient(): RocosClient {
    return this.client;
  }

  public getToken(): Observable<string> {
    return this.token$;
  }

  public getCredentials(): ICredentials {
    return this.credentials;
  }

  public getClientOptions(): IRocosClientOptions {
    return this.clientOptions;
  }
}
