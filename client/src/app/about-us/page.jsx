import React from "react";
import HomeBannerMain from "../Components/HomeBanner/Hero";
import HomeBanner from "../../../public/images/home-banner.jpg";
import "./about-us.css";
import SectionTitle from "../Components/section-title/section-title";

export const metadata = {
  title: "About Us | Ceylon Odyssey",
  description: "Perfect Destination Awaits",
  keywords: "travel, tours, Sri Lanka, Ceylon Odyssey, destinations",
  author: "Ceylon Odyssey Team",
  openGraph: {
    type: "website",
    url: "https://www.ceylonodyssey.com/about",
    title: "About Us | Ceylon Odyssey",
    description: "Perfect Destination Awaits",
    images: [
      {
        url: "https://www.ceylonodyssey.com/images/about-us.jpg",
        width: 800,
        height: 600,
        alt: "About Us - Ceylon Odyssey",
      },
    ],
  },
};

const aboutUs = () => {
  return (
    <main className="">
      {/*======banner=====*/}

      <HomeBannerMain />
      {/*=====section bar=====*/}

      {/*=====about section=====*/}
      <div className="relative flex flex-col md:flex-row rounded mt-20">
        <img
          className="w-full md:w-3/5 rounded md:rounded-bl-md md:rounded-tl-none"
          src="/images/about-us.jpg"
          alt="Placeholder Image"
        />
        <div className="w-full md:w-2/5 p-4 bg-neutral-100 rounded-tr-md md:rounded-tr-none md:rounded-br-[15px]">
          <div className="h-1/3 flex flex-col justify-start items-start gap-4 p-5">
            <div className="px-2 bg-sky-900 inline-flex">
              <div className="text-white text-xs font-medium uppercase tracking-[5px]">
                ABOUT
              </div>
            </div>
            <div className="text-black text-3xl font-medium capitalize leading-[50px]">
              We Make Quality Glasses For Everyone.
            </div>
          </div>
          <div className="text-black text-opacity-60 text-sm font-normal leading-normal mb-4">
            Welcome to Ceylon Odyssey, your gateway to unparalleled adventures
            in the resplendent island of Sri Lanka. Nestled in the heart of the
            Indian Ocean, Sri Lanka is a treasure trove of diverse landscapes,
            rich cultural heritage, and warm hospitality, and we are dedicated
            to helping you explore its wonders like never before.
          </div>
          <div className="text-black text-opacity-60 text-sm font-normal leading-normal mb-4">
            As an inbound travel company based in Sri Lanka, we specialize in
            crafting bespoke journeys that cater to your every desire and exceed
            your expectations. Whether you seek to immerse yourself in the in
            vibrant bustle of Markets around the country, uncover ancient
            Mysteries of kingdoms such as Anuradhapura and Polonnaruwa and
            Kurunegala, anciemt colonial buildings and forts, or unwind uncover
            the ancient mysteries of Anuradhapura's ruins, or unwind on the
            pristine beaches of the southern coast, we have the expertise and
            passion to make your dreams a reality.
          </div>
          <div className="text-black text-opacity-60 text-sm font-normal leading-normal mb-4">
            At Ceylon Odyssey, we believe in the transformative power of travel
            to foster connections, inspire discovery, and create lifelong
            memories. Our team of experienced professionals is committed to
            providing personalized service, attention to detail, and a deep
            respect for the environment and communities we visit.
          </div>
          <div className="text-black text-opacity-60 text-sm font-normal leading-normal mb-4">
            From luxurious accommodations to authentic cultural experiences,
            sustainable tourism practices to seamless logistics, we strive to
            ensure that every aspect of your journey is nothing short of
            extraordinary. Whether you're a solo traveler seeking adventure, a
            couple in search of romance, or a family eager to make memories
            together, Ceylon Odyssey is your trusted partner in exploring the
            wonders of Sri Lanka.
          </div>
          <div className="text-black text-opacity-60 text-sm font-normal leading-normal mb-4">
            Join us on a journey of discovery, wonder, and adventure, and let
            Ceylon Odyssey be your guide to the enchanting island of Sri Lanka.
          </div>
        </div>
      </div>

      {/*=====our vision=====*/}
      <div className="relative flex flex-col md:flex-row mt-16">
        <img
          className="w-full md:w-1/3 mt-4 md:mt-0 order-2 md:order-1"
          src="https://via.placeholder.com/646x402"
          alt="Placeholder Image"
        />
        <div className="w-full md:w-2/3 pr-4 order-1 md:order-2">
          <div className="w-full h-full p-4 rounded-md bg-neutral-100">
            <div className="h-1/4 flex flex-col justify-start items-start gap-4">
              <div className="px-2 bg-sky-900 inline-flex">
                <div className="text-white text-xs font-medium uppercase tracking-[5px]">
                  Vision
                </div>
              </div>
              <div className="self-stretch text-black text-3xl font-medium capitalize leading-[50px]">
                Our Vision
              </div>
            </div>
            <div className="self-stretch text-black text-opacity-60 text-sm font-normal leading-normal mb-4">
              "At Ceylon Odyssey, our vision is to be the premier gateway to the
              wonders of Sri Lanka, offering unparalleled experiences that
              inspire a lifelong love affair with our island nation. We aim to
              showcase the richness of our culture, the diversity of our
              landscapes, and the warmth of our hospitality, while fostering
              sustainable tourism practices that preserve our natural and
              cultural heritage for generations to come. With a commitment to
              excellence and a passion for creating unforgettable memories, we
              strive to exceed the expectations of every traveler who entrusts
              us with their journey, ensuring that their odyssey through Sri
              Lanka is nothing short of extraordinary."
            </div>
          </div>
        </div>
      </div>

      {/*=====our mission=====*/}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 mt-5">
        <img className="w-full rounded-2xl" src="/images/package_one.png" />

        <div className="flex flex-row items-center">
          <div>
            <SectionTitle title="MISSION" />
            <div className="self-stretch text-black text-5xl font-medium font-['Noto Sans JP'] capitalize leading-10 mb-4">
              our mission
            </div>

            <div className="self-stretch text-black text-opacity-60 text-base font-normal leading-normal text-justify">
              "At Ceylon Odyssey, our mission is to curate immersive and
              unforgettable travel experiences that showcase the beauty,
              culture, and heritage of Sri Lanka. Through personalized service,
              attention to detail, and a deep commitment to sustainability, we
              aim to exceed the expectations of our guests and leave a positive
              impact on the communities and environments we touch. By fostering
              meaningful connections between travelers and the destinations they
              explore, we strive to inspire a profound appreciation for the
              wonders of Sri Lanka and create memories that last a lifetime."
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default aboutUs;
