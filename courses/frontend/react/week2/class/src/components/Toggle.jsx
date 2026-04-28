// implement conditional rendering

import { useState } from "react";

export default function Toggle() {
  const [show, setShow] = useState(false);
  function handleClick() {
    setShow(show === true ? false : true);
  }
  return (
    <button className="toggle-button" onClick={handleClick}>
      {" "}
      Toggle button content here :{" "}
      {show ? "👌🏻" : "👎🏻👎🏻👎🏻👎🏻👎🏻👎🏻👎🏻👎🏻"}
    </button>
  );
}

/* const contentList = [
  {
    id: 1,
    title: "Item 1",
    content: "Content 1",
  },
  {
    id: 2,
    title: "Item 2",
    content: "Content 2",
  },
]; */
