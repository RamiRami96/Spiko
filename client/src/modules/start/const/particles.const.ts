export type Particle = {
  char: string;
  x: number;
  size: number;
  maxOpacity: number;
  duration: number;
  delay: number;
};

export const PARTICLES: Particle[] = [
  { char: "a", x: 0.08, size: 28, maxOpacity: 0.45, duration: 9000,  delay: 0    },
  { char: "n", x: 0.72, size: 20, maxOpacity: 0.38, duration: 7500,  delay: 1200 },
  { char: "g", x: 0.45, size: 16, maxOpacity: 0.32, duration: 11000, delay: 3000 },
  { char: "a", x: 0.88, size: 24, maxOpacity: 0.50, duration: 8000,  delay: 500  },
  { char: "m", x: 0.25, size: 18, maxOpacity: 0.35, duration: 10000, delay: 2200 },
  { char: "A", x: 0.60, size: 14, maxOpacity: 0.30, duration: 12000, delay: 4000 },
  { char: "B", x: 0.15, size: 22, maxOpacity: 0.42, duration: 8500,  delay: 1800 },
  { char: "C", x: 0.80, size: 16, maxOpacity: 0.33, duration: 9500,  delay: 3500 },
  { char: "D", x: 0.38, size: 30, maxOpacity: 0.28, duration: 13000, delay: 600  },
  { char: "E", x: 0.55, size: 12, maxOpacity: 0.40, duration: 7000,  delay: 2800 },
];
