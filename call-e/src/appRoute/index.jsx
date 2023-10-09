import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/authpage/LoginPage";
import HomePage from "../pages/homepage/Index";
import MeetingPage from "../pages/meetingpage/Index";

function AppRoute() {
  return (
    <>
      <section className="centerBox">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/meeting" element={<MeetingPage />} />
        </Routes>
      </section>
    </>
  );
}

export default AppRoute;
