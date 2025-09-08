import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-9 h-9 pointer-events-none z-[9999]"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        backgroundImage:
          "url('https://img.icons8.com/?size=100&id=7172&format=png&color=FFFFFF')",
        backgroundSize: "cover",
      }}
    />
  );
}
