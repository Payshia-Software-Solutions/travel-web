import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import ReviewTable from "../Tables/ReviewTable";

const Reviews = () => {
    return (
        <div>
            <Breadcrumb pageName="Reviews" pageDesc="Find out the status of your bookings"/>
            <ReviewTable />
        </div>
    );
}
export default Reviews;