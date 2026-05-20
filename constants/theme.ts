/* Brand: Magic.Pass design tokens
   Sandstone bg · Ink text · Green primary · Clay accent
   fonts: Cabinet Grotesk (display) + Manrope (body)
*/

export const Colors = {
  /* Core brand */
  primary:       '#00D084',   // mp-green — approval / primary CTA
  primaryLight:  '#E6FAF3',   // green tint surface
  primaryDark:   '#00A869',   // green pressed

  /* Semantic */
  success:       '#00D084',
  successLight:  '#E6FAF3',
  error:         '#E03E3E',   // mp-danger — reject only
  errorLight:    'rgba(224,62,62,0.10)',
  warning:       '#C84C31',   // mp-clay — editorial / caution accent
  warningLight:  'rgba(200,76,49,0.10)',

  /* Surfaces */
  background:    '#F9F7F4',   // mp-sandstone — page bg
  card:          '#FFFFFF',
  bone:          '#EBE7E0',   // mp-bone — secondary surfaces
  boneDeep:      '#DED8CC',

  /* Text */
  text:          '#1A1D1C',   // mp-ink
  textSecondary: '#525754',   // mp-slate
  textMuted:     'rgba(82,87,84,0.55)',

  /* Lines */
  border:        'rgba(26,29,28,0.12)',   // mp-hairline
  borderSoft:    'rgba(26,29,28,0.06)',   // mp-hairline-soft

  /* Utility */
  white:         '#FFFFFF',
  black:         '#000000',
  overlay:       'rgba(26,29,28,0.72)',
};

export const Spacing = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
};

export const Radius = {
  sm:   6,
  md:   12,
  lg:   16,
  xl:   24,
  full: 999,
};

export const FontSize = {
  xs:   11,
  sm:   13,
  md:   15,
  lg:   17,
  xl:   20,
  xxl:  24,
  xxxl: 30,
};
