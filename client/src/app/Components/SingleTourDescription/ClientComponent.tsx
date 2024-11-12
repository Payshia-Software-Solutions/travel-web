"use client";

import { useState } from "react";
import GetQuote from "../../Components/GetQuote";
import {
  FaArrowRight,
  FaHeart,
  FaStar,
  FaTrash,
  FaMapMarkedAlt,
  FaCalendarMinus,
  FaRegHeart,
} from "react-icons/fa";
import SectionTitle from "../../Components/section-title/section-title";

const ClientComponent = () => {
  const [activeTab, setActiveTab] = useState("itinerary");

  return (
    <div className="">
      {/* Tab Navigation */}
      <div className="flex justify-between items-center border-b border-gray-300 mt-5">
        {/* Title and Private Tour Label */}
        <div className="flex items-center space-x-2 mt-6 mb-1">
          <h1 className="text-3xl font-bold text-gray-800">
            Sri Lanka Tour Package 7 Days
          </h1>
          <span className="bg-green-500 text-white font-semibold text-sm px-2 py-1 rounded">
            Private Tour
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "itinerary"
                ? "border-t-4 border-green-500"
                : "border-none"
            }`}
            onClick={() => setActiveTab("itinerary")}
          >
            Itinerary
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "inclusions"
                ? "border-t-4 border-green-500"
                : "border-none"
            }`}
            onClick={() => setActiveTab("inclusions")}
          >
            Inclusions
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "summary"
                ? "border-t-4 border-green-500"
                : "border-none"
            }`}
            onClick={() => setActiveTab("summary")}
          >
            Summary
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg lg:col-span-3">
          {/* Active Tab Content */}
          {activeTab === "itinerary" && (
            <div>
              {/* Itinerary content here */}
              <div className="grid ">
                <div className="rounded-lg lg:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                    <div className="">
                      <div className="flex gap-4 flex-col">
                        <div className="text-justify text-stone-500 text-xl font-normal leading-normal">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Quos et ipsam corporis doloremque consequatur,
                          facilis fugiat praesentium nostrum nemo dolor magni,
                          vitae quibusdam aspernatur accusantium, molestiae
                          atque enim ut accusamus? Consectetur, dignissimos?
                          Sunt eos eaque nostrum recusandae velit eligendi iste
                          sapiente voluptates fuga exercitationem modi deserunt
                          praesentium nemo non consequuntur ut ipsum ipsam sit
                          harum, ipsa quasi ab dolorem. Tenetur. Voluptatibus,
                          quod! Cum tempore sunt ea necessitatibus similique
                          veritatis ad vero dolorum ipsum, quam tempora et
                          incidunt culpa voluptates, voluptate facilis quis?
                          Eligendi nostrum inventore animi, placeat quos amet
                          quibusdam! Nam recusandae voluptas maxime quasi dicta
                          quaerat id possimus. Minus architecto explicabo dolor
                          dignissimos impedit placeat quod corporis numquam sit
                          perferendis dolorem, iure, beatae a adipisci soluta
                          labore, non saepe? Ipsum itaque possimus vitae non
                          hic! Adipisci odio ipsa facere deleniti illum sint
                          voluptates ad neque laborum quos nihil quo eveniet
                          autem, officia tempora facilis repellendus accusantium
                          quas. Iusto, tempore.
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
                      </div>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div>
                    <div className="mt-5">
                      <SectionTitle title="Schedule" />
                    </div>
                    <div className="w-full mt-2 text-black text-[40px] md:text-5xl font-medium font-['Noto Sans JP'] capitalize leading-[50px]">
                      Tour Day schedule
                    </div>

                    <div className="mt-5 mb-0">
                      <SectionTitle title="1st Day" />
                    </div>
                    <div className="w-full text-black text-[30px] font-bold font-['Noto Sans JP'] capitalize leading-[50px]">
                      Pick up Katunayaka Bandaranayaka International Airport
                    </div>

                    <div className="my-3">
                      <p className="text-lg leading">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        At porro alias saepe facere maiores eaque ducimus,
                        voluptatibus ipsam adipisci dolorem dolorum est autem
                        officia quaerat non harum nam dolores aut! Lorem ipsum
                        dolor sit amet consectetur adipisicing elit. At porro
                        alias saepe facere maiores eaque ducimus, voluptatibus
                        ipsam adipisci dolorem dolorum est autem officia quaerat
                        non harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem officia quaerat non
                        harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem officia quaerat non
                        harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem officia quaerat non
                        harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem officia quaerat non
                        harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem officia quaerat non
                        harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem officia quaerat non
                        harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem officia quaerat non
                        harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem officia quaerat non
                        harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem adipisicing elit. At
                        porro alias saepe facere maiores eaque
                      </p>
                      <div className="grid grid-cols-4 gap-2 my-3">
                        <img
                          className="rounded-sm object-cover banner-img"
                          src="/images/tours/sripadaya.jpg"
                          alt="home banner"
                        />
                        <img
                          className="rounded-sm object-cover banner-img"
                          src="/images/tours/sripadaya.jpg"
                          alt="home banner"
                        />
                        <img
                          className="rounded-sm object-cover banner-img"
                          src="/images/tours/sripadaya.jpg"
                          alt="home banner"
                        />
                        <img
                          className="rounded-sm object-cover banner-img"
                          src="/images/tours/sripadaya.jpg"
                          alt="home banner"
                        />
                      </div>
                    </div>
                  </div>
                  {/*2nd Description */}
                  <div>
                    <div className="mt-5 mb-0">
                      <SectionTitle title="1st Day" />
                    </div>
                    <div className="w-full text-black text-[30px] font-bold font-['Noto Sans JP'] capitalize leading-[50px]">
                      Pick up Katunayaka Bandaranayaka International Airport
                    </div>

                    <div className="my-3">
                      <p className="text-lg leading">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        At porro alias saepe facere maiores eaque ducimus,
                        voluptatibus ipsam adipisci dolorem dolorum est autem
                        officia quaerat non harum nam dolores aut! Lorem ipsum
                        dolor sit amet consectetur adipisicing elit. At porro
                        alias saepe facere maiores eaque ducimus, voluptatibus
                        ipsam adipisci dolorem dolorum est autem officia quaerat
                        non harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem officia quaerat non
                        harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem officia quaerat non
                        harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem officia quaerat non
                        harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem officia quaerat non
                        harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem officia quaerat non
                        harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem officia quaerat non
                        harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem officia quaerat non
                        harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem officia quaerat non
                        harum nam dolores aut! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. At porro alias saepe
                        facere maiores eaque ducimus, voluptatibus ipsam
                        adipisci dolorem dolorum est autem adipisicing elit. At
                        porro alias saepe facere maiores eaque
                      </p>
                      <div className="grid grid-cols-4 gap-2 my-3">
                        <img
                          className="rounded-sm object-cover banner-img"
                          src="/images/tours/sripadaya.jpg"
                          alt="home banner"
                        />
                        <img
                          className="rounded-sm object-cover banner-img"
                          src="/images/tours/sripadaya.jpg"
                          alt="home banner"
                        />
                        <img
                          className="rounded-sm object-cover banner-img"
                          src="/images/tours/sripadaya.jpg"
                          alt="home banner"
                        />
                        <img
                          className="rounded-sm object-cover banner-img"
                          src="/images/tours/sripadaya.jpg"
                          alt="home banner"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "inclusions" && (
            <div>
              {/* Inclusions content here */}
              <div>
                <div className="w-full text-black text-[30px] font-bold font-['Noto Sans JP'] capitalize leading-[50px]">
                  Inclutions
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <button className="bg-gray-800 text-white hover:bg-gray-500  rounded-lg shadow-md p-4">
                    <h2 className="text-3xl font-bold">Platinum</h2>
                  </button>
                  <button className="bg-gray-800 text-white hover:bg-gray-500  rounded-lg shadow-md p-4">
                    <h2 className="text-3xl font-bold">Gold</h2>
                  </button>
                  <button className="bg-gray-800 text-white hover:bg-gray-500  rounded-lg shadow-md p-4">
                    <h2 className="text-3xl font-bold">Silver</h2>
                  </button>

                  <button className="bg-gray-800 text-white hover:bg-gray-500  rounded-lg shadow-md p-4">
                    <h2 className="text-3xl font-bold">Bronze</h2>
                  </button>
                </div>
                <div className="mt-5">
                  <li>Test</li>
                  <li>Test</li>
                  <li>Test</li>
                  <li>Test</li>
                  <li>Test</li>
                </div>
              </div>
            </div>
          )}
          {activeTab === "summary" && (
            <div>
              <div className="grid ">
                <div className="rounded-lg lg:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                    <div className="">
                      <div className="flex gap-4 flex-col">
                        <div className="text-justify text-stone-500 text-xl font-normal leading-normal">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Quos et ipsam corporis doloremque consequatur,
                          facilis fugiat praesentium nostrum nemo dolor magni,
                          vitae quibusdam aspernatur accusantium, molestiae
                          atque enim ut accusamus? Consectetur, dignissimos?
                          Sunt eos eaque nostrum recusandae velit eligendi iste
                          sapiente voluptates fuga exercitationem modi deserunt
                          praesentium nemo non consequuntur ut ipsum ipsam sit
                          harum, ipsa quasi ab dolorem. Tenetur. Voluptatibus,
                          quod! Cum tempore sunt ea necessitatibus similique
                          veritatis ad vero dolorum ipsum, quam tempora et
                          incidunt culpa voluptates, voluptate facilis quis?
                          Eligendi nostrum inventore animi, placeat quos amet
                          quibusdam! Nam recusandae voluptas maxime quasi dicta
                          quaerat id possimus. Minus architecto explicabo dolor
                          dignissimos impedit placeat quod corporis numquam sit
                          perferendis dolorem, iure, beatae a adipisci soluta
                          labore, non saepe? Ipsum itaque possimus vitae non
                          hic! Adipisci odio ipsa facere deleniti illum sint
                          voluptates ad neque laborum quos nihil quo eveniet
                          autem, officia tempora facilis repellendus accusantium
                          quas. Iusto, tempore.
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* GetQuote Component - Always Visible */}
        <div className="rounded-lg sticky top-0">
          <h2 className="text-3xl font-bold text-blue-800 my-2">
            Tour Details
          </h2>
          <div className="w-full border-gray-300">
            <div className="border my-1 rounded-lg flex justify-between">
              <div className="text-blue-600 font-semibold text-2xl py-2 mx-1">
                9 Days
              </div>
              <div className="p-2 mx-1 text-right">
                <div className="text-blue-800 text-2xl font-bold">US$ 820</div>
                <p className="text-blue-800 text-sm">Per Person</p>
              </div>
            </div>
            <div className="bg-blue-600 text-white text-center py-2 cursor-pointer rounded-lg">
              Enquire Now
            </div>
          </div>

          <GetQuote />
        </div>
      </div>
    </div>
  );
};

export default ClientComponent;
