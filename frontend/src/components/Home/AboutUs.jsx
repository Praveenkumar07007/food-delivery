import React, { useEffect, useState } from "react";
import AboutItem from "./AboutItem";
import groupIcon1 from "../../assets/ICON/Group 204.png";
import groupIcon2 from "../../assets/ICON/Group 1133.png";
import groupIcon3 from "../../assets/ICON/Group 245.png";
import img1 from "../../assets/Image/adult-blur-blurred-background.png";
import img2 from "../../assets/Image/chef-cook-food.png";
import img3 from "../../assets/Image/architecture-building-city.png";
const aboutData = [
  {
    id: 1,
    image: img1,
    icon: groupIcon1,
    title: "Fast Delivery",
    description:
      "Keep your systems in sync with automated web hook bases notifications each tume link is paid and how we dream about our future.",
  },
  {
    id: 2,
    image: img2,
    icon: groupIcon2,
    title: "A Good Auto Responder",
    description:
      "Keep your systems in sync with automated web hook bases notifications each tume link is paid and how we dream about our future.",
  },
  {
    id: 3,
    image: img3,
    icon: groupIcon3,
    title: "Home Delivery",
    description:
      "Keep your systems in sync with automated web hook bases notifications each tume link is paid and how we dream about our future.",
  },
];

const AboutUs = () => {
  return (
    <div className="max-w-screen-xl mx-auto my-12 px-6">
      <h1 className="text-4xl poppins pb-4">Why you choose us</h1>
      <p className="text-gray-500 text-sm poppins w-2/4">
        Barton waited twenty always repair in within we do. AN delighted
        offending curiosity my is dashwoods at. Boy prosperous increasing
        surrounded.
      </p>

      {/* about us cards  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
        {aboutData.map((item) => (
          <AboutItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
