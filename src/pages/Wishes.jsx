import { useNavigate } from "react-router-dom";
import Typing from "../components/Typing";

export default function Wishes(){
  const nav = useNavigate();
  return (
    <div className="center">
      <div className="wish-card">
        <h2>Happy Birthday nah sayang💖</h2>
        <Typing
          lines={[
            "ขอให้วันนี้เต็มไปด้วยรอยยิ้มและความสุข",
            "ขอบคุณที่เข้ามาเติมไฟและความอบอุ่นให้กันเสมอ",
            "จะอยู่ข้าง ๆ ในทุกวันดี ๆ และวันที่เหนื่อยนะ",
            "รักที่สุดในโลก 🎂✨",
          ]}
          speed={100}
          sound
          onDone={()=>document.getElementById("continueBtn")?.classList.remove("hidden")}
        />
        <button id="continueBtn" className="btn hidden" onClick={()=>nav("/love-mission")}>
          Continue →
        </button>
      </div>
      <div className="floating-hearts" aria-hidden />
    </div>
  );
}
