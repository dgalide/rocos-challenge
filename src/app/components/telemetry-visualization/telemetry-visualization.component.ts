import { TelemetryService } from './../../services/telemetry.service';
import { Component, Input, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-telemetry-visualization',
  templateUrl: './telemetry-visualization.component.html',
  styleUrls: ['./telemetry-visualization.component.css']
})
export class TelemetryVisualizationComponent implements OnInit {

  pitchRollIndicator: any;
  yawIndicator: any;
  sub: any;
  telemetry: any;
  @Input() selectedRobot: string;

  constructor(private tlmService: TelemetryService) { }

  ngOnInit(): void {

    const options = {
      size : 200,
      roll : 0,
      pitch : 0,
      heading: 0,
      showBox : true,
      img_directory : 'assets/img/'
    };

    this.pitchRollIndicator = $.flightIndicator('#attitude', 'attitude', options);
    this.yawIndicator = $.flightIndicator('#heading', 'heading', options);
    this.telemetry = this.tlmService.getRobotTelemetry('front-end-challenge', [this.selectedRobot], ['/mavlink/ATTITUDE']);
  }

  subscribe(): void {

    this.sub = this.telemetry.subscribe(tlm => {
      console.log(tlm.payload);
      this.pitchRollIndicator.setRoll(this.radiansToDegree(tlm.payload.roll));
      this.pitchRollIndicator.setPitch(this.radiansToDegree(tlm.payload.pitch));
      this.yawIndicator.setHeading(this.radiansToDegree(tlm.payload.yaw));
    });
  }

  unsubscribe(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  radiansToDegree(radians: number): number {
    return radians * 180 / Math.PI;
  }

}
