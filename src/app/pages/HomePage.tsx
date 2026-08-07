import { Hero } from "../components/Hero";
import { Ticker } from "../components/Ticker";
import { NotDatingApp } from "../components/NotDatingApp";
import { HowItWorks } from "../components/HowItWorks";
import { PhoneDemo } from "../components/PhoneDemo";
import { FeaturedFestival } from "../components/FeaturedFestival";
import { ApplyForm } from "../components/ApplyForm";

export function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <NotDatingApp />
      <HowItWorks />
      <PhoneDemo />
      <FeaturedFestival />
      <ApplyForm />
    </>
  );
}
