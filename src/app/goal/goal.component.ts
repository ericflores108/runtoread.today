import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
})
export class GoalComponent implements OnInit {
  goal: number = 0; // Initialize with a default goal value
  selectedUnit: string = 'km'; // Initialize with 'km'

  constructor() {}

  ngOnInit(): void {}
}
