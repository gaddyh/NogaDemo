import { Component, OnInit } from '@angular/core';
import { CUSTOMERS } from '../mock-customers'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CustomerService } from '../customer.service'; // Update the path as needed
import { Customer } from '../customer.model'; // Update the path as needed
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, RouterModule,MatTableModule,MatIconModule ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  displayedColumns: string[] = ['id', 'name','customerNumber'];

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.fetchCustomers();
  }
  
  fetchCustomers() {
    this.customerService.getCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
      },
      (error: any) => {
        console.error('There was an error!', error);
      }
    );
  }


  editCustomer(customer: any) {
    // Handle edit logic
  }

  addCustomer(){
    
  }

  public navigateToCustomer(customerId: number): void {
    console.log("asdsadada");
    this.router.navigate(['/customer', customerId]);
  }
}
