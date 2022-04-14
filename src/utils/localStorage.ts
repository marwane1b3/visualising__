import AsyncStorage from '@react-native-community/async-storage';

export const loadState = async (key: string) => {
  try {
    const serializedState = await AsyncStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('loadStorage error = ', e);
    return undefined;
  }
};

export const saveState = async (key: string, state: object) => {
  try {
    const serializedState = JSON.stringify(state);
    if (serializedState) {
      await AsyncStorage.setItem(key, serializedState);
    }
  } catch (e) {
    console.error('saveState error = ', e);
  }
};
