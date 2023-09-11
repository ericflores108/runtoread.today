import { Component, Input, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { StravaService } from '../strava.service';

interface Views {
  [key: string]: any;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  @Input() athleteId: number | null = null;
  private breakpointObserver = inject(BreakpointObserver);
  views: Views = {
    stats: true,
    goal: false,
    about: false,
  };

  constructor(private stravaService: StravaService) {
    this.stravaService.goalSet.subscribe(() => {
      this.changeView('stats');
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  changeView(view: string) {
    Object.keys(this.views).forEach((key) => {
      this.views[key] = false;
    });
    this.views[view] = true;
  }
}
