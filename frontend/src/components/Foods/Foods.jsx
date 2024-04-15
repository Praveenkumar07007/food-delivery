import React, { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import FoodItem from "./FoodItem";
import breakfast1 from "../../assets/Breakfast/breakfast1.png";
import breakfast2 from "../../assets/Breakfast/breakfast2.png";
import breakfast3 from "../../assets/Breakfast/breakfast3.png";
import breakfast4 from "../../assets/Breakfast/breakfast4.png";
import breakfast5 from "../../assets/Breakfast/breakfast5.png";
import breakfast6 from "../../assets/Breakfast/breakfast6.png";
import lunch1 from "../../assets/Lunch/lunch1.png";
import lunch2 from "../../assets/Lunch/lunch2.png";
import lunch3 from "../../assets/Lunch/lunch3.png";
import lunch4 from "../../assets/Lunch/lunch4.png";
import lunch5 from "../../assets/Lunch/lunch5.png";
import lunch6 from "../../assets/Lunch/lunch6.png";
import dinner1 from "../../assets/Dinner/dinner1.png";
import dinner2 from "../../assets/Dinner/dinner2.png";
import dinner3 from "../../assets/Dinner/dinner3.png";
import dinner4 from "../../assets/Dinner/dinner4.png";
import dinner5 from "../../assets/Dinner/dinner5.png";
import dinner6 from "../../assets/Dinner/dinner6.png";

const foods = [
  {
    id: 1,
    title: "Eggs Benedict",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 8.99,
    image: breakfast1,
    type: "Breakfast",
  },
  {
    id: 2,
    title: "Breakfast Sandwich",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 9.99,
    image: breakfast2,
    type: "Breakfast",
  },
  {
    id: 3,
    title: "Baked Chiken",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 10.99,
    image: breakfast3,
    type: "Breakfast",
  },
  {
    id: 4,
    title: "Bagel and cream cheese",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 23.99,
    image: breakfast4,
    type: "Breakfast",
  },
  {
    id: 5,
    title: "Fried Egg Toast Brunch",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 3.99,
    image: breakfast5,
    type: "Breakfast",
  },
  {
    id: 6,
    title: "Toast Croissant Fried Egg",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 19.99,
    image: breakfast6,
    type: "Breakfast",
  },
  {
    id: 7,
    title: "Beef Steak",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 15.99,
    image: lunch1,
    type: "Lunch",
  },
  {
    id: 8,
    title: "Honey with Peppers",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 7.99,
    image: lunch2,
    type: "Lunch",
  },
  {
    id: 9,
    title: "Tarrgaon Rubbed Salmon",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 7.99,
    image: lunch3,
    type: "Lunch",
  },
  {
    id: 10,
    title: "Indian Lunch",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 8.99,
    image: lunch4,
    type: "Lunch",
  },
  {
    id: 11,
    title: "Fried Chicken Bento",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 13.99,
    image: lunch5,
    type: "Lunch",
  },
  {
    id: 12,
    title: "healthy Meal Plan",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 83.99,
    image: lunch6,
    type: "Lunch",
  },
  {
    id: 13,
    title: "Baked Chicken",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 66.99,
    image: dinner1,
    type: "Dinner",
  },
  {
    id: 14,
    title: "Lemony Salmaon Piccata",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 56.99,
    image: dinner2,
    type: "Dinner",
  },
  {
    id: 15,
    title: "Garlic Butter Baked Salmon",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 3.99,
    image: dinner3,
    type: "Dinner",
  },
  {
    id: 16,
    title: "French Fried with Cheese",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 23.99,
    image: dinner4,
    type: "Dinner",
  },
  {
    id: 17,
    title: "Pork Tenderion",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 12.99,
    image: dinner5,
    type: "Dinner",
  },
  {
    id: 18,
    title: "Lentil Salad",
    description:
      "Gay one the what walk then she. Demesne mention promise you justice arrived way.Amazing foods are or and increasing to in especially inquietude companions acceptance admiration.Outweigh it families distance wandered ye..",
    price: 9.99,
    image: dinner6,
    type: "Dinner",
  },
];

const Foods = () => {
  const [menuTab, setMenuTab] = useState("Breakfast");
  const [loading, setLoading] = useState(false);
  //    const [foods] = useFetch();

  //loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  //food menu tab
  const handleMenuTabs = (type) => {
    setMenuTab(type);
  };
  return (
    <section className="my-12 max-w-screen-xl mx-auto px-6">
      {/* food Menu tab  */}
      <div className="flex items-center justify-center space-x-6">
        <p
          className={
            menuTab === "Breakfast"
              ? "active_menu_tab poppins bg-primary"
              : "menu_tab poppins"
          }
          onClick={() => handleMenuTabs("Breakfast")}>
          Breakfast
        </p>
        <p
          className={
            menuTab === "Lunch"
              ? "active_menu_tab poppins bg-primary"
              : "menu_tab poppins"
          }
          onClick={() => handleMenuTabs("Lunch")}>
          Lunch
        </p>
        <p
          className={
            menuTab === "Dinner"
              ? "active_menu_tab poppins bg-primary"
              : "menu_tab poppins"
          }
          onClick={() => handleMenuTabs("Dinner")}>
          Dinner
        </p>
      </div>

      {/* all foods  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {foods
          .filter((item) => menuTab === item.type)
          .map((item) =>
            loading ? (
              <Skeleton key={item.id} />
            ) : (
              <FoodItem key={item.id} item={item} />
            )
          )}
      </div>
    </section>
  );
};

export default Foods;
