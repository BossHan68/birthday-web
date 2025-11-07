import { useNavigate } from "react-router-dom";
import AnimatedHearts from "../components/AnimatedHearts";
import BigHeart from "../components/BigHeart";

export default function AnniversaryStart() {
  const nav = useNavigate();
  return (
    <div className="hero">
      <BigHeart size="74vmin" tint="#ff6fae" />
      <AnimatedHearts density={18} speed={14} opacity={0.20} />
      <div className="hero-content">
        <h1>Happy Anniversary!</h1>
        <p>Special gift for you 💝</p>
        <button className="btn" onClick={() => nav("/anniversary")}>
          Start!
        </button>
      </div>
    </div>
  );
}
