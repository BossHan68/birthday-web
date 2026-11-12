import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typing from "../components/Typing";
import AnimatedHearts from "../components/AnimatedHearts";

export default function ThankYou(){
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const nav = useNavigate();
  const videoRef = useRef(null);

  // ให้วิดีโอเริ่มเล่นทันทีหลังจากถูกแสดง (พยายามเปิดเสียงก่อน ถ้าติด autoplay policy ค่อยสลับเป็น muted)
  useEffect(() => {
    if (!showVideo || !videoRef.current) return;
    const v = videoRef.current;
    v.loop = true;
    v.playsInline = true;
    v.muted = false; // พยายามเล่นพร้อมเสียง

    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.then(() => {
        setIsMuted(false);
      }).catch(() => {
        // หากเบราว์เซอร์บล็อกการเล่นเสียงอัตโนมัติ ให้เล่นแบบปิดเสียงไว้ก่อน แล้วให้ผู้ใช้กดปุ่มเปิดเสียง
        v.muted = true;
        setIsMuted(true);
        v.play().catch(() => {});
      });
    }
  }, [showVideo]);

  const toggleSound = () => {
    if (!videoRef.current) return;
    const v = videoRef.current;
    if (v.muted) {
      v.muted = false;
      setIsMuted(false);
      v.play().catch(() => {});
    } else {
      v.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <div className="center video-stage">
      <AnimatedHearts density={16} speed={16} opacity={0.16}/>
      <div className="wish-card">
        <h2>ขอบคุณที่ยังอยู่ข้างกันเสมอ 🌷</h2>

        <Typing
          lines={[
            "ขอบคุณที่เป็นทั้งความรัก ความสบายใจ และรอยยิ้มของเค้านะ 🫶🏻",
            "ขอบคุณที่อยู่ด้วยกันในวันที่ดี และยังอยู่ข้างกันในวันที่ไม่ง่าย",
            "อาจจะมีงอแงบ้าง ดื้อบ้าง ทะเลาะกันบ้าง",
            "แต่ก็อยากให้รู้ไว้ว่ายังอยากมีเธออยู่ในทุก ๆ วันเลย",
            "ขอให้เราเป็นความน่ารักของกันและกันแบบนี้ไปเรื่อย ๆ นะ",
            "ปีนี้ ปีหน้า และทุก ๆ ปี ขอมีเธออยู่ด้วยนะคนเก่ง 🤍",
            "2023 → 2024 → 2025 → 2026 → Forever ♡"
          ]}
          speed={75}
          linePause={950}
          donePause={1500}
          sound
          onDone={() => setShowVideo(true)}
        />

        {!showVideo && (
          <div style={{ marginTop: 8 }}>
            <button
              type="button"
              onClick={() => setShowVideo(true)}
              style={{
                background: "none",
                border: "none",
                color: "#D86DA1",
                textDecoration: "underline",
                fontSize: "13px",
                cursor: "pointer",
                padding: "4px 8px",
              }}
            >
              ข้ามไปดูวิดีโอเลย 🎬
            </button>
          </div>
        )}

        {showVideo && (
          <div>
            <div className="video-wrap portrait">
              <video
                ref={videoRef}
                className="video vertical"
                src="/videos/video.mp4"
                autoPlay
                loop
                playsInline
                preload="auto"
                controls
                onVolumeChange={() => {
                  if (videoRef.current) {
                    setIsMuted(videoRef.current.muted || videoRef.current.volume === 0);
                  }
                }}
              />
            </div>

            {/* ปุ่มเปิด/ปิดเสียงเพลง */}
            <div style={{ marginTop: 12 }}>
              <button
                type="button"
                className="btn"
                onClick={toggleSound}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: isMuted ? "#ff4fa2" : "#fff",
                  color: isMuted ? "#fff" : "#ff4fa2",
                  border: "2px solid #ff4fa2",
                  boxShadow: "0 4px 14px rgba(255, 79, 162, 0.25)",
                  fontSize: "14px",
                  fontWeight: "600",
                  padding: "8px 18px",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                {isMuted ? "🔊 แตะเพื่อเปิดเสียงเพลง" : "🔇 ปิดเสียงเพลง"}
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: 16 }}>
          <button className="btn" onClick={() => nav("/")}>
            กลับไปหน้า BirthdayStart 💖
          </button>
        </div>
      </div>
    </div>
  );
}
