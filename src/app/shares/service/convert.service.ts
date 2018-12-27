import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  constructor() { }

  convertToApiUser(data: any): any {
    const user = {
      username: data.username,
      password: data.password
    };
    return user;
  }
}
