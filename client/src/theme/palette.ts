import { alpha } from '@mui/material/styles';

export interface ColorShades {
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
}

export interface ActionPalette {
  hover: string;
  selected: string;
  disabled: string;
  disabledBackground: string;
  focus: string;
  hoverOpacity: number;
  disabledOpacity: number;
}

export interface BasePalette {
  primary: ColorShades;
  secondary: ColorShades;
  info: ColorShades;
  success: ColorShades;
  warning: ColorShades;
  error: ColorShades;
  grey: { [key: number]: string };
  common: {
    black: string;
    white: string;
  };
  divider: string;
  action: ActionPalette;
}

export interface TextPalette {
  primary: string;
  secondary: string;
  disabled: string;
}

export interface BackgroundPalette {
  paper: string;
  complement: string;
  default: string;
  neutral: string;
}

export interface Palette extends BasePalette {
  mode: string;
  text: TextPalette;
  background: BackgroundPalette;
}

export function palette(): Palette {
  return {
    mode: 'light',
    primary: {
      lighter: '#D0ECFE',
      light: '#73BAFB',
      main: '#1877F2',
      dark: '#0C44AE',
      darker: '#042174',
      contrastText: '#FFFFFF',
    },
    secondary: {
      lighter: '#EFD6FF',
      light: '#C684FF',
      main: '#8E33FF',
      dark: '#5119B7',
      darker: '#27097A',
      contrastText: '#FFFFFF',
    },
    info: {
      lighter: '#CAFDF5',
      light: '#61F3F3',
      main: '#00B8D9',
      dark: '#006C9C',
      darker: '#003768',
      contrastText: '#FFFFFF',
    },
    success: {
      lighter: '#C8FAD6',
      light: '#5BE49B',
      main: '#00A76F',
      dark: '#007867',
      darker: '#004B50',
      contrastText: '#FFFFFF',
    },
    warning: {
      lighter: '#FFF5CC',
      light: '#FFD666',
      main: '#FFAB00',
      dark: '#B76E00',
      darker: '#7A4100',
      contrastText: '#212B36',
    },
    error: {
      lighter: '#FFE9D5',
      light: '#FFAC82',
      main: '#FF5630',
      dark: '#B71D18',
      darker: '#7A0916',
      contrastText: '#FFFFFF',
    },
    grey: {
      0: '#FFFFFF',
      100: '#F9FAFB',
      200: '#F4F6F8',
      300: '#DFE3E8',
      400: '#C4CDD5',
      500: '#919EAB',
      600: '#637381',
      700: '#454F5B',
      800: '#212B36',
      900: '#161C24',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    divider: 'rgba(0, 0, 0, 0.2)',
    action: {
      hover: alpha('#919EAB', 0.08),
      selected: alpha('#919EAB', 0.16),
      disabled: alpha('#919EAB', 0.8),
      disabledBackground: alpha('#919EAB', 0.24),
      focus: alpha('#919EAB', 0.24),
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
    text: {
      primary: '#212B36',
      secondary: '#637381',
      disabled: '#919EAB',
    },
    background: {
      paper: '#FFFFFF',
      complement: '#ACDBF6',
      default: '#F9FAFB',
      neutral: '#F4F6F8',
    },
  };
}
