import { useSelector } from 'react-redux';
import { colors as constColors } from 'theme/colors';

export const useTheme = () => {
  const theme = useSelector((store: any) => store?.themeProvider?.theme);

  let color = constColors(theme);

  return { color, selectedTheme: theme };
};

export default useTheme;
