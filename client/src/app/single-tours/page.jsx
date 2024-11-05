import React from "react";
import "./single-tours.css";
import { HiUsers } from "react-icons/hi";
import {
  FaArrowRight,
  FaHeart,
  FaStar,
  FaMapMarkedAlt,
  FaCalendarMinus,
  FaRegHeart,
} from "react-icons/fa";
import SectionTitle from "../Components/section-title/section-title";

const SingleTour = () => {
  const ScheduleData = [
    {
      id: 1,
      day: "1st Day",
      title: "Pick up Katunayaka Bandaranayaka International Airport",
      description:
        "Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos...",
    },
    {
      id: 2,
      day: "2nd Day",
      title: "Pick up Katunayaka Bandaranayaka International Airport",
      description:
        "Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos...",
    },
    {
      id: 3,
      day: "3rd Day",
      title: "Pick up Katunayaka Bandaranayaka International Airport",
      description:
        "Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos...",
    },
    {
      id: 4,
      day: "4th Day",
      title: "Pick up Katunayaka Bandaranayaka International Airport",
      description:
        "Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos...",
    },
  ];

  const relatedTours = [
    {
      id: 1,
      title: "Card 1",
      description:
        "Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos...",
      sdate: "7",
      edate: "6",
      location: "KANDY",
      users: "1 - 10",
    },
    {
      id: 2,
      title: "Card 2",
      description:
        "Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos...",
      sdate: "7",
      edate: "6",
      location: "Colombo",
      users: "1 - 10",
    },
    {
      id: 3,
      title: "Card 3",
      description:
        "Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos...",
      sdate: "7",
      edate: "6",
      location: "KANDY",
      users: "1 - 10",
    },
    {
      id: 4,
      title: "Card 4",
      description:
        "Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos...",
      sdate: "7",
      edate: "6",
      location: "KANDY",
      users: "1 - 10",
    },
  ];
  return (
    <div>
      <div className="home-banner-main relative z-10">
        {/* <Image className="rounded lg:h-custom object-cover" src={HomeBanner} /> */}
        <img
          className="rounded lg:h-custom object-cover banner-img"
          src="/images/all-tours.jpg"
          alt="home banner"
        />
        <div className="image-overlay rounded-xl flex justify-center items-end z-20 p-2">
          <h1 className="lg:hidden text-2xl font-bold my-4  text-white">
            Experience the natural beauty of island
          </h1>
        </div>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 mt-[50px] lg:-mt-[150px] z-50 gap-8">
        <div className="lg:px-10">
          <img className="w-full" src="/images/about-us.jpg" />

          <div className="grid grid-cols-3 gap-3 mt-3">
            <div className="relative h-16 lg:h-48">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src="/images/about-us2.jpg"
                alt="Image 1"
              />
            </div>
            <div className="relative h-16 lg:h-48">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src="/images/about-us2.jpg"
                alt="Image 2"
              />
            </div>
            <div className="relative h-16 lg:h-48">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src="/images/about-us.jpg"
                alt="Image 3"
              />
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="hidden lg:block lg:text-4xl font-bold my-12 w-50 lg:text-white">
            Experience the natural beauty of island
          </h1>
          <h2 className="text-2xl font-bold my-4">Tour Details</h2>
          <div className="flex gap-4 flex-col">
            <div className="text-justify text-stone-500 text-xl font-normal leading-normal">
              Develop a website by finding a product identity that has value and
              branding to become a characteristic of a company. We will also
              facilitate the business marketing of these products with our SEO
              experts so that they become a ready-to-use website and help sell a
              product from the company.
            </div>
            <div className="text-justify text-stone-500 text-xl font-normal leading-normal">
              Develop a website by finding a product identity that has value and
              branding to become a characteristic of a company. We will also
              facilitate the business marketing of these products with our SEO
              experts so that they become a ready-to-use website and help sell a
              product from the company.
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex gap-2 text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar className="text-gray-300" />
                <FaStar className="text-gray-300" />
              </div>
              <div className="text-blue-500">(20 Reviews)</div>
            </div>

            <div className="flex justify-between">
              <h3 className="text-xl font-bold">Participants</h3>
              <div>
                <input
                  type="number"
                  className="rounded-lg text-end font-bold outline-none text-xl px-2 w-full"
                  value={4}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <h3 className="text-xl font-bold">Sub Total</h3>
              <h3 className="text-xl font-bold">$15000.00</h3>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-blue-950 text-white rounded-0 p-3 hover:bg-blue-800 hover:text-black transition-all">
                Get Started <FaArrowRight />
              </button>
              <button className="flex items-center gap-2 border-2 border-blue-950 rounded-0 p-3 hover:bg-gray-200">
                Learn More <FaHeart />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*==middle part==*/}

      <div className="grid grid-cols-1 md:grid-cols-2 my-[100px] gap-8">
        <div>
          <SectionTitle title="About Tour" />
          <div className="w-full md:w-[378px] text-black text-[40px] md:text-5xl font-medium font-['Noto Sans JP'] capitalize leading-[50px]">
            About This Tour
          </div>
          <div className="flex flex-col gap-4 py-5">
            <p className="text-justify">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text.
            </p>
            <p className="text-justify">
              All the Lorem Ipsum generators on the Internet tend to repeat
              predefined chunks as necessary, making this the first true
              generator on the Internet. It uses a dictionary of over 200 Latin
              words, combined with a handful of model sentence structures, to
              generate Lorem Ipsum which looks reasonable. The generated Lorem
              Ipsum is therefore always free from repetition, injected humour,
              or non-characteristic words etc
            </p>
          </div>
        </div>

        <div>
          <img className="w-full md:w-full" src="/images/about-us-main.jpg" />
        </div>
      </div>

      {/* Schedule */}
      <div>
        <SectionTitle title="Schedule" />
        <div className="w-full md:w-[378px] text-black text-[40px] md:text-5xl font-medium font-['Noto Sans JP'] capitalize leading-[50px]">
          Tour Day schedule
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-4 lg:gap-12">
          {ScheduleData.map((card) => (
            <div className="rounded-xl shadow p-4">
              <SectionTitle title={card.day} />
              <h5 className="text-lg font-bold">{card.title}</h5>
              <p className="text-justify mt-2">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="button font-bold btn-color rounded-0 block btn-lg btn btn-outline-primary mt-5 px-4 py-4 border-2">
            View Tour Schedule
          </button>
        </div>
      </div>

      {/* Related Tours */}
      <div className="my-[120px]">
        <SectionTitle title="Schedule" />
        <div className="w-full md:w-[378px] text-black text-[40px] md:text-5xl font-medium font-['Noto Sans JP'] capitalize leading-[50px]">
          Related Tours
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 ">
          {relatedTours.map((card) => (
            <div key={card.id} className="bg-white shadow-sm w-full rounded-xl">
              <div className="relative shadow-md overflow-hidden group rounded-t-xl">
                <div className="transform transition-transform duration-500 ease-in-out group-hover:scale-110">
                  <img
                    src="/images/package_one.png"
                    alt="packages images"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="blue-div absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-999">
                <div className="package-info flex items-center">
                  <div className="flex items-center">
                    <FaCalendarMinus className="bluediv-icons" />
                    <p className="bluediv-text ml-1 text-nowrap">
                      {card.sdate}D / {card.edate}D
                    </p>
                  </div>
                  <div className="vl"></div>
                  <div className="flex items-center">
                    <FaMapMarkedAlt className="bluediv-icons" />
                    <p className="bluediv-text ml-1">{card.location}</p>
                  </div>
                  <div className="vl"></div>
                  <div className="flex items-center">
                    <HiUsers className="bluediv-icons" />
                    <p className="bluediv-text ml-1 text-nowrap">
                      {card.users}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rtr-shadow ">
                <div className="rtr-content p-4">
                  <div className="rtr-head text-center">
                    <h5 className="text-xl text-left font-bold mt-3">
                      {card.title}
                    </h5>
                  </div>
                  <div className="rtr-para mt-3">
                    <p className="text-justify rtr-parag ">
                      {card.description}
                    </p>
                  </div>
                </div>
                <div className="rtr-bottom-div flex justify-around rounded pt-1 pb-1">
                  <button className="btn rtr-book-now flex py-2 px-4 hover:font-extrabold">
                    Book Now{" "}
                    <FaArrowRight className="bottom-button-icon ml-2 mt-1 " />
                  </button>
                  <div className="rtr-vl"></div>
                  <button className="btn rtr-wish-list flex py-2 px-4 hover:font-extrabold">
                    Wish List{" "}
                    <FaRegHeart className="bottom-button-icon ml-2 mt-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleTour;
