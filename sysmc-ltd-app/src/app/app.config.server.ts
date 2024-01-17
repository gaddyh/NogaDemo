import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { CustomerService } from './customer.service'; // Update the path as needed

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),CustomerService
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
