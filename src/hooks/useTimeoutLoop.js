import { useCallback, useEffect, useRef, useState } from "react";

const useTimeoutLoop = (callback, speed) => {
  const timeoutRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  const update = useCallback(() => {
    callback();
    timeoutRef.current = setTimeout(update, speed);
  }, [callback, speed]);

  const play = () => {
    if (isPlaying) return;
    timeoutRef.current = setTimeout(update, speed);
    setIsPlaying(true);
  };

  const pause = () => {
    if (!isPlaying) return;
    clearTimeout(timeoutRef.current);
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, [update]);

  return { play: play, pause: pause };
};

export default useTimeoutLoop;
