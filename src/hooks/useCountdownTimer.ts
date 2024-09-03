"use client";

import { useEffect } from "react";

type Timer = {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  getTime: number;
  isEnded: boolean;
};

let time: number = 0;
function setTime(callback: (prev: number) => number) {
  time = callback(time);
}

export default function useCountdownTimer(initialTime: number): Timer {
  useEffect(() => {
    setTime(() => initialTime);
    const timer = setInterval(() => {
      setTime((prev: number) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return {
    seconds: time % 60,
    minutes: Math.floor((time / 60) % 60),
    hours: Math.floor((time / 3600) % 24),
    days: Math.floor(time / 86400),
    getTime: time,
    isEnded: time <= 0,
  };
}
