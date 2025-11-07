import React from "react";

const HEARTS = 18; // จำนวนหัวใจ
export default function AnimatedHearts({ density = HEARTS, speed = 12, opacity = 0.18 }) {
  const items = Array.from({ length: density });
  return (
    <div className="hearts-layer" aria-hidden>
      {items.map((_, i) => {
        const left = Math.random() * 100;
        const size = 10 + Math.random() * 22;    // px
        const delay = Math.random() * speed;      // s
        const dur = speed + Math.random() * speed;// s
        const rot = (Math.random() * 40 - 20);    // deg
        return (
          <span
            key={i}
            className="heart"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
              opacity,
              rotate: `${rot}deg`
            }}
          />
        );
      })}
    </div>
  );
}
