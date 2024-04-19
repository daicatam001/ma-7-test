import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

localStorage.setItem('authtoken','this is auth token')

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
