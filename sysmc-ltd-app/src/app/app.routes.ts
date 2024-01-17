import { Routes } from '@angular/router';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerComponent } from './customer/customer.component';

export const routes: Routes = [
    { path: '', component: CustomerComponent, },
    { path: 'customer/:id', component: CustomerDetailsComponent }
];
