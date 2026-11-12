import { useNavigate } from "react-router-dom";
import AnimatedHearts from "../components/AnimatedHearts";
import BigHeart from "../components/BigHeart";

export default function AnniversaryStart() {
  const nav = useNavigate();
  return (
    <div className="hero">
      <BigHeart size="80vmin" tint="#ff4fa2" />
      <AnimatedHearts density={18} speed={14} opacity={0.2} />
      <div className="hero-content">
        <div className="hero-badge">💍 Happy Anniversary 💍</div>
        <h1>Happy Anniversary! 💖</h1>
        <p>ฉลองครบรอบ 3 ปีแห่งความรักและความทรงจำดี ๆ ของเรา 🌹</p>
        <button
          type="button"
          className="btn btn-celebrate"
          onClick={() => nav("/anniversary")}
        >
          เข้าสู่ช่วงเวลาครบรอบ → Start! ✨
        </button>
      </div>
    </div>
  );
}
