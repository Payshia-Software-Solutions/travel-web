import Booking from "@/components/Booking/booking";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Ceylon Odyssey Bookings",
  description:
    "Admin bookings of Ceylon Odyssey",
};

const BookingPage = () => {
  return (
    <DefaultLayout>
      <Booking />
    </DefaultLayout>
  );
};

export default BookingPage;
