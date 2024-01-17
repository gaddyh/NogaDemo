import { Component, OnInit } from '@angular/core';
import { CUSTOMERS, CONTACTS, ADDRESSES } from '../mock-customers'; 
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../customer.service'; 
import { Address, Contact, Customer } from '../customer.model'; 
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule,ReactiveFormsModule ],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent implements OnInit {
  
  customerEdit: boolean = false; 
  nameControl = new FormControl('', Validators.required);
  customerNumberControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d{9}$/)  // Regular expression for exactly 9 digits
  ]);
  
  customer: Customer ={
    id: undefined,
    isDeleted: false,
    created: new Date,
    name: '',
    customerNumber: ''
  };
  contacts: Contact[] = [];
  addresses: Address[]=[];

    contactEdit: boolean[] = [];
    addressEdit: boolean[] = [];

  constructor(private route: ActivatedRoute, 
              private customerService: CustomerService) {
   }

  async ngOnInit(): Promise<void> {
   
    this.nameControl.valueChanges.subscribe(newValue => {
      console.log('Name changed to:', newValue);
      this.updateName(newValue);
    });

    this.customerNumberControl.valueChanges.subscribe(newValue => {
      this.updateCustomerNumber(newValue);
    });

    this.contactEdit = new Array(10).fill(false);
    this.addressEdit = new Array(10).fill(false);


    const customerId = Number(this.route.snapshot.paramMap.get('id')) ?? 1;
    
    this.customerService.getCustomer(customerId).subscribe((cus) => {
      if(cus.id == undefined)
      {
        this.customer = {
          id: undefined,
          isDeleted: false,
          created: new Date(),
          customerNumber: "",
          name:null

        }
        this.customerEdit = true

      }
      else{
      this.customerEdit = false;
      this.customer = cus;
      this.customerNumberControl.setValue(cus.customerNumber);
      this.nameControl.setValue(cus.name);
      }
    },
    error => {
      this.customer = {
        id: undefined,
        isDeleted: false,
        created: new Date(),
        customerNumber: "",
        name:null

      }
      this.customerEdit = true
    });;

    this.customerService.getAddresses(customerId).subscribe((adds) => {
      this.addresses = adds;
    });;

   this.customerService.getContacts(customerId).subscribe((conts) => {
    this.contacts = conts;
 });;
    
  }

  updateName(value: string | null) {
    this.customer.name = value
    console.log("updateName: ", value)
  }

  updateCustomerNumber(value: string | null) {
    this.customer.customerNumber = value
    console.log("updateCustomerNumber: ", value)
  }

  updateCustomer(): void {
    if (this.nameControl.invalid) {
      alert("invalid name");
      return
    }
    if (this.customerNumberControl.invalid) {
      alert("invalid customer number");
      return
    }

   
    console.log("updateCustomer:", this.customer.name)
    if(this.customer.name == null)
    {
      alert("name missing")
      return
    }
    if(this.customer.customerNumber == null)
    {
      alert("customer missing")
      return
    }
    this.customerService.updateCustomer(this.customer).subscribe((cust ) => {
      this.customerEdit = false;
      console.log(cust.id)
      if(cust.id == undefined)
      {
        alert("customer exists")
      }
      this.customer.id = cust.id
   },
   error => { 
    console.log('customer exists', error);
    alert("customer exists")
   })
  }

updateContact(contact: any,i:number): void {
  this.customerService.updateContact(contact).subscribe((cont) => {
    this.contactEdit[i] = false;
    this.contacts[i].id = cont.id;
 },
 error=>{alert("Full name is mandatory")});
}

updateAddress(address: any,i:number): void {
  this.customerService.updateAddress(address).subscribe((add) => {
    this.addressEdit[i] = false;
    this.addresses[i].id = add.id;
 },
 error=>{alert("city, address are mandatory")});
}

addContact(){
  const contact: Contact = {
    id: undefined,
    customerId: this.customer.id,
    isDeleted: false,
    created: new Date(),
    fullName: '',
    officeNumber: '',
    email: ''
  };

  this.contactEdit[this.contacts.length] = true;
  this.contacts[this.contacts.length] = contact;
}

addAddress(){
  const address: Address = {
    id: undefined,
    customerId: this.customer.id,
    isDeleted: false,
    created: new Date(),
    city: '',
    street: ''
  };

  this.addressEdit[this.addresses.length] = true;
  this.addresses[this.addresses.length] = address;
}
}