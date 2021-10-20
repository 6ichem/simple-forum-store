import React from "react";

export default function pill({ text, className, style }) {
  return (
    <div>
      <span
        className={`inline-block rounded-full px-2 py-0.5 text-xs ${className}`}
        style={style}
      >
        {text}
      </span>
    </div>
  );
}
