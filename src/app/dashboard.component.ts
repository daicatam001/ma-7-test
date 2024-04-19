import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: ` <h1>This is dashboard Token: {{ token }}</h1> `,
})
export class DashboardComponent implements OnInit {
  token: string = '';
  constructor() {}

  ngOnInit() {
    this.token = localStorage.getItem('authtoken') || '';
  }
}
