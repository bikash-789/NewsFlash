import React from "react";
import Loading from "../spinner.gif";

const Spinner = () => {
  return (
    <div className="text-center" style={{ zIndex: "5" }}>
      <img src={Loading} alt="loading" />
    </div>
  );
};

export default Spinner;
