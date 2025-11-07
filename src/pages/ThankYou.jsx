import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typing from "../components/Typing";
import AnimatedHearts from "../components/AnimatedHearts";

export default function ThankYou(){
  const [showVideo, setShowVideo] = useState(false);
  const nav = useNavigate();
  const videoRef = useRef(null);

  // ให้วิดีโอเริ่มเล่นทันทีหลังจากถูกแสดง (muted + autoplay + loop)
  useEffect(() => {
    if (!showVideo || !videoRef.current) return;
    const v = videoRef.current;
    v.muted = true;           // จำเป็นเพื่อให้ autoplay ผ่านนโยบาย browser
    v.loop = true;
    v.playsInline = true;
    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        // เผื่อบาง browser ต้องสั่งอีกครั้ง
        setTimeout(() => v.play().catch(()=>{}), 100);
      });
    }
  }, [showVideo]);

  return (
    <div className="center video-stage">
      <AnimatedHearts density={16} speed={16} opacity={0.16}/>
      <div className="wish-card">
        <h2>ขอบคุณที่ยังอยู่ข้างกันเสมอ 🌷</h2>

        <Typing
          lines={[
            "ทุกวันคือของขวัญ เพราะมีเธออยู่ด้วย",
            "ขอบคุณที่อดทน เข้าใจ และรักกันในทุก ๆ เรื่อง",
            "ขออยู่กันแบบนี้นานๆนะ",
            "จากนี้ไป... จะตั้งใจดูแลหัวใจของเราให้ดีที่สุด 🤍",
            "2023->2024->2025"
          ]}
          speed={40}
          sound
          onDone={() => setShowVideo(true)}
        />

        {showVideo && (
          <div className="video-wrap portrait">
            <video
              ref={videoRef}
              className="video vertical"
              src="/videos/new fan.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              // ถ้าอยากให้มีปุ่มควบคุมด้วย ให้เปิดบรรทัดด้านล่าง
              // controls
            />
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <button className="btn" onClick={() => nav("/")}>
            กลับไปหน้า BirthdayStart 💖
          </button>
        </div>
      </div>
    </div>
  );
}
