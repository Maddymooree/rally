import { Hero } from "../components/Hero";
import { AclBanner } from "../components/AclBanner";
import { Ticker } from "../components/Ticker";
import { NotDatingApp } from "../components/NotDatingApp";
import { PhoneDemo } from "../components/PhoneDemo";
import { FeaturedFestival } from "../components/FeaturedFestival";
import { ApplyForm } from "../components/ApplyForm";

export function HomePage() {
  return (
    <>
      <Hero />
      <AclBanner />
      <Ticker />
      <NotDatingApp />
      <PhoneDemo />
      <FeaturedFestival />
      <ApplyForm />
    </>
  );
}
