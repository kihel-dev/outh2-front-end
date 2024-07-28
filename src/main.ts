import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importez RouterModule pour le routing
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';

// Bootstrap the application
bootstrapApplication(AppComponent, { // Changez ici pour AppComponent
  providers: [
    ...appConfig.providers,
    importProvidersFrom(RouterModule.forRoot(routes)), // Assurez-vous que le RouterModule est bien configuré
  ],
}).catch(err => console.error(err));
