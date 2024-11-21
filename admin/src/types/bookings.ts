export type Booking = {
  id: number;
  _id?: string;
  tour: string;
  name: string;
  totDistance: number;
  days: number;
  status: string;

  // Additional fields
  email: string;
  mobile: string;
  livingCountry: string;
  nationality: string;
  destination: string;
  arrivalDate: string;
  departureDate: string;
  packageType: string; // Assuming this is a string (e.g., "silver")
  totalPrice: number;
};
