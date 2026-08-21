import React from "react";

export const GridOverlay: React.FC = () => {
  return (
    <div
      className="fixed inset-0 z-[3] pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Vertical architectural grid lines */}
      {[12, 28, 45, 62, 78, 92].map((x) => (
        <div
          key={`v-${x}`}
          className="absolute top-0 bottom-0 w-px bg-white/[0.06]"
          style={{ left: `${x}%` }}
        />
      ))}

      {/* Horizontal architectural grid lines */}
      {[35, 68].map((y) => (
        <div
          key={`h-${y}`}
          className="absolute left-0 right-0 h-px bg-white/[0.06]"
          style={{ top: `${y}%` }}
        />
      ))}
    </div>
  );
};
