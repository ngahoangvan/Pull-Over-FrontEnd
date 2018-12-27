import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shares/service/api.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { END_POINT } from 'src/app/shares/service/api.registry';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private apiService: ApiService) { }

  ngOnInit() {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  register() {
    const body = {
      username: this.formRegister.controls.username.value,
      password: this.formRegister.controls.password.value,
      email: this.formRegister.controls.email.value,
    };

    this.apiService.post([END_POINT.signup], body).subscribe(dataRes => {
      if (dataRes) {
        this.router.navigate(['/login']);
      }
    });
  }
}
