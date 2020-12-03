import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public form: FormGroup;
  public token$: Observable<string>;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      applicationId: ['9fd69830-2ec8-11eb-86ef-05af3548edff', [Validators.required]],
      secret: ['a565e2a5a96c0767311149db7c6fe6319c3310801514e7f8985114bc56b311e6', [Validators.required]]
    });
  }

  public getToken(): void {
    this.token$ = this.authService.getToken(this.form.value).pipe(
      map(res => res.token)
    );
  }

}
