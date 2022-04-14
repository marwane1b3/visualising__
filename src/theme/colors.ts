import { DEFAULT_THEME } from 'theme';

const colors = (theme: string = DEFAULT_THEME) => ({
  // 	Primary
  primary: {
    light: '#a6d4fa',
    main: '#90caf9',
    dark: '#648dae',
  }[theme],

  // Secondary
  secondary: {
    light: '#f6a5c0',
    main: '#f48fb1',
    dark: '#aa647b',
  }[theme],

  // Error
  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
  }[theme],

  // Warning
  warning: {
    light: '#ffb74d',
    main: '#ff9800',
    dark: '#f57c00',
  }[theme],

  // Info
  info: {
    light: '#64b5f6',
    main: '#2196f3',
    dark: '#1976d2',
  }[theme],

  // Success
  success: {
    light: '#81c784',
    main: '#4caf50',
    dark: '#388e3c',
  }[theme],

  // Text Color
  text: {
    light: '#202020',
    main: '#4caf50',
    dark: '#f0f6fc',
  }[theme],

  // Background
  background: {
    light: '#f0f6fc',
    main: '#4caf50',
    dark: '#323232',
  }[theme],

  contrast: {
    light: '#323232',
    main: '#4caf50',
    dark: '#f0f6fc',
  }[theme],
});

/**
 * https://material-ui.com/customization/palette/
 */
export { colors };
