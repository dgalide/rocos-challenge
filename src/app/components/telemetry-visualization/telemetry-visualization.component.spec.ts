import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemetryVisualizationComponent } from './telemetry-visualization.component';

describe('TelemetryVisualizationComponent', () => {
  let component: TelemetryVisualizationComponent;
  let fixture: ComponentFixture<TelemetryVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelemetryVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemetryVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
