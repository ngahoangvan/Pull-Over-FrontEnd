import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { ApiService } from '../../service/api.service';
import { END_POINT } from '../../service/api.registry';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;

  constructor(private loginService: LoginService,
              private router: Router,
              private apiService: ApiService) { }

  ngOnInit() {
    this.loginService.isLogin.subscribe(value => this.isLogin = value);
  }

  logout() {
    this.apiService.get([END_POINT.signout]).subscribe(value => {
      if (value) {
        this.loginService.isUserLogin(false);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.router.navigate(['']);
      }
    });
  }
}
