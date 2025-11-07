import React, { useEffect, useRef, useState } from "react";

export default function Typing({ lines = [], speed = 45, sound = true, onDone }) {
  const [output, setOutput] = useState(lines.map(()=>"" ));
  const idxRef = useRef({ line:0, col:0 });
  const audioRef = useRef(null);

  useEffect(() => {
    if (sound) {
      audioRef.current = new Audio("/audio/keystroke.mp3"); // ใส่ไฟล์ใน public/audio
      audioRef.current.volume = 0.4;
    }
  }, [sound]);

  useEffect(() => {
    const tick = () => {
      const { line, col } = idxRef.current;
      if (line >= lines.length) {
        onDone && onDone();
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
          // เล่นเสียงแบบนุ่ม ๆ ทุกตัวอักษร
          try { audioRef.current.currentTime = 0; audioRef.current.play(); } catch {;}
        }
        schedule();
      } else {
        idxRef.current = { line: line + 1, col: 0 };
        schedule(400); // เว้นจังหวะขึ้นบรรทัด
      }
    };
    const schedule = (extra=0) => {
      timerRef.current = setTimeout(tick, speed + extra * 0.0);
    };
    schedule();
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line
  }, []);

  const timerRef = useRef(null);

  return (
    <div className="typing">
      {output.map((t,i)=>(
        <p key={i} className="typing-line">
          {t}{i===output.length-1 && <span className="caret" />}
        </p>
      ))}
    </div>
  );
}
