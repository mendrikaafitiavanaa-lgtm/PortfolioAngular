import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { authInterceptor } from './api/auth.interceptor';
import { themeReducer } from './api/theme.service';
import { provideStore } from '@ngrx/store';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ theme: themeReducer }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(
      BrowserAnimationsModule,
      NgxSpinnerModule.forRoot({ type: 'ball-spin-clockwise' })
    ), provideCharts(withDefaultRegisterables())
  ]
};
