import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class UpdateOpenBottlesService {

    constructor(private http: HttpClient) {}

    orgId = 1;

    private _url: string = `/openBottles/newWeights/${this.orgId}`;

    updateOpenBottles(bottles) {
        const promise = new Promise((resolve, reject) => {
            this.http.put(this._url, bottles)
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
