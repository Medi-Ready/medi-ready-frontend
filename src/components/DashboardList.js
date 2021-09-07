import React from "react";
import Dashboard from "./Shared/Dashboard";

const DashboardList = () => {
  return (
    <>
      <h2>Dashboard</h2>

      <Dashboard
        src="/icon-chart.png"
        color="#EAEDFA"
        number="101"
        string="Total Visitis"
      />

      <Dashboard
        src="/icon-file.png"
        color="#FEF8ED"
        number="135"
        string="Total Prescriptions"
      />
    </>
  );
};

export default DashboardList;