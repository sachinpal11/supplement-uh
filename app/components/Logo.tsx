import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  showText = false,
}) => {
  const dimensionsMap = {
    sm: { height: 44, width: 44 },
    md: { height: 68, width: 68 },
    lg: { height: 96, width: 96 },
    xl: { height: 120, width: 120 },
  };

  const { height, width } = dimensionsMap[size];

  return (
    <div
      className={`flex items-center justify-center select-none filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] ${className}`}
    >
      <div className="relative flex-shrink-0" style={{ height: `${height}px`, width: `${width}px` }}>
        <Image
          src="/united-logo.webp"
          alt="United Hormone Shield Logo"
          fill
          priority
          sizes="(max-width: 768px) 50px, 80px"
          className="object-contain hover:scale-105 transition-transform duration-200"
        />
      </div>

      {showText && (
        <div className="flex flex-col justify-center leading-none tracking-wider">
          <span className="font-bebas text-xl md:text-2xl font-bold tracking-[2.5px] text-[#F0EDE8]">
            UNITED
          </span>
          <span className="text-[10px] md:text-[11px] font-semibold tracking-[3px] text-[#C8B84D] uppercase">
            HORMONE
          </span>
        </div>
      )}
    </div>
  );
};

