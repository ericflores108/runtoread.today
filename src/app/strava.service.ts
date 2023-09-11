import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StravaService {
  api = environment.api;
  stats: any[] = [];
  athleteIdSet = new EventEmitter<number>();

  constructor(private httpClient: HttpClient) {}

  loginWithCode(code: string): void {
    console.log(code);
    this.httpClient
      .post(`${this.api}/code`, { code: code })
      .subscribe((data: any) => {
        // set data to local storage
        localStorage.setItem('athleteId', data?.athlete?.id);
        console.log(data);
        this.athleteIdSet.emit(data?.athlete?.id);
      });
  }

  getAllStats(): void {
    this.httpClient.get(`${this.api}/stats/all`).subscribe((data: any) => {
      console.log(data);
      this.stats = data?.stats;
    });
  }

  setKudos({ athleteId, kudos }: { athleteId: number; kudos: number }): void {
    this.httpClient
      .post(`${this.api}/athlete/${athleteId}/kudos/${kudos}`, {})
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  setGoal({
    athleteId,
    goal,
    unit,
  }: {
    athleteId: number;
    goal: number;
    unit: string;
  }): void {
    this.httpClient
      .post(`${this.api}/athlete/${athleteId}/goal`, {
        goal,
        unit,
      })
      .subscribe((data: any) => {
        console.log(data);
        this.getAllStats();
      });
  }
}
