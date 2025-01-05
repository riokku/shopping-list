import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),  // Enables animations for Angular Material
    provideHttpClient(),  // Enables HTTP client
    provideRouter(routes) // Adds routing support
  ]
}).catch((err) => console.error(err));
