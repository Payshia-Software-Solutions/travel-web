import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import BookingTable from "../Tables/BookingTable";

const Booking = () => {
    return (
        <div>
            <Breadcrumb pageName="Bookings" pageDesc="Find out the status of your bookings" />
            <BookingTable/>
        </div>
    )
}
export default Booking;