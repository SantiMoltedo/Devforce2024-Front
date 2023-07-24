import React from "react";
import { Outlet } from "react-router";

export const Layout = () => {
  return <div className="h-full ml-20"> <Outlet/> </div>;

};
