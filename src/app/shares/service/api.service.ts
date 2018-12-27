import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const API_ROOT = environment.api_url;
const API_IMGUR = environment.api_imgur;
const KEY = '45e0724f65b59b7';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(endpoint: string[], prams?): Observable<any> {
    const pram = this.query(endpoint, prams);
    return this.http.get<any>(pram);
  }

  post(endpoint: string[], body, param?): Observable<any> {
    const url = this.query(endpoint, param);
    return this.http.post(url, body);
  }

  postImg(body): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Client-ID 45e0724f65b59b7');
    return this.http.post(API_IMGUR, body, {headers});
  }

  delete(endpoint: string[], prams?: object): Observable<any> {
    const param = this.query(endpoint, prams);
    return this.http.delete<any>(param);
  }

  query(endpoint: string[], prams?: object): string {
    const url = [API_ROOT, endpoint.join('/'), prams].join('/');
    return url;
  }
}
