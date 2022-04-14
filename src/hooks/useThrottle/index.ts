import { useCallback, useEffect, useRef } from 'react';
import { throttle } from 'lodash';

export const useThrottle = (callback: Function, delay: number) => {
  const options = { leading: true, trailing: false }; // add custom lodash options
  const cbRef = useRef(callback);
  // use mutable ref to make useCallback/throttle not depend on `callback` dep
  useEffect(() => {
    cbRef.current = callback;
  });
  return useCallback(
    throttle((...args) => cbRef.current(...args), delay, options),
    [delay],
  );
};
export default useThrottle;
