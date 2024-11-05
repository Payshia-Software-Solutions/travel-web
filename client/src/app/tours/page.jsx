"use client";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import { Offcanvas } from "react-bootstrap";
import config from "../../config";
// icons
import { BiFilterAlt } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import {
  FaMapMarkedAlt,
  FaCalendarMinus,
  FaArrowRight,
  FaRegHeart,
} from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
// styles
import "./all-tours.css";

const AllTours = () => {
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [placeFilter, setPlaceFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 9;

  const [tours, setTours] = useState([]);
  const [tourCategories, setTourCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true); // Step 2: Set loading to true before fetching

        const res = await fetch(`${config.API_BASE_URL}/api/tours`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setTours(data);
      } catch (error) {
        setError("Failed to fetch tours");
        console.error("Failed to fetch tours:", error);
      } finally {
        setLoading(false); // Step 3: Set loading to false after fetch is done
      }
    };

    fetchTours();
  }, []);



  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/api/tourcategories`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setTourCategories(data);
      } catch (error) {
        setError("Failed to fetch tour categories");
        console.error("Failed to fetch tour categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePriceFilterChange = (value) => {
    setPriceFilter(value);
  };

  const handleCategoryFilterChange = (category) => {
    setCategoryFilter(category);
  };

  const handlePlaceFilterChange = (place) => {
    setPlaceFilter(place);
  };

  // Filtered tours based on filters
  const filteredTours = tours.filter((tour) => {
    if (priceFilter && tour.tourPrice > parseInt(priceFilter)) return false;
    if (categoryFilter && tour.tourCategory !== categoryFilter) return false;
    if (placeFilter && !tour.places.includes(placeFilter)) return false;
    return true;
  });

  // Logic for pagination
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="main">
      {/* ================= Main Banner ==================*/}
      <div className="home-banner-main">
        {/* <Image className="rounded lg:h-custom object-cover" src={HomeBanner} /> */}
        <img
          className="rounded lg:h-custom object-cover banner-img"
          src="/images/all-tours.jpg"
          alt="home banner"
        />
        <div className="image-overlay rounded flex justify-center items-center">
          <div className="text-center" style={{ top: "-2rem" }}>
            <h3 className="text-white sm:font-semibold md:font-bold sm:text-lg md:text-xl sm:mb-2 md:mb-5 lg:mb-5">
              Ready to Collect
            </h3>
            <h1 className="text-white font-extrabold sm:text-4xl md:text-5xl lg:text-6xl sm:mb-2 md:mb-5 lg:mb-6">
              Exclusive Experiences
            </h1>
            <p className="text-white text-sm font-thin sm:mb-2 md:mb-5 lg:mb-6">
              Limited time offer: Get a free helmet and safety stickers when you
              purchase our electric cargo bike.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4">
        {/* ================ Filter Controls for Large Screens ================ */}
        <div className="pe-5">
          <div className="hidden lg:block">
            <div className="filter-title flex justify-between select-none">
              <h5>Price</h5>
              <BiFilterAlt className="filter-icon" />
            </div>

            <Form>
              {/* Price Filter */}
              <Form.Group>
                <Form.Label></Form.Label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="100"
                  value={priceFilter}
                  onChange={(e) => handlePriceFilterChange(e.target.value)}
                />
                <p className="select-none">
                  {priceFilter ? `$${priceFilter}` : "All"}
                </p>
              </Form.Group>
              {/* Category Filter */}
              <Form.Group>
                <Form.Label className="filter-title mt-3 mt-4 select-none">
                  Tour Category
                </Form.Label>
                <ul className="select-none">
                  <li
                    className="cursor-pointer filter-options"
                    onClick={() => handleCategoryFilterChange("")}
                  >
                    <p>All</p>
                    <MdKeyboardArrowRight className="filter-option-icon" />
                  </li>

                  {tourCategories.map((tourCategory) => (
                    <li
                      className="cursor-pointer filter-options"
                      onClick={() =>
                        handleCategoryFilterChange(tourCategory._id)
                      }
                    >
                      <p>{tourCategory.categoryName}</p>
                      <MdKeyboardArrowRight className="filter-option-icon" />
                    </li>
                  ))}
                </ul>
              </Form.Group>
              {/* Place Filter */}
              <Form.Group>
                <Form.Label className="filter-title mt-4 select-none">
                  Arrange Places
                </Form.Label>
                <ul className="select-none">
                  <li
                    className="cursor-pointer filter-options"
                    onClick={() => handlePlaceFilterChange("")}
                  >
                    <p>All</p>
                    <MdKeyboardArrowRight className="filter-option-icon" />
                  </li>
                  <li
                    className="cursor-pointer filter-options"
                    onClick={() => handlePlaceFilterChange("Kandy")}
                  >
                    <p>Kandy</p>
                    <MdKeyboardArrowRight className="filter-option-icon" />
                  </li>
                  <li
                    className="cursor-pointer filter-options"
                    onClick={() => handlePlaceFilterChange("Habarana")}
                  >
                    <p>Habarana</p>
                    <MdKeyboardArrowRight className="filter-option-icon" />
                  </li>
                  <li
                    className="cursor-pointer filter-options"
                    onClick={() => handlePlaceFilterChange("Elle")}
                  >
                    <p>Elle</p>
                    <MdKeyboardArrowRight className="filter-option-icon" />
                  </li>
                  {/* Add other place options */}
                </ul>
              </Form.Group>
            </Form>
          </div>
        </div>

        {/* ================ Filter Controls for Small Screens ================ */}
        <div className="lg:hidden">
          <div className="flex mb-4">
            <h3 className="font-semibold text-xl">Filter Category</h3>
            <BiFilterAlt
              onClick={handleShow}
              className="text-3xl ml-3 cursor-pointer text-[#06377B]"
            />
          </div>
          <Offcanvas
            show={show}
            onHide={handleClose}
            placement="end"
            style={{ maxWidth: "80%" }} // Adjust the width as needed
          >
            <Offcanvas.Header closeButton style={{ color: "#000" }}>
              <Offcanvas.Title>Filter</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="col-lg-3 filter-section">
                <div className="filter-title flex justify-between select-none">
                  <h5>Price</h5>
                  <BiFilterAlt className="filter-icon" />
                </div>

                <Form>
                  {/* Price Filter */}
                  <Form.Group>
                    <Form.Label></Form.Label>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="100"
                      value={priceFilter}
                      onChange={(e) => handlePriceFilterChange(e.target.value)}
                    />
                    <p className="select-none">
                      {priceFilter ? `$${priceFilter}` : "All"}
                    </p>
                  </Form.Group>
                  {/* Category Filter */}
                  <Form.Group>
                    <Form.Label className="filter-title mt-3 mt-4 select-none">
                      Tour Category
                    </Form.Label>
                    <ul className="select-none">
                      <li
                        className="cursor-pointer filter-options"
                        onClick={() => handleCategoryFilterChange("")}
                      >
                        <p>All</p>
                        <MdKeyboardArrowRight className="filter-option-icon" />
                      </li>
                      {tourCategories.map((tourCategory) => (
                        <li
                          className="cursor-pointer filter-options"
                          onClick={() =>
                            handleCategoryFilterChange(tourCategory._id)
                          }
                        >
                          <p>{tourCategory.categoryName}</p>
                          <MdKeyboardArrowRight className="filter-option-icon" />
                        </li>
                      ))}
                    </ul>
                  </Form.Group>
                  {/* Place Filter */}
                  <Form.Group>
                    <Form.Label className="filter-title mt-4 select-none">
                      Arrange Places
                    </Form.Label>
                    <ul className="select-none">
                      <li
                        className="cursor-pointer filter-options"
                        onClick={() => handlePlaceFilterChange("")}
                      >
                        <p>All</p>
                        <MdKeyboardArrowRight className="filter-option-icon" />
                      </li>
                      <li
                        className="cursor-pointer filter-options"
                        onClick={() => handlePlaceFilterChange("Kandy")}
                      >
                        <p>Kandy</p>
                        <MdKeyboardArrowRight className="filter-option-icon" />
                      </li>
                      <li
                        className="cursor-pointer filter-options"
                        onClick={() => handlePlaceFilterChange("Habarana")}
                      >
                        <p>Habarana</p>
                        <MdKeyboardArrowRight className="filter-option-icon" />
                      </li>
                      <li
                        className="cursor-pointer filter-options"
                        onClick={() => handlePlaceFilterChange("Elle")}
                      >
                        <p>Elle</p>
                        <MdKeyboardArrowRight className="filter-option-icon" />
                      </li>
                      {/* Add other place options */}
                    </ul>
                  </Form.Group>
                </Form>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-8 col-span-3">
          {loading ? (
              <div className="col-span-3 text-center">
                <div>Tours are Loading... Please wait</div>
              </div>
          ) : error ? (
              <div className="col-span-3 text-center text-red-500">
                {error}
              </div>
          ) : (
              tours.map((tour) => (
                  <div key={tour._id} className="">
                    <div className="tour-card">
                      <div className="relative">
                        <div className="h-[250px] rounded-xl">
                          <img
                              src={`${config.API_BASE_URL}/public/uploads/tours/${tour.tourCover}`}
                              alt={tour.tourName}
                              className="object-cover w-full h-full rounded-t-xl"
                          />
                        </div>

                        <div className="blue-div flex justify-center items-center">
                          <div className="package-info flex items-center">
                            <div className="flex items-center">
                              <FaCalendarMinus className="bluediv-icons"/>
                              <p className="bluediv-text ml-1 text-nowrap">
                                {tour.noOfDays}D
                              </p>
                            </div>
                            <div className="vl"></div>
                            <div className="flex items-center">
                              <FaMapMarkedAlt className="bluediv-icons"/>
                              <p className="bluediv-text ml-1">{tour.basePlace}</p>
                            </div>

                            <div className="vl"></div>
                            <div className="flex items-center">
                              <HiUsers className="bluediv-icons"/>
                              <p className="bluediv-text ml-1 text-nowrap">
                                {tour.participants}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="tour-card-content shadow-sm">
                        <a href={`/tours/${tour._id}`}>
                          <h5 className="text-xl font-bold mt-3 pl-3">
                            {tour.tourName}
                          </h5>
                        </a>
                        <div className="text-xl pl-3 font-bold text-end">
                          ${tour.tourPrice}
                        </div>

                        <p className="text-justify mt-2 pl-3 pr-3">
                          {tour.tourDetails}
                        </p>
                        <div className="rtr-bottom-div flex justify-around rounded pt-1 pb-1 mt-3">
                          <a href={`/tours/${tour._id}`}>
                            <button className="btn rtr-book-now flex py-2 px-4">
                              Open{" "}
                              <FaArrowRight className="bottom-button-icon ml-2 mt-1 "/>
                            </button>
                          </a>
                          <div className="rtr-vl"></div>
                          <button className="btn rtr-wish-list flex py-2 px-4">
                            Wish List{" "}
                            <FaRegHeart className="bottom-button-icon ml-2 mt-1"/>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
              ))
          )}
        </div>
        {/* ================ Tour Cards ================ */}
        <div className="col-span-4 w-full d-flex justify-end">
          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              {Array.from(
                  {length: Math.ceil(filteredTours.length / toursPerPage)},
                  (_, i) => (
                      <Pagination.Item
                          key={i + 1}
                          active={i + 1 === currentPage}
                          onClick={() => paginate(i + 1)}
                      >
                        {i + 1}
                      </Pagination.Item>
                  )
              )}
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTours;
