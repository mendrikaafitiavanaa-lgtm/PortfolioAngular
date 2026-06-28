import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { themeReducer } from './api/theme.service';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ theme: themeReducer }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    importProvidersFrom(
      BrowserAnimationsModule,
      NgxSpinnerModule.forRoot({ type: 'ball-spin-clockwise' })
    )
  ]
};