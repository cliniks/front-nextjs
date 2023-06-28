import React from "react";
import { BackgroundSVG } from "./Boxes/BackgroundSVG";
import { SectionBenefits } from "./Boxes/SectionBenefits";
import { SectionFeaturedProducts } from "./Boxes/SectionFeaturedProducts";
import { SectionWeArePerfectFor } from "./Boxes/SectionWeArePerfectFor";
import { SectionWhatWeSolve } from "./Boxes/SectionWhatWeSolve";
import { SectionWhyDoWeLive } from "./Boxes/SectionWhyDoWeLive";
import { SectionWhyJoinCliniks } from "./Boxes/SectionWhyJoinCliniks";
import SliderComponent from "./Boxes/Slider";

function HomePage() {
  return (
    <>
      <SliderComponent className="home_slider" />
      <SectionWhyDoWeLive />
      <SectionWhyJoinCliniks />
      <BackgroundSVG />
      <SectionWeArePerfectFor />
      <SectionWhatWeSolve />
      {/* <SectionFeaturedProducts /> */}
      <SectionBenefits />
      {/* <SectionPartners /> */}
    </>
  );
}

export default HomePage;
