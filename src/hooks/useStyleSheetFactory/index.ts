import { useTheme } from 'hooks/useTheme';
import { StyleSheet } from 'react-native';

export const useStyleSheetFactory = (callback: Function) => {
  const theme = useTheme();
  return StyleSheet.create(callback(theme));
};

export default useStyleSheetFactory;
