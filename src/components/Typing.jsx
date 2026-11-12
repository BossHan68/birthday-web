import React, { useEffect, useRef, useState } from "react";

export default function Typing({
  lines = [],
  speed = 70,
  linePause = 900,
  donePause = 1200,
  sound = true,
  onDone,
}) {
  const [output, setOutput] = useState(lines.map(() => ""));
  const idxRef = useRef({ line: 0, col: 0 });
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (sound) {
      const a = new Audio("/audio/keystroke.mp3");
      a.volume = 0.4;
      a.onerror = () => {
        audioRef.current = null;
      };
      audioRef.current = a;
    }
  }, [sound]);

  useEffect(() => {
    const tick = () => {
      const { line, col } = idxRef.current;
      if (line >= lines.length) {
        if (onDone) {
          timerRef.current = setTimeout(onDone, donePause);
        }
        return;
      }
      const target = lines[line];
      if (col < target.length) {
        setOutput(prev => {
          const copy = [...prev];
          copy[line] = copy[line] + target[col];
          return copy;
        });
        idxRef.current = { line, col: col + 1 };
        if (sound && audioRef.current) {
          try {
            audioRef.current.currentTime = 0;
            const p = audioRef.current.play();
            if (p && typeof p.catch === "function") p.catch(() => {});
          } catch {;}
        }
        schedule(speed);
      } else {
        idxRef.current = { line: line + 1, col: 0 };
        schedule(linePause); // เว้นจังหวะขึ้นบรรทัดให้อ่านทัน
      }
    };

    const schedule = (delay) => {
      timerRef.current = setTimeout(tick, delay);
    };

    schedule(speed);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="typing">
      {output.map((t, i) => (
        <p key={i} className="typing-line">
          {t}
          {i === output.length - 1 && <span className="caret" />}
        </p>
      ))}
    </div>
  );
}
