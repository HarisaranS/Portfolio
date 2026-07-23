import { useState, useEffect, useCallback } from 'react';

export function useDecryptText(targetText: string, speed = 40, revealDelay = 2) {
  const [displayText, setDisplayText] = useState(targetText);
  const chars = '01X█▓▒░<>!#$@%&?[]{}*+_';

  const trigger = useCallback(() => {
    let iteration = 0;
    const maxIterations = targetText.length * revealDelay;
    
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / revealDelay) {
              return targetText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(targetText);
      }
      iteration++;
    }, speed);

    return () => clearInterval(interval);
  }, [targetText, speed, revealDelay]);

  useEffect(() => {
    const cleanup = trigger();
    return cleanup;
  }, [trigger]);

  return { displayText, trigger };
}
