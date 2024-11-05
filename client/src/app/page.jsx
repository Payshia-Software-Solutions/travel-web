import SectionTitle from "./Components/section-title/section-title";
import "./home.css";

import HomeBannerMain from "./Components/HomeBanner/Hero";
import WelcomeMain from "./Components/WelcomeMain/WelcomeMain";
import ReadyToRide from "./Components/ReadyToRide/ReadyToRide";
import CustomerExperience from "./Components/Experience/CustomerExperience";

export default function Home() {
  const data = [
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
    <main className="">
      {/* ====== home Banner section ====== */}
      <HomeBannerMain />
      {/* ====== Welcome section ====== */}
      <WelcomeMain />
      {/* ====== Ready to ride section ====== */}
      <ReadyToRide />
      {/* ====== Customer Experience section ====== */}
      <CustomerExperience />
    </main>
  );
}
