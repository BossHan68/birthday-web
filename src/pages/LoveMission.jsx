import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * LoveMission – ด่านยานอวกาศความรัก
 * เส้นทาง: 2023 (เริ่ม) → 2024 (checkpoint) → 2025 (finish)
 */
export default function LoveMission() {
  const nav = useNavigate();
  const [checkpoint2024, setCheckpoint2024] = useState(false);
  const [reached, setReached] = useState(false);

  // เวลาโดยรวม (ms)
  const DURATION = 11000;            // ยานใช้เวลาบินทั้งหมด
  const CHECKPOINT_2024 = 5500;      // ถึง 2024 ครึ่งทาง

  useEffect(() => {
    const t1 = setTimeout(() => setCheckpoint2024(true), CHECKPOINT_2024);
    const t2 = setTimeout(() => setReached(true), DURATION);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="mission-stage">
      {/* เอฟเฟกต์กล้อง */}
      <div className="camera-overlay" aria-hidden />

      {/* ท้องฟ้า + เมฆ */}
      <div className="sky">
        <div className="clouds">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="cloud" style={{ "--i": i }} />
          ))}
        </div>
      </div>

      {/* ดาวระยิบ */}
      <div className="space">
        <div className="stars" />
        <div className="stars slower" />
      </div>

      {/* จุดเริ่มต้น 2023 */}
      <div className="milestone y2023" aria-hidden>
        <div className="badge">2023</div>
        <div className="ping" />
      </div>

      {/* Checkpoint 2024 */}
      <div className="milestone y2024" aria-hidden>
        <div className="badge">2024</div>
        <div className="ping" />
      </div>

      {/* Finish 2025 */}
      <div className="milestone y2025" aria-hidden>
        <div className="flag">
          <span className="pole" />
          <span className="cloth">2025</span>
        </div>
        <div className="ping strong" />
      </div>

      {/* ดาวหัวใจปลายทาง */}
      <div className="heart-planet" aria-hidden>
        <div className="glow" />
        <div className="core" />
      </div>

      {/* 🚀 ยานออกตัวจาก 2023 */}
      <div className="rocket-wrap path-2025">
        <svg
          className="rocket"
          viewBox="0 0 120 180"
          aria-label="love-rocket"
        >
          <defs>
            <linearGradient id="body" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffe1ef" />
              <stop offset="100%" stopColor="#ff77b7" />
            </linearGradient>
            <linearGradient id="fin" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#ff5aa7" />
              <stop offset="100%" stopColor="#ff9ac8" />
            </linearGradient>
            <radialGradient id="window" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#c0e6ff" />
              <stop offset="100%" stopColor="#5bb2ff" />
            </radialGradient>
          </defs>

          {/* ตัวเรือ */}
          <path
            d="M60 5 C80 34 90 70 90 110 L60 140 L30 110 C30 70 40 34 60 5Z"
            fill="url(#body)"
            stroke="#ff5aa7"
            strokeWidth="2"
          />
          {/* ปีก */}
          <path d="M30 110 L12 130 L36 140 L30 110Z" fill="url(#fin)" />
          <path d="M90 110 L108 130 L84 140 L90 110Z" fill="url(#fin)" />
          {/* หน้าต่าง */}
          <circle
            cx="60"
            cy="90"
            r="18"
            fill="url(#window)"
            stroke="#fff"
            strokeWidth="3"
          />
          <path
            d="M60 88 c-3 -6 -15 -4 -15 5 c0 8 15 16 15 16 c0 0 15 -8 15 -16 c0 -9 -12 -11 -15 -5Z"
            fill="#ff4fa2"
            opacity="0.9"
          />
          {/* เปลวไฟ */}
          <g className="flame">
            <path d="M60 140 C50 158 55 170 60 178 C65 170 70 158 60 140Z" fill="#ffd86f"/>
            <path d="M60 146 C54 158 57 167 60 172 C63 167 66 158 60 146Z" fill="#ffa94d"/>
            <path d="M60 150 C57 158 58 164 60 168 C62 164 63 158 60 150Z" fill="#ff7a3d"/>
          </g>
        </svg>
      </div>

      {/* Toast เมื่อถึง 2024 */}
      {checkpoint2024 && !reached && (
        <div className="toast checkpoint">
          <span>🎯 ผ่านปี 2024 แล้ว!</span>
        </div>
      )}

      {/* Modal เมื่อถึง 2025 */}
      {reached && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>ยินดีเข้าสู่วันครบรอบ 💞</h3>
            <p>เรามาถึงจุดหมายปี 2025 แล้ว — เริ่มต้นช่วงเวลาพิเศษกันต่อเลย</p>
            <button className="btn" onClick={() => nav("/anniversary-start")}>
              ไปต่อ → Anniversary Start
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
