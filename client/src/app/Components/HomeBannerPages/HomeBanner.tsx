import React from "react";

function HomeBanner() {
  return (
    <div className="relative h-screen">
      {/* <Image className="rounded lg:h-custom object-cover" src={HomeBanner} /> */}
      <img
        className="rounded lg:h-screen object-cover banner-img"
        src="/images/all-tours.jpg"
        alt="home banner"
      />
      <div className="image-overlay rounded flex justify-center items-center">
        <div className="text-center relative" style={{ top: "-2rem" }}>
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
  );
}

export default HomeBanner;
