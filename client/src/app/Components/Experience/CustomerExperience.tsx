"use client";
import React from "react";
import SectionTitle from "../section-title/section-title";
import Comma from "./Comma";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function CustomerExperience() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const data = [
    {
      id: 1,
      title: "Experience 1",
      img: "/images/feedback-user.png",
      description:
        "We have been partners for many years, and the decision has proven to be very wise. They are not just business consultants, but true partners who care about the success of our business.",
      name: "Raisa Angela",
    },
    {
      id: 2,
      title: "Experience 2",
      img: "/images/feedback-user.png",
      description:
        "We have been partners for many years, and the decision has proven to be very wise. They are not just business consultants, but true partners who care about the success of our business.",
      name: "Raisa Angela",
    },
    {
      id: 3,
      title: "Experience 2",
      img: "/images/feedback-user.png",
      description:
        "We have been partners for many years, and the decision has proven to be very wise. They are not just business consultants, but true partners who care about the success of our business.",
      name: "Raisa Angela",
    },
    {
      id: 4,
      title: "Experience 2",
      img: "/images/feedback-user.png",
      description:
        "We have been partners for many years, and the decision has proven to be very wise. They are not just business consultants, but true partners who care about the success of our business.",
      name: "Thlina Angela",
    },
  ];
  return (
    <div className="container-fluid my-[70px]">
      <div className="exp-header mt-4">
        <SectionTitle title="experience" />
        <h1 className="lg:text-2xl sm:text-xl text-xl font-bold mb-4">
          Customer Experience
        </h1>
      </div>
      <Slider {...settings} className="h-[450px]">
        {data.map((card, index) => (
          <div key={index} className="p-4">
            <div className="shadow-md rounded-lg h-full">
              <div className="feedback-content p-4 h-full flex flex-col justify-between">
                <div className="flex gap-1 mb-4">
                  <Comma />
                  <Comma />
                </div>
                <p className="feedback-text italic opacity mb-4">
                  {card.description}
                </p>
                <div className="feedback-user flex items-center">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={card.img}
                    alt="user"
                  />
                  <div className="user-text ml-4">
                    <h5 className="feedback-user-name font-bold">
                      {card.name}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustomerExperience;
