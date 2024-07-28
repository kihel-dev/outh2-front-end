import { provideHttpClient, withFetch } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

// Configuration des providers uniquement
export const appConfig = {
  providers: [
    provideHttpClient(withFetch()), // Configure HttpClient pour utiliser fetch
  ],
};
