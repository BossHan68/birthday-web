import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedHearts from "../components/AnimatedHearts";

const GRID_SIZE = 2; // 2x2 = 4 ชิ้น
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;

// สร้างชิ้นส่วนเริ่มต้นตามลำดับที่ถูกต้อง 0..3
function createInitialTiles() {
  return Array.from({ length: TOTAL_TILES }, (_, index) => ({
    id: index,
    row: Math.floor(index / GRID_SIZE),
    col: index % GRID_SIZE,
  }));
}

// สุ่มสลับตำแหน่ง (รับรองว่าตอนเริ่มต้องยังไม่ชนะ)
function shuffleTiles(tiles) {
  let shuffled = [...tiles];
  let isSolved = true;
  while (isSolved) {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // ตรวจสอบว่าไม่บังเอิญตรงกันทุกช่อง
    isSolved = shuffled.every((t, idx) => t.id === idx);
  }
  return shuffled;
}

export default function Memories() {
  const nav = useNavigate();
  const [tiles, setTiles] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const touchStartRef = useRef(null);

  // เริ่มต้นเกม
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const initial = createInitialTiles();
    setTiles(shuffleTiles(initial));
    setSelectedIdx(null);
    setMoves(0);
    setIsWon(false);
  };

  // เฉลยอัตโนมัติ (ช่วยให้ผ่านด่านได้ทันที)
  const autoSolve = () => {
    const solved = createInitialTiles();
    setTiles(solved);
    setSelectedIdx(null);
    setIsWon(true);
  };

  // ฟังก์ชันสลับตำแหน่งระหว่าง 2 ชิ้น
  const swapTwoTiles = (idx1, idx2) => {
    if (idx1 === idx2 || idx1 < 0 || idx2 < 0 || idx1 >= TOTAL_TILES || idx2 >= TOTAL_TILES) return;
    const nextTiles = [...tiles];
    [nextTiles[idx1], nextTiles[idx2]] = [nextTiles[idx2], nextTiles[idx1]];
    setTiles(nextTiles);
    setSelectedIdx(null);
    setMoves((m) => m + 1);

    const won = nextTiles.every((t, i) => t.id === i);
    if (won) {
      setIsWon(true);
    }
  };

  // จัดการการคลิก/แตะเลือกสลับชิ้นส่วน
  const handleTileClick = (index) => {
    if (isWon) return;

    if (selectedIdx === null) {
      setSelectedIdx(index);
    } else if (selectedIdx === index) {
      setSelectedIdx(null);
    } else {
      swapTwoTiles(selectedIdx, index);
    }
  };

  // รองรับการปัดสไลด์นิ้วบนมือถือ (Touch Swipe)
  const handleTouchStart = (index, e) => {
    if (isWon) return;
    const touch = e.touches[0];
    touchStartRef.current = {
      index,
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current || isWon) return;
    const { index, x, y } = touchStartRef.current;
    touchStartRef.current = null;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - x;
    const dy = touch.clientY - y;
    const minSwipeDistance = 30; // ปัดนิ้วเกิน 30px ถือเป็นการสไลด์

    // ถ้าปัดสั้นมาก ถือเป็นการแตะ ให้ handleTileClick ทำงานแทน
    if (Math.abs(dx) < minSwipeDistance && Math.abs(dy) < minSwipeDistance) {
      return;
    }

    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    let targetIdx = -1;

    if (Math.abs(dx) > Math.abs(dy)) {
      // แนวนอน (ซ้าย / ขวา)
      if (dx > 0 && col < GRID_SIZE - 1) {
        targetIdx = index + 1; // ปัดขวา
      } else if (dx < 0 && col > 0) {
        targetIdx = index - 1; // ปัดซ้าย
      }
    } else {
      // แนวตั้ง (ขึ้น / ลง)
      if (dy > 0 && row < GRID_SIZE - 1) {
        targetIdx = index + GRID_SIZE; // ปัดลง
      } else if (dy < 0 && row > 0) {
        targetIdx = index - GRID_SIZE; // ปัดขึ้น
      }
    }

    if (targetIdx !== -1) {
      swapTwoTiles(index, targetIdx);
    }
  };

  // นับจำนวนชิ้นที่วางตรงตำแหน่งแล้ว
  const correctCount = tiles.filter((t, i) => t.id === i).length;

  return (
    <div className="center memory-game-page">
      <AnimatedHearts density={14} speed={18} opacity={0.15} />

      <div className="wish-card puzzle-card">
        <header className="puzzle-header">
          <h2>🧩 Memory Game Challenge</h2>
          <p className="puzzle-desc">
            ภารกิจต่อภาพความทรงจำของเรา 💞
            <br />
            <span style={{ fontSize: "14px", color: "#666" }}>
              (บนมือถือ: <strong>ปัดสไลด์นิ้ว</strong> ไปทางช่องที่ต้องการ หรือ <strong>แตะเลือก 2 ชิ้น</strong> เพื่อสลับที่)
            </span>
          </p>
        </header>

        {/* สถานะคะแนน */}
        <div className="puzzle-status">
          <span>จำนวนครั้งที่สลับ: <strong>{moves}</strong></span>
          <span className="dot-sep">•</span>
          <span>
            ถูกต้อง:{" "}
            <strong style={{ color: correctCount === TOTAL_TILES ? "#10b981" : "#D86DA1" }}>
              {correctCount}
            </strong>{" "}
            /{TOTAL_TILES} ชิ้น
          </span>
        </div>

        {/* ปุ่มช่วยเหลือด้านบนกระดาน */}
        <div className="puzzle-controls">
          <button
            type="button"
            className="ctrl-btn"
            onClick={() => setShowPreview(true)}
            title="ดูรูปภาพต้นฉบับ"
          >
            👁️ ดูภาพตัวอย่าง
          </button>
          <button
            type="button"
            className="ctrl-btn"
            onClick={resetGame}
            title="สุ่มสลับตำแหน่งใหม่"
          >
            🔄 สุ่มใหม่
          </button>
          {!isWon && (
            <button
              type="button"
              className="ctrl-btn hint"
              onClick={autoSolve}
              title="ช่วยแก้ภาพอัตโนมัติ"
            >
              🪄 ช่วยเฉลย
            </button>
          )}
        </div>

        {/* กระดานภาพปริศนา 2x2 */}
        <div className={`puzzle-board ${isWon ? "solved" : ""}`}>
          {tiles.map((tile, i) => {
            const isSelected = selectedIdx === i;
            const isCorrect = tile.id === i;
            return (
              <div
                key={i}
                className={`puzzle-tile ${isSelected ? "selected" : ""} ${isCorrect ? "correct" : ""}`}
                onClick={() => handleTileClick(i)}
                onTouchStart={(e) => handleTouchStart(i, e)}
                onTouchEnd={handleTouchEnd}
                style={{
                  backgroundImage: "url('/images/game.jpg')",
                  backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                  backgroundPosition: `${(tile.col / (GRID_SIZE - 1)) * 100}% ${(tile.row / (GRID_SIZE - 1)) * 100}%`,
                }}
              >
                {/* สัญลักษณ์เมื่อวางถูกต้อง */}
                {!isWon && isCorrect && (
                  <span className="tile-badge" title="ถูกต้องแล้ว">✓</span>
                )}
              </div>
            );
          })}
        </div>

        {/* ข้อความและปุ่มเมื่อผ่านด่าน */}
        {isWon && (
          <div className="win-banner">
            <div className="win-title">🎉 ผ่านด่านเรียบร้อยแล้วคนเก่ง! 🎉</div>
            <p className="win-text">
              ความทรงจำนี้สมบูรณ์แบบแล้ว พร้อมไปต่อช่วงเวลาสุดท้ายด้วยกันหรือยัง 🤍
            </p>
            <button
              type="button"
              className="btn btn-celebrate"
              onClick={() => nav("/thank-you")}
            >
              ไปด่านถัดไป → Thank You 🌷
            </button>
          </div>
        )}

        {/* Lightbox ดูรูปตัวอย่างต้นฉบับ */}
        {showPreview && (
          <div className="lightbox" onClick={() => setShowPreview(false)}>
            <div className="preview-container" onClick={(e) => e.stopPropagation()}>
              <div className="preview-header">
                <span>📸 ภาพตัวอย่างที่ต้องต่อให้ตรง</span>
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setShowPreview(false)}
                >
                  ✕
                </button>
              </div>
              <img
                src="/images/game.jpg"
                alt="Preview game"
                className="preview-img"
              />
              <button
                type="button"
                className="btn"
                style={{ marginTop: 12 }}
                onClick={() => setShowPreview(false)}
              >
                เข้าใจแล้ว ไปลุยต่อ! 💕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
