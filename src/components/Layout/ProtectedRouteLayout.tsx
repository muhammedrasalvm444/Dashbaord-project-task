import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const ProtectedRoute: React.FC = () => {
  return isAuthenticated() ? (
    <>
      <Navbar />
      <DashboardLayout>
        <Sidebar />
        <MainContent>
          {" "}
          <Outlet />
        </MainContent>
      </DashboardLayout>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
const DashboardLayout = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;
