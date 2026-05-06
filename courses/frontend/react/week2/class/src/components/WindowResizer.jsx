import { useState, useEffect } from "react";

function readSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export default function WindowResizer() {
  const [size, setSize] = useState(readSize);

  useEffect(() => {
    function handleResize() {
      setSize(readSize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <p>
      Window size: {size.width} × {size.height}px
    </p>
  );
}
