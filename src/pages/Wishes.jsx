import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typing from "../components/Typing";
import AnimatedHearts from "../components/AnimatedHearts";

export default function Wishes() {
  const nav = useNavigate();
  const [isDone, setIsDone] = useState(false);

  return (
    <div className="center">
      <AnimatedHearts density={16} speed={15} opacity={0.16} />
      <div className="wish-card wish-birthday-card">
        <div className="cake-icon-wrap" aria-hidden>🎂✨</div>
        <h2>Happy Birthday nah sayang 💖</h2>
        <Typing
          lines={[
            "ขอให้วันนี้เป็นวันที่มีแต่รอยยิ้มและความสุขนะ 🎂🤍",
            "ขอบคุณที่เข้ามาเป็นความสุข เป็นกำลังใจ และเติมเต็มสิ่งดี ๆ ให้กันเสมอ",
            "ไม่ว่าจะวันไหน ๆ ทั้งวันที่มีความสุขหรือวันที่เหนื่อย เค้าก็จะอยู่ข้าง ๆ คอยเป็นกำลังใจให้เสมอนะ",
            "ขอให้เธอมีความสุขมาก ๆ เจอแต่เรื่องดี ๆ และยิ้มเยอะ ๆ ในทุกวันเลย",
            "ขอให้เราได้อยู่ด้วยกันแบบนี้ไปนาน ๆ ได้ฉลองวันเกิดด้วยกันอีกหลายปีเลยนะ 🥰",
            "รักที่สุดในโลกเลยนะคนเก่ง 🎂✨",
          ]}
          speed={75}
          linePause={950}
          donePause={1400}
          sound
          onDone={() => setIsDone(true)}
        />
        {!isDone && (
          <div style={{ marginTop: 10 }}>
            <button
              type="button"
              onClick={() => setIsDone(true)}
              style={{
                background: "none",
                border: "none",
                color: "var(--pink-deep)",
                textDecoration: "underline",
                fontSize: "13px",
                cursor: "pointer",
                opacity: 0.75,
              }}
            >
              ข้ามข้อความ ⏩
            </button>
          </div>
        )}
        {isDone && (
          <div style={{ marginTop: 20 }}>
            <button
              type="button"
              className="btn btn-celebrate"
              onClick={() => nav("/love-mission")}
            >
              ไปภารกิจถัดไป → Love Mission 🚀
            </button>
          </div>
        )}
      </div>
      <div className="floating-hearts" aria-hidden />
    </div>
  );
}
