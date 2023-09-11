import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StravaService } from '../strava.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
})
export class GoalComponent {
  formData = {
    goal: null, // Initialize with a default goal value or set to null
    unit: 'km', // Initialize with a default unit value (e.g., 'km' or 'miles')
  };

  constructor(private stravaService: StravaService) {}

  onSubmit() {
    // Handle form submission here, e.g., send data to server
    const athleteId = parseInt(localStorage.getItem('athleteId') || '0');
    if (!athleteId) {
      console.error('No athleteId found in local storage');
      return;
    }
    if (!this.formData.goal) {
      console.error('No goal found in form data');
      return;
    }
    this.stravaService.setGoal({
      athleteId,
      goal: this.formData.goal,
      unit: this.formData.unit,
    });
  }
}
