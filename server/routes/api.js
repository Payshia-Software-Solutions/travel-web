const express = require("express");
const router = express.Router();
const PlaceController = require("../controllers/PlaceController");
const TourController = require("../controllers/TourController");
const TourCategoryController = require("../controllers/TourCategoryController");
const ReviewController = require("../controllers/ReviewController");
const UserController = require("../controllers/UserController");
const PaymentController = require("../controllers/PaymentController");
const bookingController = require("../controllers/BookingController");
const VehicleController = require("../controllers/VehicleController");
const BlogController = require("../controllers/BlogController");
const AgentController = require("../controllers/AgentController");
const GetQuoteController = require("../controllers/GetQuoteController");
const InclusionController = require("../controllers/inclusionController");

// Tour routes

// Tour routes
router.post("/tours", TourController.createTour);
router.get("/tours", TourController.getAllTours);
router.get("/tours/:slug", TourController.getTourBySlug);
router.put("/tours/:id", TourController.updateTourById);
router.delete("/tours/:id", TourController.deleteTour);

// Tour Category routes
router.post("/tourcategories", TourCategoryController.createTourCategory);
router.get("/tourcategories", TourCategoryController.getTourCategories);
router.get("/tourcategories/:id", TourCategoryController.getTourCategoryById);
router.put("/tourcategories/:id", TourCategoryController.updateTourCategory);
router.delete("/tourcategories/:id", TourCategoryController.deleteTourCategory);

// Place routes
router.post("/places", PlaceController.createPlace);
router.get("/places", PlaceController.getAllPlaces);
router.get("/places/:id", PlaceController.getPlaceById);
router.put("/places/:id", PlaceController.updatePlace);
router.delete("/places/:id", PlaceController.deletePlace);

// Review routes
router.post("/reviews", ReviewController.createReview);
router.get("/reviews", ReviewController.getReviews);
router.get("/reviews/:id", ReviewController.getReviewById);
router.put("/reviews/:id", ReviewController.updateReview);
router.delete("/reviews/:id", ReviewController.deleteReview);

// User routes
router.post("/users", UserController.createUser);
router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

// Booking routes
router.post("/bookings", bookingController.createBooking);

router.get("/bookings", bookingController.getAllBookings);

router.get("/bookings/:id", bookingController.getBookingById);

router.put("/bookings/:id", bookingController.updateBooking);

router.delete("/bookings/:id", bookingController.deleteBooking);

// Payment routes
router.post("/payments", PaymentController.createPayment);
router.get("/payments", PaymentController.getPayments);
router.get("/payments/:id", PaymentController.getPaymentById);
router.put("/payments/:id", PaymentController.updatePayment);
router.delete("/payments/:id", PaymentController.deletePayment);

// Vehicle the routes
router.post("/vehicles", VehicleController.createVehicle);
router.get("/vehicles", VehicleController.getVehicles);
router.get("/vehicles/:id", VehicleController.getVehicleById);
router.put("/vehicles/:id", VehicleController.updateVehicle);
router.delete("/vehicles/:id", VehicleController.deleteVehicle);

// Blog routes
router.post("/blogs", BlogController.createBlog);
router.get("/blogs", BlogController.getAllBlogs);
router.get("/blogs/:id", BlogController.getBlogById);
router.put("/blogs/:id", BlogController.updateBlog);
router.delete("/blogs/:id", BlogController.deleteBlog);

// Agent routes
router.post("/agents", AgentController.createAgent); // Create a new agent
router.get("/agents", AgentController.getAgents); // Get all agents
router.get("/agents/:id", AgentController.getAgentById); // Get a single agent by ID
router.put("/agents/:id", AgentController.updateAgent); // Update an existing agent
router.delete("/agents/:id", AgentController.deleteAgent); // Delete an agent

// Quote routes
router.post("/quotes", GetQuoteController.createQuote);
router.get("/quotes", GetQuoteController.getQuotes);
router.get("/quotes/:id", GetQuoteController.getQuoteById);
router.put("/quotes/:id", GetQuoteController.updateQuote);
router.delete("/quotes/:id", GetQuoteController.deleteQuote);
router.post("/inclusion", InclusionController.createInclusion);
 

//inclusion routes
router.post("/inclusion",InclusionController.createInclusion);
router.get("/inclusion", InclusionController.getInclusions);
router.get("/inclusion/:id", InclusionController.getInclusionById);
router.put("/inclusion/:id", InclusionController.updateInclusion);
router.delete("/inclusion/:id", InclusionController.deleteInclusion);
router.get("/inclusion/tour/:tourId", InclusionController.getInclusionsByTourId);

module.exports = router;
