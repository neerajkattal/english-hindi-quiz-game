import React from "react";

// A rangoli drawn from rings of petals, used once on the home screen as a
// focal point. Purely decorative.
function Ring({ count, distance, rx, ry, fill, offset = 0 }) {
  return Array.from({ length: count }, (_, i) => (
    <ellipse
      key={i}
      cx="0"
      cy={-distance}
      rx={rx}
      ry={ry}
      fill={fill}
      stroke="#1C2140"
      strokeWidth="1.2"
      transform={`rotate(${(i * 360) / count + offset})`}
    />
  ));
}

function Rangoli({ size = 150 }) {
  return (
    <svg className="rangoli" width={size} height={size} viewBox="-75 -75 150 150" aria-hidden="true">
      <Ring count={16} distance={58} rx={6} ry={12} fill="#F7C548" offset={11.25} />
      <Ring count={12} distance={42} rx={8} ry={16} fill="#B23A2B" />
      <Ring count={8} distance={22} rx={7} ry={14} fill="#F29F05" offset={22.5} />
      <circle r="10" fill="#1F6E5C" stroke="#1C2140" strokeWidth="1.5" />
      <circle r="4" fill="#FBF3E4" />
      {Array.from({ length: 24 }, (_, i) => (
        <circle key={i} cx="0" cy="-70" r="2" fill="#1C2140" transform={`rotate(${i * 15})`} />
      ))}
    </svg>
  );
}

export default Rangoli;
