import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IRegister } from '../interface/register'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  constructor(private http: HttpClient) { }

  private _url: string = `/api/createUser`;

    regUser(data){
    return this.http.post(this._url, data);
  }

}
