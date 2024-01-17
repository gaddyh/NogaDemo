import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, Address, Contact } from './customer.model'; // Update the path as needed

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrlCustomers = 'http://localhost:5299/api/v1/Customers/'; 
  private apiUrlAddress = 'https://localhost:7150/api/v1/Address/'; 
  private apiUrlContacts = 'https://localhost:7150/api/v1/Contact/'; 

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrlCustomers);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.apiUrlCustomers + id);
  }

  getAddresses(id: number): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiUrlAddress + 'ByCustomer/' + id);
  }

  getContacts(id: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrlContacts + 'ByCustomer/' + id);
  }

  updateContact(contact: Contact): Observable<Contact> {
    console.log("isDeleted: " + contact.isDeleted)
    if(contact.id == undefined){
      return this.http.post<Contact>(this.apiUrlContacts, contact);
    }
    return this.http.put<Contact>(this.apiUrlContacts + contact.id, contact);
  }

  updateAddress(address: Address): Observable<Address> {
    if(address.id == undefined){
      return this.http.post<Address>(this.apiUrlAddress, address);
    }

    return this.http.put<Address>(this.apiUrlAddress + address.id, address);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    if(customer.id == undefined)
      return this.http.post<Customer>(this.apiUrlCustomers, customer);

    return this.http.put<Customer>(this.apiUrlCustomers + customer.id, customer);
  }
}
