import usePersistor from 'hooks/userPersistor';
import React, { ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useDispatch } from 'react-redux';
import { DEFAULT_THEME } from 'theme';
import { changeThemeAction } from './actions';

import reducer, { initialState } from './reducer';
export type IThemeProviderProps = {
  children?: ReactNode;
};

const key = 'themeProvider';

const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  // TODO: useReducer and move persistance to settings
  /********************** */
  // useEffect(() => {
  //   /* When component is first loaded, dispatch an action to store the value on the Redux state */
  //   dispatch({
  //     type: CHANGE_THEME,
  //     payload: Appearance.getColorScheme() === 'dark' ? DarkTheme : DefaultTheme
  //   });
  //   Appearance.addChangeListener(onThemeChange);

  //   return () => Appearance.removeChangeListener(onThemeChange);
  // }, []);
  // /* Dispatch an action when theme is changed */
  // const onThemeChange = ({ colorScheme }) => { // Receive the colorScheme property
  //   dispatch({
  //     type: CHANGE_THEME,
  //     payload: colorScheme === 'dark' ? DarkTheme : DefaultTheme
  //   });
  // }
  /********************** */

  const { loadPersistedStore } = usePersistor({ key, reducer, initialState });
  const dispatch = useDispatch();
  // const colorScheme = useColorScheme();

  useEffect(() => {
    (async () => {
      try {
        const data = await loadPersistedStore();
        // || { theme: colorScheme };
        data?.theme && dispatch(changeThemeAction(data?.theme));
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  return <>{children}</>;
};

export { ThemeProvider };
export default ThemeProvider;
