import { RobotService } from './../../services/robot.service';
import { Observable, Subscription } from 'rxjs';
import { IRobotResponse } from './../../models/IRobotResponse';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FastLaneManager } from 'rocos-js';
import { FocusKeyManager } from '@angular/cdk/a11y';
@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: ['./robot-list.component.css']
})
export class RobotListComponent implements OnInit {

  public form: FormGroup;
  public robots$: Observable<IRobotResponse[]>;

  sub: Subscription;

  constructor(private fb: FormBuilder, private robotService: RobotService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      projectId: ['front-end-challenge', [Validators.required]]
    });
  }

  public getRobots(): void {
    this.robots$ = this.robotService.getRobots(this.form.get('projectId').value);
  }

  public selectRobot(): void {
    // const flm = new FastLaneManager('https://api2.rocos.io');
    // flm.updateToken(this.auth.token);
    // const bla = flm.subscribe('front-end-challenge', ['drone-rocos'], ['/mavlink/ATTITUDE']);

    // this.sub = bla.subject.subscribe(console.log) as any;
  }

  public unsub() {
    this.sub.unsubscribe();
  }

}
