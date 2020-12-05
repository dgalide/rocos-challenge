import { TelemetryService } from './../../services/telemetry.service';
import { RobotService } from './../../services/robot.service';
import { Observable, Subscription } from 'rxjs';
import { IRobotResponse } from './../../models/IRobotResponse';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: ['./robot-list.component.css']
})
export class RobotListComponent implements OnInit {

  public form: FormGroup;
  public robots$: Observable<IRobotResponse[]>;

  @Output() selectedRobot: EventEmitter<string> = new EventEmitter();

  sub: Subscription;

  constructor(private fb: FormBuilder, private robotService: RobotService, private tlmService: TelemetryService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      projectId: ['front-end-challenge', [Validators.required]]
    });
  }

  public getRobots(): void {
    this.robots$ = this.robotService.getRobotList(this.form.get('projectId').value);
  }

  public selectRobot(name: string): void {
    this.selectedRobot.emit(name);
  }

}
