import useCountdownTimer from "./useCountdownTimer";

type Timer = {
  time: ReturnType<typeof useCountdownTimer>;
  eraOrJourney: number;
  phase: number;
  isEraMinting: boolean;
};

export default function useTimer(): Timer {
  const time = useCountdownTimer(1000 * 60); // 1 minute
  return {
    time,
    eraOrJourney: 0,
    phase: 0,
    isEraMinting: false,
  };
}
