import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),   // makes sure initial navigation works properly
      withInMemoryScrolling({
        anchorScrolling: 'enabled',            // ✅ allows scrolling to #id fragments
        scrollPositionRestoration: 'enabled'   // restores scroll when navigating back/forward
      })
    ),
    provideHttpClient(),
  ]
};
