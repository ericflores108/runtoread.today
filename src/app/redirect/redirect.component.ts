import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],
})
export class RedirectComponent {
  redirectUrl = environment.url;
  connectToStrava() {
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=76203&redirect_uri=${this.redirectUrl}&response_type=code&scope=read_all,activity:read_all`;
  }
}
