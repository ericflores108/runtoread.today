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
    'kudos',
  ];
  constructor(public stravaService: StravaService) {}

  async ngOnInit() {
    this.stravaService.getAllStats();
  }

  incrementKudos(element: any) {
    element.user.kudos = (element.user.kudos || 0) + 1;
    this.stravaService.setKudos({
      athleteId: element.user.athlete.id,
      kudos: element.user.kudos,
    });
  }

  userLink(athleteId: number) {
    return `https://www.strava.com/athletes/${athleteId}`;
  }
}
