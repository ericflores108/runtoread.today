import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StravaService {
  api = environment.api;
  stats: any[] = [];

  constructor(private httpClient: HttpClient) {}

  loginWithCode(code: string): void {
    console.log(code);
    this.httpClient
      .post(`${this.api}/code`, { code: code })
      .subscribe((data: any) => {
        // set data to local storage
        localStorage.setItem('athleteId', data?.athlete?.id);
        console.log(data);
      });
  }

  getAllStats(): void {
    this.httpClient.get(`${this.api}/stats/all`).subscribe((data: any) => {
      console.log(data);
      this.stats = data?.stats;
    });
  }
}
