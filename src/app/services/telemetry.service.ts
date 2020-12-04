import { Observable } from 'rxjs';
import { FastLaneManager, FastLaneSubscriber } from 'rocos-js';
import { tap, switchMap } from 'rocos-js/node_modules/rxjs/operators';
import { RcClientService } from './rc-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {

  private fastLaneManager: FastLaneManager;
  private sub: FastLaneSubscriber;

  constructor(private rcClient: RcClientService) {
    this.fastLaneManager = new FastLaneManager(this.rcClient.getClientOptions().baseURL);
  }

  public getRobotTelemetry(projectId: string, robots: string[], sources: string[]): Observable<any> {
    const token$ = this.rcClient.getToken() as any;
    return token$.pipe(
      tap((token: string) => this.fastLaneManager.updateToken(token)),
      switchMap(() => {
        this.sub = this.fastLaneManager.subscribe(projectId, robots, sources);
        return this.sub.subject.asObservable();
      })
    );
  }

  public unsubscribe(): void {
    this.sub.unsubscribe();
  }
}
