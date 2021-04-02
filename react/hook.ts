import { useState, useRef, useEffect, useCallback } from 'react';

export function useMounted(fn: (...args: any[]) => any) {
  const mounting = useRef(true);
  useEffect(() => {
    if (mounting.current) {
      fn();
      mounting.current = false;
    }
  });
}

export function useWillMount(fn: (...args: any[]) => any) {
  const willMount = useRef(true);
  if (willMount.current) {
    fn();
  }
  willMount.current = false;
}

export function useWillUnMount(fn: (...args: any[]) => any) {
  useEffect(() => {
    return fn;
  });
}

export function useRefCallback<T extends (...args: any[]) => any>(callback: T) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  return useCallback((...args: any[]) => callbackRef.current(...args), []) as T;
}

export function useMergeState<T>(initialValue: T) {
  const [state, setState] = useState(initialValue);
  let setMergeState = setState;
  if (typeof initialValue === 'object') {
    setMergeState = (newState: T) => {
      setState({
        ...state,
        ...newState,
      });
    };
  }
  return [state, setMergeState];
}

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function useStorageState<T>(
  initialValue: T,
  key: string,
  type: 'local' | 'session'
) {
  const storage = type === 'local' ? localStorage : sessionStorage;

  const [state, setState] = useState<T>(
    storage[key] ? JSON.parse(storage[key]).value : initialValue
  );

  const setStorageItem = useRefCallback((item: T) => {
    const type = typeof item;
    if (type === 'function' || type === 'symbol') {
      throw Error('storage can only cache basic type');
    }
    return JSON.stringify({ value: item, timeStamp: new Date().getTime() });
  });

  useEffect(() => {
    storage[key] = setStorageItem(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return [state, setState];
}
