// src/components/BigHeart.jsx
import React from "react";

/**
 * หัวใจใหญ่พื้นหลัง + เต้นเบา ๆ + เงาวิบวับ
 * size: (เช่น "72vmin" / "640px")
 * tint: เฉดสีชมพูหลัก (hex)
 */
export default function BigHeart({ size = "72vmin", tint = "#ff6fae" }) {
  return (
    <div className="big-heart" style={{ "--heart-size": size, "--heart-tint": tint }}>
      <div className="heart-shape" />
      <div className="heart-shine" />
    </div>
  );
}
