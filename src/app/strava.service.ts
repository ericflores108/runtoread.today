import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StravaService {
  api = environment.api;
  stats: any[] = [];
  athleteIdSet = new EventEmitter<number>();
  goalSet = new EventEmitter<void>();

  constructor(private httpClient: HttpClient) {}

  loginWithCode(code: string): void {
    this.httpClient
      .post(`${this.api}/code`, { code: code })
      .subscribe((data: any) => {
        // set data to local storage
        localStorage.setItem('athleteId', data?.athlete?.id);
        this.getAllStats();
        this.athleteIdSet.emit(data?.athlete?.id);
      });
  }

  getAllStats(): void {
    this.httpClient.get(`${this.api}/stats/all`).subscribe((data: any) => {
      catchError((err) => {
        console.error(err);
        return err;
      });
      this.stats = data?.stats;
    });
  }

  setKudos({ athleteId, kudos }: { athleteId: number; kudos: number }): void {
    this.httpClient
      .post(`${this.api}/athlete/${athleteId}/kudos/${kudos}`, {})
      .subscribe(() => {
        catchError((err) => {
          console.error(err);
          return err;
        });
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
      .subscribe(() => {
        catchError((err) => {
          console.error(err);
          return err;
        });
        this.getAllStats();
        this.goalSet.emit();
      });
  }
}
