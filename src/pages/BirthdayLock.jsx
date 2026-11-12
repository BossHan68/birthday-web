import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Keypad from "../components/Keypad";
import AnimatedHearts from "../components/AnimatedHearts";
import { BIRTHDAY_PIN } from "../config";

// โหลดรูปความทรงจำทั้งหมดใน public/images อัตโนมัติ (เฉพาะรูปที่เป็นตัวเลข 1, 2, 3... ไม่รวมรูปเกม/หน้าอื่น)
const imageModules = import.meta.glob("/public/images/*.{jpg,jpeg,png,webp,svg,JPG,JPEG,PNG,WEBP}", {
  eager: true,
});

const images = Object.keys(imageModules)
  .map((path) => path.replace(/^\/public/, ""))
  .filter((path) => /^\/images\/\d+\.(jpg|jpeg|png|webp|svg)$/i.test(path))
  .sort((a, b) => {
    const numA = parseInt(a.match(/(\d+)(?!.*\d)/)?.[0] || "0", 10);
    const numB = parseInt(b.match(/(\d+)(?!.*\d)/)?.[0] || "0", 10);
    return numA - numB;
  });

export default function BirthdayLock() {
  const nav = useNavigate();
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
              onClick={() => setSelected(src)}
              title="แตะเพื่อดูภาพขยาย"
            >
              <img src={src} alt={`memory-${i + 1}`} loading="lazy" />
              <div className="bday-card-overlay">
                <span>🔍 ดูรูป</span>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* ขวา: keypad */}
      <div className="right">
        <div className="title">🎂 Birthday Lock</div>
        <div className="subtitle">วันนี้วันอะไรน้าา 💖</div>
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
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <img src={selected} alt="full-view" className="lightbox-img" />
          </div>
        </div>
      )}
    </div>
  );
}
