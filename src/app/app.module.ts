import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { RobotListComponent } from './components/robot-list/robot-list.component';
import { MatListModule } from '@angular/material/list';
import { HeadingGaugeComponent } from './components/heading-gauge/heading-gauge.component';
import { GaugesModule } from 'ng-canvas-gauges';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RobotListComponent,
    HeadingGaugeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    NgxJsonViewerModule,
    MatListModule,
    GaugesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
