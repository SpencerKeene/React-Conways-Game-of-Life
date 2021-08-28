import { useEffect } from "react";

const useAnimationFrame = (callback) => {
  useEffect(() => {
    const frame = requestAnimationFrame(callback);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [callback]);
};

export default useAnimationFrame;
