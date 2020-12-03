import { RobotService } from './../../services/robot.service';
import { Observable } from 'rxjs';
import { IRobotResponse } from './../../models/IRobotResponse';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: ['./robot-list.component.css']
})
export class RobotListComponent implements OnInit {

  public form: FormGroup;
  public robots$: Observable<IRobotResponse[]>;

  constructor(private fb: FormBuilder, private robotService: RobotService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      projectId: ['front-end-challenge', [Validators.required]]
    });
  }

  public getRobots(): void {
    this.robots$ = this.robotService.getRobots(this.form.get('projectId').value);
  }

}
