import React from "react";
import SectionTitle from "../section-title/section-title";

function WelcomeMain() {
  return (
    <div className="container-fluid mt-5 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionTitle title="ceylon odyssey" />
          <h1 className="lg:text-4xl sm:text-xl text-xl font-bold mb-4">
            Welcome To Ceylon Odyssey
          </h1>
          <p className="w-f opacity-70 text-justify">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text.
          </p>
          <p className="mt-4 opacity-70 text-justify">
            All the Lorem Ipsum generators on the Internet tend to repeat
            predefined chunks as necessary, making this the first true generator
            on the Internet. It uses a dictionary of over 200 Latin words,
            combined with a handful of model sentence structures, to generate
            Lorem Ipsum which looks reasonable.
          </p>
          <button className="btn-color welcome-button rounded-0 hidden font-bold lg:block btn border-2 mt-4 p-3">
            Learn more
          </button>
        </div>
        <div className="relative w-full h-full lg:rounded-lg overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src="/images/about-us-main.jpg"
            alt=""
          />
          <button className="btn-color rounded-0 block lg:hidden btn btn-outline-primary mt-4">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeMain;
