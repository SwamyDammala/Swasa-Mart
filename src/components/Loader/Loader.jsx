import React from "react";
import "./Loader.css";

//Loader component from bootstrap to show the loader while data fetching from firebase
const Loader = () => {
  return (
    <div className="d-flex justify-content-center loader">
      <div className="spinner-border" role="status"></div>
    </div>
  );
};

export default Loader;
