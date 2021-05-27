export function viewport(small: number, large: number) {
  return (window.innerWidth > 1024) ? small : large;
}

export function toInt(s: string | number): number {
  if (typeof s === 'number') return s;

    const chars = s.split("");
    const byteArr = chars.map((c: string) => c.charCodeAt(0));
    return parseInt(byteArr.join(""), 10);
}

export function colors(subArr: number[]) {
  const colors = [
    'rgba(0,0,0, 0.6)',
    'rgba(128,128,128, 0.6)',
    'rgba(128,128,0, 0.6)',
    'rgba(128,0,128, 0.6)',
    'rgba(128,0,0, 0.6)',
    'rgba(0,128,128, 0.6)',
    'rgba(0,128,0, 0.6)',
    'rgba(0,0,128, 0.6)',
    'rgba(255,255,255, 0.6)',
    'rgba(255,255,0, 0.6)',
    'rgba(255,0,255, 0.6)',
    'rgba(255,0,0, 0.6)',
    'rgba(0,255,255, 0.6)',
    'rgba(0,255,0, 0.6)',
    'rgba(0,0,255, 0.6)',
    'rgba(255,255,128, 0.6)',
    'rgba(255,128,255, 0.6)',
    'rgba(255,128,128, 0.6)',
    'rgba(128,255,255, 0.6)',
    'rgba(128,255,128, 0.6)',
    'rgba(128,128,255, 0.6)',
    'rgba(128,0,255, 0.6)',
    'rgba(0,128,255, 0.6)',
    'rgba(255,128,0, 0.6)',
    'rgba(64,64,64, 0.6)',
    'rgba(192,192,192, 0.6)',
    'rgba(192,192,64, 0.6)',
    'rgba(192,64,192, 0.6)',
    'rgba(192,64,64, 0.6)',
    'rgba(64,192,192, 0.6)',
    'rgba(64,192,64, 0.6)',
    'rgba(64,64,192, 0.6)',
    'rgba(255,255,64, 0.6)',
    'rgba(255,64,255, 0.6)',
    'rgba(255,64,64, 0.6)',
    'rgba(64,255,255, 0.6)',
    'rgba(64,255,64, 0.6)',
    'rgba(64,64,255, 0.6)',
    'rgba(255,255,192, 0.6)',
    'rgba(255,192,255, 0.6)',
    'rgba(255,192,192, 0.6)',
    'rgba(192,255,255, 0.6)',
    'rgba(192,255,192, 0.6)',
    'rgba(192,192,255, 0.6)',
    'rgba(192,64,255, 0.6)',
    'rgba(64,192,255, 0.6)',
    'rgba(255,192,64, 0.6)',
    'rgba(64,64,0, 0.6)',
    'rgba(64,0,64, 0.6)',
    'rgba(64,0,0, 0.6)',
    'rgba(0,64,64, 0.6)',
    'rgba(0,64,0, 0.6)',
    'rgba(0,0,64, 0.6)',
    'rgba(192,192,0, 0.6)',
    'rgba(192,0,192, 0.6)',
    'rgba(192,0,0, 0.6)',
    'rgba(0,192,192, 0.6)',
    'rgba(0,192,0, 0.6)',
    'rgba(0,0,192, 0.6)',
    'rgba(64,0,192, 0.6)',
    'rgba(0,64,192, 0.6)',
    'rgba(192,64,0, 0.6)',
    'rgba(102,51,0, 0.6)',
    'rgba(255,229,204, 0.6)',
    'rgba(255,153,153, 0.6)',
  ];
  return subArr.map((i) => colors[colors.length - (i % colors.length) - 1]);
}
