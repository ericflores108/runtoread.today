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
  constructor(
    private route: ActivatedRoute,
    private stravaService: StravaService
  ) {}

  ngOnInit(): void {
    this.queryParams = this.route.snapshot.queryParams;
    if (this.queryParams.code) {
      console.log(this.queryParams.code);
      this.stravaService.loginWithCode(this.queryParams.code);
    }
  }
}
