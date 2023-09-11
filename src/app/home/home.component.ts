import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StravaService } from '../strava.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RegisterComponent } from '../register/register.component';

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
    private stravaService: StravaService,
    private _bottomSheet: MatBottomSheet
  ) {
    const athleteId = parseInt(localStorage.getItem('athleteId') || '0');
    if (athleteId) {
      this.athleteId = athleteId;
    } else if (!this.route.snapshot.queryParams['code']) {
      this._bottomSheet.open(RegisterComponent);
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
