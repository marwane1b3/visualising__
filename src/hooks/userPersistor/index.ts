import useThrottle from 'hooks/useThrottle';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Reducer, AnyAction } from 'redux';
import { useInjectReducer } from 'redux-injectors';

import { loadState, saveState } from 'utils/localStorage';

interface IusePersistorProps {
  reducer?: Reducer<any, AnyAction>;
  key: string;
  initialState: object;
  delay?: number;
  blacklist?: Array<string>;
  whiteList?: Array<string>;
}

const usePersistor = (props: IusePersistorProps) => {
  const {
    key,
    reducer,
    initialState,
    delay = 0,
    whiteList = [],
    blacklist = [],
  } = props;

  reducer && useInjectReducer({ key, reducer });

  const subStoreDomain = useSelector((state: any) => state[key]);

  const throttledCb = useThrottle(() => saveStore(), delay);

  useEffect(() => {
    if (subStoreDomain !== initialState) {
      throttledCb();
    }
  }, [subStoreDomain]);

  const loadStore = async () => {
    try {
      const data = await loadState(key);
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const saveStore = () => {
    let dataToStore = !!whiteList?.length
      ? whiteList?.reduce((acc, item) => {
          return { ...acc, [item]: subStoreDomain[item] };
        }, {})
      : subStoreDomain;

    type mObjectT = {
      [key: string]: any;
    };

    dataToStore = blacklist.length
      ? Object.keys(dataToStore)?.reduce((object: mObjectT, key) => {
          if (!blacklist.includes(key)) {
            object[key] = dataToStore[key];
          }
          return object;
        }, {})
      : dataToStore;

    // type objectArg = {
    //   [key: string]: any;
    // };

    // dataToStore = Object.keys(dataToStore)?.reduce((object: objectArg, key) => {
    //   if (!blacklist.includes(key)) {
    //     object[key] = dataToStore[key];
    //   }
    //   return object;
    // }, {});

    saveState(key, dataToStore);
  };

  return { loadPersistedStore: loadStore };
};

export default usePersistor;
