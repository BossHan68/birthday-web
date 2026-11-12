import { useNavigate } from "react-router-dom";
import Keypad from "../components/Keypad";
import AnimatedHearts from "../components/AnimatedHearts";
import { ANNIV_PIN } from "../config";

export default function AnniversaryLock() {
  const nav = useNavigate();

  // รูป l1 และ l2 จาก public/images ประกบหัวใจตรงกลาง
  const images = ["/images/l1.jpg", "/images/l2.jpg"];

  return (
    <div className="split sparkly">
      {/* ซ้าย: 2 รูปประกบหัวใจตรงกลาง */}
      <div className="left">
        <div className="photo-center">
          <img src={images[0]} alt="photo-left" className="side-photo" />

          {/* หัวใจแบบ SVG (ไม่ต้องมีไฟล์) */}
          <svg
            className="heart-center"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="heart"
          >
            <defs>
              <linearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff94c2" />
                <stop offset="100%" stopColor="#ff4fa2" />
              </linearGradient>
            </defs>
            <path
              d="M50 15C65 -5, 95 5, 95 35C95 65, 50 90, 50 90C50 90, 5 65, 5 35C5 5, 35 -5, 50 15Z"
              fill="url(#heartGradient)"
            />
          </svg>

          <img src={images[1]} alt="photo-right" className="side-photo" />
        </div>
      </div>

      {/* ขวา: ใส่รหัสครบรอบ */}
      <div className="right">
        <div className="title">🎀 Anniversary Lock</div>
        <div className="subtitle">วันนี้วันอะไรน้าาา</div>

        {/* ใช้รหัส 1 หลัก = ครบรอบกี่ปี */}
        <Keypad
          expected={ANNIV_PIN}
          length={1}
          onValid={() => nav("/memories")}
          placeholder="ใส่รหัส 1 หลัก (รหัส→ครบรอบกี่ปี?)"
        />
      </div>

      <AnimatedHearts density={10} speed={18} opacity={0.12} />
    </div>
  );
}
