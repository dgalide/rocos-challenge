import { RcClientService } from './rc-client.service';
import { Observable } from 'rxjs';
import { map } from 'rocos-js/node_modules/rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RobotService {

  private robotList$: Observable<any[]>;

  constructor(private rcClient: RcClientService) {}

  public getRobotList(projectID: string): Observable<any> {
    this.robotList$ = this.rcClient.getClient().robot.list(projectID)
      .pipe(
        map(res => res.data)
    ) as any;

    return this.robotList$;
  }
}
