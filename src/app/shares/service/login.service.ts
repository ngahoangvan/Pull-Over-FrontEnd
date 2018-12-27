import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  curranceIsLogin = localStorage.getItem('token') ? true : false;
  isLogin = new BehaviorSubject(this.curranceIsLogin);

  isUserLogin(isLogin: boolean) {
    this.isLogin.next(isLogin);
  }
}
