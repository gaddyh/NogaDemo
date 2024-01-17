// src/app/mock-customers.ts

export const CUSTOMERS = [
    { id: 1, IsDeleted: false, Created: new Date().toLocaleString(), name: 'John Doe', customerNumber: '012345678' },
    { id: 2, IsDeleted: false, Created: new Date().toLocaleString() , name: 'Jane Smith', customerNumber: '1234567890' },
  ];

  export const CONTACTS = [
    { id: 1, isDeleted: false, created: new Date().toLocaleString(), fullName: "Yeroslav Dojin", officeNumber: "123456", email: "john@example.com", customerId: 1 },
    { id: 2, isDeleted: false, created: new Date().toLocaleString(), fullName: "sharon sheri", officeNumber: "0323232132", email: "john@example.com", customerId: 1 },
    // ... other contacts
  ];
  
  export const ADDRESSES = [
    { id: 1, isDeleted: false, created: new Date().toLocaleString(), city: "City1", street: "Street1", customerId: 1 },
    { id: 2, isDeleted: false, created: new Date().toLocaleString(), city: "herzelia", street: "maskit", customerId: 1 },
    // ... other addresses
  ];