import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class GetCurrentInvService {

    constructor(private http: HttpClient) {}

    orgId = 1;

    private _url: string = `/inventory/getCurrent/${this.orgId}`;

    getCurentInventory() {
      return this.http.get(this._url);
    }
}

