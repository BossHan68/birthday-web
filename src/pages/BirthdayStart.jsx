import { useNavigate } from "react-router-dom";
import AnimatedHearts from "../components/AnimatedHearts";
import BigHeart from "../components/BigHeart";

export default function BirthdayStart() {
  const nav = useNavigate();
  return (
    <div className="hero">
      <BigHeart size="80vmin" tint="#ff6fae" />
      <AnimatedHearts density={18} speed={14} opacity={0.2} />
      <div className="hero-content">
        <div className="hero-badge">🎁 Special Birthday Surprise 🎁</div>
        <h1>Happy Birthday sayang 💖</h1>
        <p>ยินดีต้อนรับสู่ของขวัญวันพิเศษสุดน่ารักเพื่อเธอคนเดียว 🎀</p>
        <button
          type="button"
          className="btn btn-celebrate"
          onClick={() => nav("/birthday-lock")}
        >
          เริ่มต้นความทรงจำ → Start! ✨
        </button>
      </div>
    </div>
  );
}
