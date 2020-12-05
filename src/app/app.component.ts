import { RcClientService } from './services/rc-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedRobot: string;

  constructor(public client: RcClientService) {
  }
}
