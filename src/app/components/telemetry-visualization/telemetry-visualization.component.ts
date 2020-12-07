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
  sub: any;
  telemetry: any;
  yaw: number;
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
    this.telemetry = this.tlmService.getRobotTelemetry('front-end-challenge', [this.selectedRobot], ['/mavlink/ATTITUDE']);
  }

  subscribe(): void {

    this.sub = this.telemetry.subscribe(tlm => {
      const roll = this.radiansToDegree(tlm.payload.roll);
      this.pitchRollIndicator.setRoll(roll);
      const pitch = this.radiansToDegree(tlm.payload.pitch);
      this.pitchRollIndicator.setPitch(pitch);
      this.yaw = tlm.payload.yaw;
      console.log(tlm.payload);
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
