import React, { Fragment } from "react";
import { Outlet } from "react-router";
import Header from "./Header";

const Main = () => {
  return (
    <Fragment>
      <Header></Header>
      <Outlet></Outlet>
    </Fragment>
  );
};

export default Main;
