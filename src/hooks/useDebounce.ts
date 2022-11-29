import React from 'react';
export default function useDebounce(fn: Function, delay: number) {
  const timeoutRef = React.useRef<any>(null);

  function debouncedFn(...args: any) {
    window.clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      fn(...args);
    }, delay);
  }

  return debouncedFn;
}
