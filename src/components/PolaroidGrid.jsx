export default function PolaroidGrid({ images=[] }) {
  return (
    <div className="polaroids">
      {images.map((src,i)=>(
        <figure key={i} className="polaroid" style={{ rotate: `${(i%5-2)*3}deg` }}>
          <img src={src} alt={`memory-${i}`} />
        </figure>
      ))}
    </div>
  );
}
