import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [    provideHttpClient(withInterceptorsFromDi()), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor,multi: true}
  ]
};
