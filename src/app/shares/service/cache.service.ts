import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  listClass: Array<any> = [];

  constructor() { }

  getListClass() {
    return this.listClass;
  }
}
