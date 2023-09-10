import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StravaService {
  api = environment.api;

  constructor(private httpClient: HttpClient) {}

  loginWithCode(code: string): void {
    console.log(code);
    this.httpClient
      .post(this.api + 'code', { code: code })
      .subscribe((data: any) => {
        console.log(data);
      });
  }
}
