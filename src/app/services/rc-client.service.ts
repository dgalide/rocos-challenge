import { share, map } from 'rocos-js/node_modules/rxjs/operators'; // Typing conflict otherwise, might check version
import { Injectable } from '@angular/core';
import { IRocosClientOptions, RocosClient } from 'rocos-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RcClientService {

  private client: RocosClient;
  private token$: Observable<string>;

  constructor() {
    const opt = {
      baseURL: 'https://api2.rocos.io'
    } as IRocosClientOptions;

    this.client = new RocosClient(opt);
  }

  public authenticate(appId: string, appKey: string): Observable<string> {
    // No need for unsubscribe, it auto unsubscribe once all observer have unsubscribe themselves
    this.token$ = this.client.user.applicationAuth(appId, appKey).pipe(share(), map(res => res.data.token)) as any;
    return this.token$;
  }

  public getToken(): Observable<string> {
    return this.token$;
  }
}
