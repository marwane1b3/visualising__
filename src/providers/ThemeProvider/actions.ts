/**
 * ThemeProvider actions
 *
 */

import { CHANGE_THEME } from './constants';

export function changeThemeAction(theme?: string) {
  return {
    type: CHANGE_THEME,
    theme,
  };
}
