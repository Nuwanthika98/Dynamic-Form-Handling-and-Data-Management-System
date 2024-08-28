import React from "react";
import AllData from "../components/AllData";
import CustomButton from "../components/CustomButton";

const AllDataPage = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-10 gap-6">
        <CustomButton text="Back" navigateTo="/" />
      </div>

      <AllData />
    </div>
  );
};

export default AllDataPage;
