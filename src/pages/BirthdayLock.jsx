import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Keypad from "../components/Keypad";
import AnimatedHearts from "../components/AnimatedHearts";
import { BIRTHDAY_PIN } from "../config";

export default function BirthdayLock() {
  const nav = useNavigate();
  const images = Array.from({ length: 8 }).map((_, i) => `/images/${i + 1}.jpg`);

  // ✅ state สำหรับเก็บภาพที่คลิก
  const [selected, setSelected] = useState(null);

  return (
    <div className="split sparkly birthday-page">
      {/* ซ้าย: กริดภาพ */}
      <div className="left">
        <div className="birthday-grid">
          {images.map((src, i) => (
            <figure
              className="bday-card"
              key={i}
              onClick={() => setSelected(src)} // 👈 คลิกเปิดภาพ
            >
              <img src={src} alt={`memory-${i + 1}`} />
            </figure>
          ))}
        </div>
      </div>

      {/* ขวา: keypad */}
      <div className="right">
        <div className="title">🎂 Birthday Lock</div>
        <div className="subtitle">วันนี้วันอะไรน้าา</div>
        <Keypad
          expected={BIRTHDAY_PIN}
          length={4}
          onValid={() => nav("/wishes")}
          placeholder="ใส่รหัส 4 หลัก (รหัส→ปีเกิด 200?)"
        />
      </div>

      {/* เอฟเฟกต์หัวใจ */}
      <AnimatedHearts density={10} speed={18} opacity={0.12} />

      {/* ✅ Lightbox ภาพเต็มจอ */}
      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <img src={selected} alt="full-view" className="lightbox-img" />
        </div>
      )}
    </div>
  );
}
