import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/authpage/LoginPage";
import HomePage from "../pages/homepage/Index";

function AppRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default AppRoute;
