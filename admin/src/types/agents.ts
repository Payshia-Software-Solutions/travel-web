export interface Agent {
  _id: string; // Optional, because MongoDB automatically generates an ID for each document
  no: number;
  name: string;
  country: string;
  address: string;
  contactNo: string;
  email: string;
  phone: string;
  secondaryPhone?: string; // Optional field
  createdBy?: string; // Assuming this is a user ID or similar identifier
  updatedBy?: string; // Assuming this is a user ID or similar identifier
  createdAt?: Date; // Optional, if you are storing creation date
  updatedAt?: Date; // Optional, if you are storing last update date
}
