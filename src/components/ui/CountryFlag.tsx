import React from "react";
import { Globe } from "lucide-react";

export type CountryCode = "US" | "CA" | "GB" | "AU" | "PK" | "IN" | "CN" | "AE" | "SA" | "GLOBAL";

interface CountryFlagProps {
  code: CountryCode | string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function CountryFlag({ code, className = "", size = "md" }: CountryFlagProps) {
  const normalized = code.trim().toUpperCase();

  const sizeClasses = {
    sm: "w-4 h-3 rounded-[2px]",
    md: "w-5 h-3.5 rounded-[3px]",
    lg: "w-6 h-4 rounded-[3px]",
  }[size];

  // SVG flags for crisp rendering across all platforms including Windows
  switch (normalized) {
    case "US":
    case "USA":
      return (
        <svg className={`${sizeClasses} shadow-2xs inline-block shrink-0 border border-black/10 ${className}`} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <path fill="#bd3d44" d="M0 0h640v480H0z"/>
          <path stroke="#fff" strokeWidth="37" d="M0 55.5h640M0 129.5h640M0 203.5h640M0 277.5h640M0 351.5h640M0 425.5h640"/>
          <path fill="#192f5d" d="M0 0h256v259H0z"/>
          <circle fill="#fff" cx="25" cy="25" r="8"/>
          <circle fill="#fff" cx="75" cy="25" r="8"/>
          <circle fill="#fff" cx="125" cy="25" r="8"/>
          <circle fill="#fff" cx="175" cy="25" r="8"/>
          <circle fill="#fff" cx="225" cy="25" r="8"/>
          <circle fill="#fff" cx="50" cy="65" r="8"/>
          <circle fill="#fff" cx="100" cy="65" r="8"/>
          <circle fill="#fff" cx="150" cy="65" r="8"/>
          <circle fill="#fff" cx="200" cy="65" r="8"/>
          <circle fill="#fff" cx="25" cy="105" r="8"/>
          <circle fill="#fff" cx="75" cy="105" r="8"/>
          <circle fill="#fff" cx="125" cy="105" r="8"/>
          <circle fill="#fff" cx="175" cy="105" r="8"/>
          <circle fill="#fff" cx="225" cy="105" r="8"/>
          <circle fill="#fff" cx="50" cy="145" r="8"/>
          <circle fill="#fff" cx="100" cy="145" r="8"/>
          <circle fill="#fff" cx="150" cy="145" r="8"/>
          <circle fill="#fff" cx="200" cy="145" r="8"/>
          <circle fill="#fff" cx="25" cy="185" r="8"/>
          <circle fill="#fff" cx="75" cy="185" r="8"/>
          <circle fill="#fff" cx="125" cy="185" r="8"/>
          <circle fill="#fff" cx="175" cy="185" r="8"/>
          <circle fill="#fff" cx="225" cy="185" r="8"/>
          <circle fill="#fff" cx="50" cy="225" r="8"/>
          <circle fill="#fff" cx="100" cy="225" r="8"/>
          <circle fill="#fff" cx="150" cy="225" r="8"/>
          <circle fill="#fff" cx="200" cy="225" r="8"/>
        </svg>
      );

    case "CA":
    case "CAN":
      return (
        <svg className={`${sizeClasses} shadow-2xs inline-block shrink-0 border border-black/10 ${className}`} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ff0000" d="M0 0h160v480H0zm480 0h160v480H480z"/>
          <path fill="#fff" d="M160 0h320v480H160z"/>
          <path fill="#ff0000" d="M320 72l-21 43 14 27-31-8 5 36-32-19 3 37-25-25-13 32 3-36-33 13 19-32-35-5 35-15-18-29 35 11 8-36 24 26 21-30 21 30 24-26 8 36 35-11-18 29 35 15-35 5 19 32-33-13 3 36-13-32-25 25 3-37-32 19 5-36-31 8 14-27z"/>
        </svg>
      );

    case "GB":
    case "UK":
      return (
        <svg className={`${sizeClasses} shadow-2xs inline-block shrink-0 border border-black/10 ${className}`} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <path fill="#012169" d="M0 0h640v480H0z"/>
          <path stroke="#fff" strokeWidth="60" d="M0 0l640 480M640 0L0 480"/>
          <path stroke="#c8102e" strokeWidth="40" d="M0 0l640 480M640 0L0 480"/>
          <path stroke="#fff" strokeWidth="100" d="M320 0v480M0 240h640"/>
          <path stroke="#c8102e" strokeWidth="60" d="M320 0v480M0 240h640"/>
        </svg>
      );

    case "AU":
    case "AUS":
      return (
        <svg className={`${sizeClasses} shadow-2xs inline-block shrink-0 border border-black/10 ${className}`} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <path fill="#00008b" d="M0 0h640v480H0z"/>
          <path fill="#fff" d="M0 0h320v240H0z"/>
          <path stroke="#c8102e" strokeWidth="30" d="M160 0v240M0 120h320"/>
          <path stroke="#fff" strokeWidth="30" d="M0 0l320 240M320 0L0 240"/>
          <circle fill="#fff" cx="480" cy="120" r="16"/>
          <circle fill="#fff" cx="420" cy="300" r="14"/>
          <circle fill="#fff" cx="540" cy="200" r="14"/>
          <circle fill="#fff" cx="500" cy="380" r="14"/>
          <circle fill="#fff" cx="160" cy="360" r="28"/>
        </svg>
      );

    case "PK":
    case "PAK":
      return (
        <svg className={`${sizeClasses} shadow-2xs inline-block shrink-0 border border-black/10 ${className}`} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <rect width="640" height="480" fill="#00401A"/>
          <rect width="160" height="480" fill="#FFFFFF"/>
          <circle cx="410" cy="240" r="110" fill="#FFFFFF"/>
          <circle cx="440" cy="215" r="95" fill="#00401A"/>
          <polygon points="450,150 460,180 490,180 465,200 475,230 450,210 425,230 435,200 410,180 440,180" fill="#FFFFFF"/>
        </svg>
      );

    case "IN":
    case "IND":
      return (
        <svg className={`${sizeClasses} shadow-2xs inline-block shrink-0 border border-black/10 ${className}`} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ff9933" d="M0 0h640v160H0z"/>
          <path fill="#fff" d="M0 160h640v160H0z"/>
          <path fill="#138808" d="M0 320h640v160H0z"/>
          <circle cx="320" cy="240" r="60" fill="none" stroke="#000080" strokeWidth="8"/>
          <circle cx="320" cy="240" r="12" fill="#000080"/>
        </svg>
      );

    case "CN":
    case "CHN":
      return (
        <svg className={`${sizeClasses} shadow-2xs inline-block shrink-0 border border-black/10 ${className}`} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ee1c25" d="M0 0h640v480H0z"/>
          <polygon fill="#ffde00" points="100,60 112,96 150,96 119,118 131,154 100,132 69,154 81,118 50,96 88,96"/>
          <polygon fill="#ffde00" points="200,40 205,55 220,55 208,64 213,79 200,70 187,79 192,64 180,55 195,55"/>
          <polygon fill="#ffde00" points="240,80 245,95 260,95 248,104 253,119 240,110 227,119 232,104 220,95 235,95"/>
          <polygon fill="#ffde00" points="240,140 245,155 260,155 248,164 253,179 240,170 227,179 232,164 220,155 235,155"/>
          <polygon fill="#ffde00" points="200,180 205,195 220,195 208,204 213,219 200,210 187,219 192,204 180,195 195,195"/>
        </svg>
      );

    case "AE":
    case "UAE":
      return (
        <svg className={`${sizeClasses} shadow-2xs inline-block shrink-0 border border-black/10 ${className}`} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <path fill="#00732f" d="M160 0h480v160H160z"/>
          <path fill="#fff" d="M160 160h480v160H160z"/>
          <path fill="#000" d="M160 320h480v160H160z"/>
          <path fill="#ff0000" d="M0 0h200v480H0z"/>
        </svg>
      );

    case "SA":
    case "KSA":
      return (
        <svg className={`${sizeClasses} shadow-2xs inline-block shrink-0 border border-black/10 ${className}`} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
          <rect width="640" height="480" fill="#006C35"/>
          <path d="M160 280h320M200 310l120-20 120 20" stroke="#FFFFFF" strokeWidth="12" fill="none"/>
        </svg>
      );

    default:
      return (
        <span className="inline-flex items-center justify-center p-0.5 font-mono font-bold bg-slate-700 text-slate-200 rounded">
          <Globe className="h-3 w-3 shrink-0" />
        </span>
      );
  }
}
