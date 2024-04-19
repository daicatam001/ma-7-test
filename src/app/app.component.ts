import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnboardingComponent } from './onboarding.component';

@Component({
  standalone: true,
  imports: [RouterModule, OnboardingComponent],
  selector: 'app-root',
  template: `
    <div class="admin">
      <header class="admin__header">
        <h1>Merchant Area 7</h1>
      </header>
      <nav class="admin__nav">
        <ul>
          <li>
            <a [routerLink]="['dashboard']">Dashboard</a>
          </li>
          <li>
            <a [routerLink]="['onboarding']">Onboarding</a>
          </li>
          <li>
            <a [routerLink]="['other-module']">Other Module</a>
          </li>
        </ul>
      </nav>
      <main class="admin__main">
        <!-- <app-onboarding></app-onboarding> -->
        this is auth token : {{authtoken}}
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .admin {
        --spacing: 1rem;

        display: grid;
        height: 100vh;

        grid-template-rows: 70px 1fr;
        grid-template-columns: 250px 1fr;
        grid-template-areas:
          'header header'
          'nav    main';
      }
      .admin__header {
        grid-area: header;
        height: $admin-header-height;
        background-color: #fff;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        position: relative;
      }

      .admin__header h1 {
        margin-top: 10px;
        margin-bottom: 0;
        padding-left: 20px;
      }

      .admin__nav {
        flex: 0 0 $admin-nav-width;
        grid-area: nav;
        background-color: #313541;
      }
      .admin__nav ul {
        list-style: none;
        margin: 0;
        padding-left: 20px;
      }
      .admin__nav li {
        margin: 10px 0;
      }
      .admin__nav li a {
        color: white;
      }

      .admin__main {
        flex: 1;
        grid-area: main;
        padding: var(--spacing);
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;

        background-color: #f4f7fa;
      }
    `,
  ],
})
export class AppComponent {
  title = 'angular-project';

 authtoken = localStorage.getItem('authtoken')
}
