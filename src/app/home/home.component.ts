import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StravaService } from '../strava.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  queryParams: {
    code?: string;
    scope?: string;
    state?: string;
  } = {};
  athleteId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private stravaService: StravaService
  ) {
    const athleteId = parseInt(localStorage.getItem('athleteId') || '0');
    if (athleteId) {
      this.athleteId = athleteId;
    }
  }

  ngOnInit(): void {
    this.queryParams = this.route.snapshot.queryParams;
    if (this.queryParams.code && !localStorage.getItem('athleteId')) {
      this.stravaService.loginWithCode(this.queryParams.code);
    }
    this.stravaService.athleteIdSet.subscribe((athleteId) => {
      if (athleteId) {
        this.athleteId = athleteId;
      }
    });
  }
}
