import { Component, OnInit } from '@angular/core';
import { StravaService } from '../strava.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  currentUnit = 'km';
  displayedColumns: string[] = [
    'name',
    'run_total_kilometers',
    'ytd_run_total_kilometers',
    'goal',
  ];
  constructor(public stravaService: StravaService) {}

  async ngOnInit() {
    this.stravaService.getAllStats();
  }
}
