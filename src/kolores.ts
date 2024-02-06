// NOTE: remember to add colors to tailwind safelist
export const KOLORES = ['teal-200', 'rose-200', 'amber-300', 'cyan-100', 'green-400'] as const;
export type Color = (typeof KOLORES)[number];
