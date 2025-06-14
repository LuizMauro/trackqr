function hexToRgb(hex: string): [number, number, number] {
  if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    throw new Error(
      `Formato hexadecimal inválido: ${hex}. Deve ser #RRGGBB ou #RGB.`
    );
  }

  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function getRelativeLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((val) => {
    const sRGB = val / 255; // Normalize para 0-1
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastRatio(color1Hex: string, color2Hex: string): number {
  const rgb1 = hexToRgb(color1Hex);
  const rgb2 = hexToRgb(color2Hex);

  const L1 = getRelativeLuminance(rgb1);
  const L2 = getRelativeLuminance(rgb2);

  // L1 deve ser a luminância mais clara, L2 a mais escura
  const brightest = Math.max(L1, L2);
  const darkest = Math.min(L1, L2);

  return (brightest + 0.05) / (darkest + 0.05);
}

export function willQRCodeHaveContrastProblem(
  foregroundColorHex: string,
  backgroundColorHex: string,
  minContrastThreshold: number = 3.0
): boolean {
  const contrastRatio = getContrastRatio(
    foregroundColorHex,
    backgroundColorHex
  );
  console.log(
    `Contraste calculado para ${foregroundColorHex} e ${backgroundColorHex}: ${contrastRatio.toFixed(
      2
    )}:1`
  );
  return contrastRatio < minContrastThreshold;
}
