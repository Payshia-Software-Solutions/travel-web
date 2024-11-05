"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./hero.css";

const HomeBannerMain = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="home-banner-main relative ">
      <Slider {...settings}>
        <div className="">
          <img
            className="rounded-xl object-cover lg:h-custom w-full"
            src="/images/about-us2.jpg"
            alt="Slide 1"
          />
        </div>
        <div>
          <img
            className="rounded-xl object-cover lg:h-custom w-full"
            src="/images/home-banner.jpg"
            alt="Slide 2"
          />
        </div>
        <div>
          <img
            className="rounded-xl object-cover lg:h-custom w-full"
            src="/images/all-tours.jpg"
            alt="Slide 3"
          />
        </div>
      </Slider>

      <div className="flex image-overlay rounded-xl justify-center h-full items-center">
        <div className="text-center" style={{ top: "-2rem" }}>
          <h3 className="text-white sm:font-semibold md:font-bold sm:text-lg md:text-xl sm:mb-2 md:mb-5 lg:mb-5">
            Ready to Ride
          </h3>
          <h1 className="text-white font-extrabold sm:text-4xl md:text-5xl lg:text-6xl sm:mb-2 md:mb-5 lg:mb-6">
            Lorem ipsum dolar sit
          </h1>
          <p className="text-white text-lg font-thin sm:mb-2 md:mb-5 lg:mb-6">
            Limited time offer: Get a free helmet and safety stickers when you
            purchase our electric cargo bike.
          </p>
          <div className="banner-buttons flex justify-center">
            <button
              className="btn btn-primary rounded-0 mt-4 mr-2 lg:py-5 lg:px-5 md:py-2 md:px-3 sm:py-2 sm:px-2"
              id="banner-button"
            >
              Get Started
            </button>
            <button
              className="btn btn-outline-primary rounded-0 mt-4 btn-color lg:py-5 lg:px-5 md:py-2 md:px-3 sm:py-2 sm:px-2"
              id="btn-color"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBannerMain;
