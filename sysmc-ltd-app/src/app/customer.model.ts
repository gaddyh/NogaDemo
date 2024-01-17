export interface Customer {
    id: number | undefined;
    isDeleted: boolean;
    created: Date; // or string if the date comes as a string
    name: string | null;
    customerNumber: string | null;
}

export interface Address {
    id: number | undefined;
    customerId: number | undefined;
    isDeleted: boolean;
    created: Date; 
    city: string;
    street: string;
}

export interface Contact {
    id: number | undefined;
    customerId: number | undefined;
    isDeleted: boolean;
    created: Date; 
    fullName: string;
    officeNumber: string;
    email: string;
}
