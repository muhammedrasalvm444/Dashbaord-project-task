import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "../pages/login";
import ProtectedRoute from "../components/Layout/ProtectedRouteLayout";
import Dashboard from "../pages/players";
import PlayersDashBoard from "../pages/players";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/players" element={<PlayersDashBoard />} />
          <Route path="/player/create" element={<Dashboard />} />
          <Route path="/clubs" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
