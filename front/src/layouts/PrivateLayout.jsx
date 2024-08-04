import React from "react";
import { Outlet } from "react-router-dom";
import SidebarWithContentSeparator from "./SidebarWithContentSeparator";
import ComplexNavbar from "./ComplexNavbar";

const PrivateLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarWithContentSeparator />
      <div className="flex flex-col flex-1">
        <ComplexNavbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;