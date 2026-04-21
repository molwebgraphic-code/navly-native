export const colors = {
  ink: '#0E1A17',
  forest: '#143A2E',
  moss: '#2F6B52',
  signal: '#D4F25C',
  bone: '#F4F1EA',
  paper: '#FBFAF6',
  graphite: '#3A4240',
  mist: '#C9CEC9',
  rust: '#B8533A',
  orange: '#E6A96B',
};

export const light = {
  bg: colors.bone,
  card: colors.paper,
  text: colors.ink,
  text2: colors.graphite,
  border: 'rgba(14,26,23,0.12)',
};

export const dark = {
  bg: '#0E1A17',
  card: '#17221f',
  text: colors.bone,
  text2: colors.mist,
  border: 'rgba(244,241,234,0.14)',
};

export function scoreColor(n) {
  if (n === null || n === undefined) return colors.graphite;
  if (n < 65) return colors.rust;
  if (n < 80) return colors.orange;
  return colors.signal;
}

export const fonts = {
  tight: 'Inter_Tight',
  body: 'Inter',
  mono: 'JetBrains_Mono',
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 20,
  xl: 28,
};
