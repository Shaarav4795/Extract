interface Rgb {
  r: number;
  g: number;
  b: number;
}

interface Hsl {
  h: number;
  s: number;
  l: number;
}

interface Hsv {
  h: number;
  s: number;
  v: number;
}

interface Cmyk {
  c: number;
  m: number;
  y: number;
  k: number;
}

export type ColourFormatId = "hex" | "rgb" | "hsl" | "hsv" | "cmyk";

export const COLOUR_FORMATS: ReadonlyArray<{ id: ColourFormatId; label: string }> = [
  { id: "hex", label: "Hex" },
  { id: "rgb", label: "RGB" },
  { id: "hsl", label: "HSL" },
  { id: "hsv", label: "HSV" },
  { id: "cmyk", label: "CMYK" },
];

function parseHex(input: string): Rgb | null {
  const cleaned = input.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(cleaned)) return null;

  if (cleaned.length === 3) {
    const [r, g, b] = [...cleaned].map((c) => parseInt(c + c, 16));
    return { r, g, b };
  }

  return {
    r: parseInt(cleaned.slice(0, 2), 16),
    g: parseInt(cleaned.slice(2, 4), 16),
    b: parseInt(cleaned.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }: Rgb): string {
  const to = (n: number) => n.toString(16).padStart(2, "0").toUpperCase();
  return `#${to(r)}${to(g)}${to(b)}`;
}

function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
    }
    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function rgbToHsv({ r, g, b }: Rgb): Hsv {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    switch (max) {
      case rn:
        h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
        break;
      case gn:
        h = ((bn - rn) / d + 2) * 60;
        break;
      default:
        h = ((rn - gn) / d + 4) * 60;
    }
  }

  const s = max === 0 ? 0 : (d / max) * 100;
  return { h: Math.round(h), s: Math.round(s), v: Math.round(max * 100) };
}

function rgbToCmyk({ r, g, b }: Rgb): Cmyk {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);

  if (k >= 1) return { c: 0, m: 0, y: 0, k: 100 };

  const c = (1 - rn - k) / (1 - k);
  const m = (1 - gn - k) / (1 - k);
  const y = (1 - bn - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

export function formatColour(hex: string, format: ColourFormatId): string {
  const rgb = parseHex(hex);
  if (!rgb) return hex;

  switch (format) {
    case "hex":
      return rgbToHex(rgb);
    case "rgb": {
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }
    case "hsl": {
      const { h, s, l } = rgbToHsl(rgb);
      return `hsl(${h}, ${s}%, ${l}%)`;
    }
    case "hsv": {
      const { h, s, v } = rgbToHsv(rgb);
      return `hsv(${h}, ${s}%, ${v}%)`;
    }
    case "cmyk": {
      const { c, m, y, k } = rgbToCmyk(rgb);
      return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
    }
  }
}

function isDark({ r, g, b }: Rgb): boolean {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 140;
}

export function getTextColour(hex: string): string {
  const rgb = parseHex(hex);
  return rgb && isDark(rgb) ? "#ffffff" : "#000000";
}
