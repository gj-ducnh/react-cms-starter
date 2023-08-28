import { useCallback, useEffect, useMemo, useState } from "react";
import { getEnvironment } from "../common/helpers/utils";

export const useLocalStorage = <T = any>(key: string) => {
  if (getEnvironment() === "server") {
    throw Error("useLocalStorage is a client-side only hook.");
  }

  const [localState, setLocalState] = useState<T>();

  useEffect(() => {
    const item: string | undefined | null = window.localStorage.getItem(key);

    try {
      setLocalState(JSON.parse(item!));
    } catch (error) {
      if (item) {
        setLocalState(item as any);
      }
    }
  }, [key]);

  const handleSetState = useCallback(
    (value: Function | any) => {
      try {
        const nextState =
          typeof value === "function" ? value(localState) : value;
        window.localStorage.setItem(key, JSON.stringify(nextState));
        setLocalState(nextState);
        window.dispatchEvent(new Event("local-storage"));
      } catch (e) {
        console.warn(e);
      }
    },
    [key, localState]
  );

  return [localState, handleSetState];
};
