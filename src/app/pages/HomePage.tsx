import { Hero } from "../components/Hero";
import { FestivalBanner } from "../components/FestivalBanner";
import { Ticker } from "../components/Ticker";
import { NotDatingApp } from "../components/NotDatingApp";
import { PhoneDemo } from "../components/PhoneDemo";
import { FeaturedFestival } from "../components/FeaturedFestival";
import { ApplyForm } from "../components/ApplyForm";

export function HomePage() {
  return (
    <>
      <Hero />
      <FestivalBanner />
      <Ticker />
      <NotDatingApp />
      <PhoneDemo />
      <FeaturedFestival />
      <ApplyForm />
    </>
  );
}
