import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  redirectUrl = environment.url;
  constructor(private _bottomSheetRef: MatBottomSheetRef<RegisterComponent>) {}
  openLink(event: MouseEvent, connect: boolean): void {
    if (connect) {
      window.location.href = `https://www.strava.com/oauth/authorize?client_id=76203&redirect_uri=${this.redirectUrl}&response_type=code&scope=read_all,activity:read_all&state=connect`;
    }
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
