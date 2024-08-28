import React from "react";
import AddDeliveryData from "../components/AddDeliveryData";
import CustomButton from "../components/CustomButton";

const MainPage = () => {
  return (
    <div>
      <AddDeliveryData />
      <div className="flex justify-center items-center mt-10 gap-4">
        <CustomButton text="All Records" navigateTo="/alldata" />
        <CustomButton text="Search by Postalcode" navigateTo="/search" />
      </div>
    </div>
  );
};

export default MainPage;
