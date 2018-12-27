import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shares/service/api.service';
import { END_POINT } from 'src/app/shares/service/api.registry';
import { LoginService } from 'src/app/shares/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(private fb: FormBuilder,
              private apiService: ApiService,
              private router: Router,
              private loginService: LoginService) {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    const body = {
      username: this.formLogin.controls.username.value,
      password: this.formLogin.controls.password.value,
    };
    this.apiService.post([END_POINT.signin], body).subscribe(dataRes => {
      localStorage.setItem('token', dataRes.api_key);
      localStorage.setItem('username', dataRes.username);
      this.loginService.isUserLogin(true);
      this.router.navigate(['']);
    });
  }
}
