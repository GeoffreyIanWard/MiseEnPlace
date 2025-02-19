import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetbotsizeService {

  constructor(private http: HttpClient) { }

  private _url: string = `/categories/bottlesizes`;

  getCategories(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this._url)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;
  }
}
