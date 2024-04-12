import { Route } from '@angular/router';
import { OnboardingComponent } from './onboarding.component';
import { OtherMaModuleComponent } from './otherMaModule.component';
import { DashboardComponent } from './dashboard.component';

export const appRoutes: Route[] = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'onboarding',
    component: OnboardingComponent,
  },
  { path: 'other-module', component: OtherMaModuleComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
