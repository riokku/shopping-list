import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


  bootstrapApplication(AppComponent, {
    providers: [
      BrowserAnimationsModule,
    ],
  }).catch(err => console.error(err));
