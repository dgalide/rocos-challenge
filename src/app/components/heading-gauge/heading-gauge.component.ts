import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-heading-gauge',
  templateUrl: './heading-gauge.component.html',
  styleUrls: ['./heading-gauge.component.css']
})
export class HeadingGaugeComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() angle = 0;
  ticksCount = 72;
  tickWidth = 2;
  tickHeight = 15;
  gaugeLabels = ['S', '21', '24', 'W', '30', '33', 'N', '3', '6', 'E', '12', '15'];
  gaugeRadius = 100;

  ctx: CanvasRenderingContext2D;

  @ViewChild('headingGauge', { static: true }) headingGauge: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
    this.ctx = this.headingGauge.nativeElement.getContext('2d');
    this.drawGauge(0);
  }

  ngOnChanges(): void {
    if (this.ctx) {
      this.drawGauge(this.angle);
    }
  }

  drawGauge(angle: number) {
    this.ctx.restore();
    // this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.resetTransform();
    this.ctx.clearRect(0, 0, 200, 200);
    const circle = new Path2D();
    circle.arc(100, 100, this.gaugeRadius, 0, 2 * Math.PI);
    this.ctx.fill(circle);
    let tickIndex = 0;
    this.ctx.save();
    for (let i = 0; i < Math.PI * 2; i += (Math.PI * 2 / this.ticksCount)) {
      tickIndex += 1;
      this.drawTick(i + angle, 100, 100, !(tickIndex % 2), 6, tickIndex);
    }
    this.drawPlane();
  }

  drawTick(
    angle: number,
    circleX: number,
    circleY: number,
    minorTick: boolean,
    tickIndex: number,
    tickInterval: number
  ) {
    this.ctx.setTransform(1, 0, 0, 1, circleX, circleY);
    // rotate the context so we face the correct angle
    this.ctx.rotate(angle);
    this.ctx.translate(0, this.gaugeRadius);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(
      -this.tickWidth / 2,
      minorTick ? -(this.tickHeight / 2) : -this.tickHeight,
      this.tickWidth,
      minorTick ? this.tickHeight / 2 : this.tickHeight
    );

    if (!((tickInterval - 1) % tickIndex) && ((tickInterval - 1) / tickIndex) < this.gaugeLabels.length) {
      this.ctx.fillText(this.gaugeLabels[((tickInterval - 1) / tickIndex)], -3, -25);
    }
  }

  drawPlane() {
    const image = new Image();
    image.src = 'assets/img/heading_mechanics.svg';
    image.onload = () => {
        this.ctx.setTransform(1, 0, 0, 1, 100, 100);
        this.ctx.drawImage(image, -90, -90, 180, 180);
    };
  }

}
