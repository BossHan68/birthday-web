import { useNavigate } from "react-router-dom";
import AnimatedHearts from "../components/AnimatedHearts";
import BigHeart from "../components/BigHeart";

export default function BirthdayStart(){
  const nav = useNavigate();
  return (
    <div className="hero">
      {/* หัวใจใหญ่ชัด ๆ + เคลื่อนไหว */}
      <BigHeart size="74vmin" tint="#ff6fae" />
      {/* คอนเฟตตี้หัวใจเล็ก ๆ ด้านหลัง */}
      <AnimatedHearts density={18} speed={14} opacity={0.20}/>
      <div className="hero-content">
        <h1>Happy Birthday sayang💖</h1>
        <p>A little surprise for you 🎁</p>
        <button className="btn" onClick={()=>nav("/birthday-lock")}>Start!</button>
      </div>
    </div>
  );
}
