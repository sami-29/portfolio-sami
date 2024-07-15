import { Speed } from "./types";

export interface AnimatorHandlers {
  onVisit: (id: number) => void;
  onPath: (id: number) => void;
  onDone: () => void;
  onStop?: () => void;
}

interface AnimatorControls {
  play: (visitedOrder: number[], pathOrder: number[]) => Promise<void>;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setSpeed: (speed: Speed) => void;
}

const getDelayMs = (speed: Speed): number => {
  switch (speed) {
    case "Slow":
      return 20;
    case "Medium":
      return 5;
    case "Fast":
      return 0.5;
    case "Instant":
      return 0;
    default:
      return 5;
  }
};

export const createAnimator = (
  initialSpeed: Speed,
  handlers: AnimatorHandlers
): AnimatorControls => {
  let isPaused = false;
  let isStopped = false;
  let currentSpeed = initialSpeed;

  const delay = (ms: number): Promise<void> => {
    if (ms === 0) return Promise.resolve();
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const waitWhilePaused = async (): Promise<boolean> => {
    while (isPaused && !isStopped) {
      await delay(50);
    }
    return !isStopped;
  };

  const play = async (
    visitedOrder: number[],
    pathOrder: number[]
  ): Promise<void> => {
    isStopped = false;
    isPaused = false;

    const visitDelay = getDelayMs(currentSpeed);
    const pathDelay = visitDelay * 3;

    if (visitDelay === 0) {
      for (const id of visitedOrder) {
        if (isStopped) return;
        handlers.onVisit(id);
      }
      for (const id of pathOrder) {
        if (isStopped) return;
        handlers.onPath(id);
      }
      handlers.onDone();
      return;
    }

    for (const id of visitedOrder) {
      if (isStopped) return;
      await waitWhilePaused();
      if (isStopped) return;

      handlers.onVisit(id);
      await delay(visitDelay);
    }

    for (const id of pathOrder) {
      if (isStopped) return;
      await waitWhilePaused();
      if (isStopped) return;

      handlers.onPath(id);
      await delay(pathDelay);
    }

    if (!isStopped) {
      handlers.onDone();
    }
  };

  const pause = (): void => {
    isPaused = true;
  };

  const resume = (): void => {
    isPaused = false;
  };

  const stop = (): void => {
    isStopped = true;
    isPaused = false;
    handlers.onStop?.();
  };

  const setSpeed = (speed: Speed): void => {
    currentSpeed = speed;
  };

  return {
    play,
    pause,
    resume,
    stop,
    setSpeed,
  };
};
