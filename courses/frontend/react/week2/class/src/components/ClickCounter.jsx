import { useState } from "react";

export default function ClickCounter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((prev) => prev + 1);
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Click me
      </button>
      <p>Count: {count}</p>
    </div>
  );
}
