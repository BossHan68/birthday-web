import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedHearts from "../components/AnimatedHearts";

/**
 * LoveMission – ภารกิจยานอวกาศความรักฉบับใหม่
 * เส้นทางแห่งรัก: 2023 (เริ่มต้น) → 2024 → 2025 → 2026 (ปีปัจจุบัน & ปลายทางความรักตลอดไป)
 */
export default function LoveMission() {
  const nav = useNavigate();
  const [stage, setStage] = useState(2023); // 2023, 2024, 2025, 2026
  const [reached, setReached] = useState(false);

  useEffect(() => {
    // เดินทางผ่านปี 2024
    const t1 = setTimeout(() => {
      setStage(2024);
    }, 2800);

    // เดินทางผ่านปี 2025
    const t2 = setTimeout(() => {
      setStage(2025);
    }, 5800);

    // เดินทางถึงปี 2026
    const t3 = setTimeout(() => {
      setStage(2026);
    }, 9000);

    // เปิดกล่องข้อความเฉลิมฉลอง
    const t4 = setTimeout(() => {
      setReached(true);
    }, 10500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleSkip = () => {
    setStage(2026);
    setReached(true);
  };

  const handleReplay = () => {
    setReached(false);
    setStage(2023);
    setTimeout(() => {
      setStage(2024);
    }, 2800);
    setTimeout(() => {
      setStage(2025);
    }, 5800);
    setTimeout(() => {
      setStage(2026);
    }, 9000);
    setTimeout(() => {
      setReached(true);
    }, 10500);
  };

  return (
    <div className="mission-stage version-2026">
      <AnimatedHearts density={12} speed={20} opacity={0.18} />

      {/* แถบ Mission HUD ด้านบน */}
      <div className="mission-hud">
        <div className="hud-title">
          <span className="hud-icon">🚀</span>
          <span>LOVE MISSION: <strong>2023 → 2026</strong></span>
        </div>
        <div className="hud-progress-bar">
          <div
            className="hud-progress-fill"
            style={{
              width:
                stage === 2023
                  ? "20%"
                  : stage === 2024
                  ? "50%"
                  : stage === 2025
                  ? "75%"
                  : "100%",
            }}
          />
        </div>
        {!reached && (
          <button type="button" className="hud-skip-btn" onClick={handleSkip}>
            ข้าม ⏩
          </button>
        )}
      </div>

      {/* บรรยากาศอวกาศ + ดวงดาว */}
      <div className="space">
        <div className="stars" />
        <div className="stars slower" />
      </div>

      {/* เส้นวงโคจรเชื่อม 2023 -> 2024 -> 2025 -> 2026 */}
      <svg className="mission-orbit-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="orbitGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffb3d9" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#ff70b8" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#ff3385" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff1493" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d="M 120 880 Q 280 620 400 520 T 680 340 T 880 120"
          fill="none"
          stroke="url(#orbitGrad)"
          strokeWidth="3"
          strokeDasharray="8 8"
          className="orbit-path"
        />
      </svg>

      {/* จุดเช็กพอยต์ 2023 */}
      <div className={`milestone y2023-new ${stage >= 2023 ? "active" : ""}`}>
        <div className="milestone-badge">
          <span className="m-year">2023</span>
          <span className="m-desc">จุดเริ่มต้น 🌱</span>
        </div>
        <div className="ping" />
      </div>

      {/* จุดเช็กพอยต์ 2024 */}
      <div className={`milestone y2024-new ${stage >= 2024 ? "active" : ""}`}>
        <div className="milestone-badge">
          <span className="m-year">2024</span>
          <span className="m-desc">เคียงข้างกัน 💫</span>
        </div>
        <div className={`ping ${stage >= 2024 ? "strong" : ""}`} />
      </div>

      {/* จุดเช็กพอยต์ 2025 */}
      <div className={`milestone y2025-new ${stage >= 2025 ? "active" : ""}`}>
        <div className="milestone-badge">
          <span className="m-year">2025</span>
          <span className="m-desc">ความผูกพัน 🌸</span>
        </div>
        <div className={`ping ${stage >= 2025 ? "strong" : ""}`} />
      </div>

      {/* จุดปลายทาง 2026 (Heart Planet) */}
      <div className={`milestone y2026-new ${stage >= 2026 ? "active target" : "target"}`}>
        <div className="flag-2026">
          <span className="cloth-2026">2026 ✨</span>
        </div>
        <div className="ping strong" />
      </div>

      {/* ดาวเคราะห์หัวใจ (Heart Planet 2026) */}
      <div className="heart-planet-2026" aria-hidden>
        <div className="glow" />
        <div className="core" />
        <div className="planet-label">Destination: Forever 💖</div>
      </div>

      {/* 🚀 ยานอวกาศออกบินผ่านเส้นทางสู่ 2026 */}
      <div className="rocket-wrap path-2026">
        <svg
          className="rocket"
          viewBox="0 0 120 180"
          aria-label="love-rocket"
        >
          <defs>
            <linearGradient id="rocketBody" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#ffe6f2" />
              <stop offset="100%" stopColor="#ff66b2" />
            </linearGradient>
            <linearGradient id="rocketFin" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#ff3385" />
              <stop offset="100%" stopColor="#ff80bf" />
            </linearGradient>
            <radialGradient id="rocketWindow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#d4eeff" />
              <stop offset="100%" stopColor="#66b3ff" />
            </radialGradient>
          </defs>

          {/* ลำตัวยาน */}
          <path
            d="M60 5 C82 35 92 72 92 112 L60 142 L28 112 C28 72 38 35 60 5Z"
            fill="url(#rocketBody)"
            stroke="#ff4d94"
            strokeWidth="2.5"
          />
          {/* ปีกข้าง */}
          <path d="M28 112 L10 134 L34 144 L28 112Z" fill="url(#rocketFin)" />
          <path d="M92 112 L110 134 L86 144 L92 112Z" fill="url(#rocketFin)" />
          {/* กระจกหน้าต่างยาน */}
          <circle
            cx="60"
            cy="90"
            r="19"
            fill="url(#rocketWindow)"
            stroke="#fff"
            strokeWidth="3"
          />
          {/* หัวใจดวงน้อยในหน้าต่าง */}
          <path
            d="M60 88 c-3 -6 -15 -4 -15 5 c0 8 15 16 15 16 c0 0 15 -8 15 -16 c0 -9 -12 -11 -15 -5Z"
            fill="#ff1493"
            opacity="0.95"
          />
          {/* เปลวไฟเร่งความเร็ว */}
          <g className="flame">
            <path d="M60 142 C48 162 54 176 60 186 C66 176 72 162 60 142Z" fill="#ffe066" />
            <path d="M60 148 C52 162 56 172 60 178 C64 172 68 162 60 148Z" fill="#ff922b" />
            <path d="M60 152 C56 162 57 168 60 173 C63 168 64 162 60 152Z" fill="#ff4d4d" />
          </g>
        </svg>
      </div>

      {/* Modal ปลายทางเมื่อถึงปี 2026 */}
      {reached && (
        <div className="modal-backdrop">
          <div className="modal-card mission-card-2026">
            <div className="badge-accomplished">✨ MISSION ACCOMPLISHED ✨</div>
            <h3>ยินดีต้อนรับสู่ปี 2026 💞</h3>
            <div className="mission-timeline-chips">
              <span>2023 🌱</span>
              <span className="arrow">→</span>
              <span>2024 💫</span>
              <span className="arrow">→</span>
              <span>2025 🌸</span>
              <span className="arrow">→</span>
              <span className="highlight">2026 💖</span>
              <span className="arrow">→</span>
              <span className="forever">Forever ♡</span>
            </div>
            <p className="mission-text-desc">
              เดินทางผ่านทุกเรื่องราวด้วยกันมาจนครบ <strong>3 ปีบริบูรณ์</strong> แล้วนะ<br />
              ขอบคุณสำหรับความรัก ความอบอุ่น และรอยยิ้มที่มีให้กันเสมอมา<br />
              พร้อมก้าวเข้าสู่ช่วงเวลาพิเศษของวันครบรอบหรือยังนะคนเก่ง 🤍
            </p>

            <div className="mission-actions">
              <button
                type="button"
                className="btn btn-replay"
                onClick={handleReplay}
                title="ดูยานบินใหม่อีกครั้ง"
              >
                🔄 ดูอีกรอบ
              </button>
              <button
                type="button"
                className="btn btn-celebrate"
                onClick={() => nav("/anniversary-start")}
              >
                ไปต่อ → Anniversary Start 🎀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
