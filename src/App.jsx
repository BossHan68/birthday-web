import { Routes, Route, Link, Navigate } from "react-router-dom";
import BirthdayLock from "./pages/BirthdayLock";
import BirthdayStart from "./pages/BirthdayStart";
import Wishes from "./pages/Wishes";
import LoveMission from "./pages/LoveMission";
import AnniversaryLock from "./pages/AnniversaryLock";
import AnniversaryStart from "./pages/AnniversaryStart";
import Memories from "./pages/Memories";
import ThankYou from "./pages/ThankYou";

export default function App() {
  return (
    <Routes>
      {/* Birthday */}
      <Route path="/" element={<BirthdayStart />} />
      <Route path="/birthday-lock" element={<BirthdayLock />} />
      <Route path="/wishes" element={<Wishes />} />

      {/* Anniversary */}
      <Route path="/love-mission" element={<LoveMission />} />
      <Route path="/anniversary-start" element={<AnniversaryStart />} />
      <Route path="/anniversary" element={<AnniversaryLock />} />
      <Route path="/memories" element={<Memories />} />
      <Route path="/thank-you" element={<ThankYou />} />

      {/* 404 fallback */}
      <Route
        path="*"
        element={
          <div className="center">
            <h2>ไม่พบหน้านี้</h2>
            <Link to="/" className="btn">
              กลับหน้าแรก
            </Link>
          </div>
        }
      />
    </Routes>
  );
}
