import React from "react";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";

const Layout = (props) => {
  return (
    <>
      {/* //To show the loader by passing props loading is true or not */}
      {props.loading && <Loader />}
      <Header />
      {/* To show all the content wrapeed between the Layout component and by default all the components wrapped in between are coming as children props */}
      <div>{props.children}</div>
      {/* // <Footer /> */}
    </>
  );
};
export default Layout;
