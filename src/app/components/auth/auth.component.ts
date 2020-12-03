import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { ITokenResponse } from 'src/app/models/ITokenReponse';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public response$: Observable<ITokenResponse>;
  public token$: Observable<string>;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      applicationId: ['9fd69830-2ec8-11eb-86ef-05af3548edff', [Validators.required]],
      secret: ['a565e2a5a96c0767311149db7c6fe6319c3310801514e7f8985114bc56b311e6', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
  }

  public getToken(): void {
    this.response$ = this.authService.getToken(this.form.value).pipe(share());

    this.token$ = this.response$.pipe(
      map(res => res.token)
    );
  }

}
