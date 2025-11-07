import { useEffect, useRef, useState } from "react";

/**
 * Keypad รองรับ 2 โหมด
 * 1) แบบใหม่:   <Keypad expected="1234" length={4} onValid={() => ...} />
 * 2) แบบเดิม:   <Keypad onSubmit={(pin) => ...} />
 */
export default function Keypad({
  expected,                 // (optional) PIN ที่ถูกต้อง
  onValid,                  // (optional) เรียกเมื่อถูก (หรือส่ง pin ให้ถ้าไม่ใช้ expected)
  onSubmit,                 // (optional) โหมดเดิม: จะเรียกส่ง pin ให้เสมอ
  placeholder = "ใส่รหัส",
  length = 4,               // จำนวนหลักที่ต้องการ (ค่าเริ่มต้น 4)
}) {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const errorSfx = useRef(null);

  // เตรียมเสียง (ถ้าเบราว์เซอร์รองรับ)
  useEffect(() => {
    if (typeof Audio !== "undefined") {
      errorSfx.current = new Audio("/audio/error.mp3");
      errorSfx.current.volume = 0.4;
    }
  }, []);

  const press = (d) => {
    if (pin.length >= length) return;
    setPin((p) => p + d);
  };
  const clear = () => setPin("");
  const back  = () => setPin((p) => p.slice(0, -1));

  const playError = () => {
    const a = errorSfx.current;
    if (!a || typeof a.play !== "function") return;
    const p = a.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {}); // เงียบถ้าโดนนโยบาย autoplay บล็อก
    }
  };

  const submit = () => {
    // โหมดเดิม: ส่ง pin ออกไปให้ handler ภายนอก
    if (typeof onSubmit === "function") {
      onSubmit(pin);
      return;
    }

    // ต้องกรอกครบจำนวนก่อน
    if (pin.length !== length) return;

    // มี expected: ตรวจเลย
    if (typeof expected === "string") {
      if (pin === expected) {
        if (typeof onValid === "function") onValid();
      } else {
        setShake(true);
        playError();
        setTimeout(() => setShake(false), 500);
      }
      return;
    }

    // ไม่มี expected แต่มี onValid: ส่ง pin ให้ภายนอก
    if (typeof onValid === "function") {
      onValid(pin);
      return;
    }

    // ไม่ได้ระบุ callback ใด ๆ
    setShake(true);
    playError();
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className={`card ${shake ? "shake" : ""}`}>
      <div className="pin-display">
        <span className="lock">🔒</span>
        <input
          value={"•".repeat(pin.length).padEnd(length, "–")}
          readOnly
          aria-label="PIN"
        />
      </div>
      <div className="hint">{placeholder}</div>
      <div className="grid">
        {[1,2,3,4,5,6,7,8,9].map(n=>(
          <button key={n} className="key" onClick={()=>press(String(n))}>{n}</button>
        ))}
        <button className="key" onClick={clear}>C</button>
        <button className="key" onClick={()=>press("0")}>0</button>
        <button className="key" onClick={back}>⌫</button>
      </div>
      <button className="btn wide" onClick={submit}>Unlock</button>
    </div>
  );
}
