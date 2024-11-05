const express = require("express");
const router = express.Router();
const PlaceController = require("../controllers/PlaceController");
const TourController = require("../controllers/TourController");
const TourCategoryController = require("../controllers/TourCategoryController");
const ReviewController = require("../controllers/ReviewController");
const UserController = require("../controllers/UserController");
const PaymentController = require("../controllers/PaymentController");
const BookingController = require("../controllers/BookingController");
const VehicleController = require("../controllers/VehicleController");
const BlogController = require("../controllers/BlogController");
const AgentController = require("../controllers/AgentController");

// Tour routes
router.post("/tours", TourController.createTour);
router.get("/tours", TourController.getTours);
router.get("/tours/:id", TourController.getTourById);
router.put("/tours/:id", TourController.updateTour);
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
router.post("/bookings", BookingController.createBooking);
router.get("/bookings", BookingController.getBookings);
router.get("/bookings/:id", BookingController.getBookingById);
router.put("/bookings/:id", BookingController.updateBooking);
router.delete("/bookings/:id", BookingController.deleteBooking);

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

module.exports = router;
