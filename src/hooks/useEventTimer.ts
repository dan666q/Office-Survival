// src/hooks/useEventTimer.ts

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface UseEventTimerProps {
  duration: number
  isRunning?: boolean
  onTimeout?: () => void
}

interface UseEventTimerReturn {
  timeLeft: number
  progress: number
  isExpired: boolean
  reset: (newDuration?: number) => void
  pause: () => void
  resume: () => void
}

export function useEventTimer({
  duration,
  isRunning = true,
  onTimeout,
}: UseEventTimerProps): UseEventTimerReturn {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [paused, setPaused] = useState(!isRunning)

  const timeoutTriggeredRef = useRef(false)

  // =========================
  // RESET TIMER
  // =========================
  const reset = useCallback(
    (newDuration?: number) => {
      timeoutTriggeredRef.current = false
      setTimeLeft(newDuration ?? duration)
    },
    [duration]
  )

  // =========================
  // PAUSE / RESUME
  // =========================
  const pause = useCallback(() => {
    setPaused(true)
  }, [])

  const resume = useCallback(() => {
    setPaused(false)
  }, [])

  // =========================
  // AUTO SYNC isRunning
  // =========================
  useEffect(() => {
    setPaused(!isRunning)
  }, [isRunning])

  // =========================
  // RESET WHEN DURATION CHANGES
  // =========================
  useEffect(() => {
    reset(duration)
  }, [duration, reset])

  // =========================
  // MAIN TIMER LOOP
  // =========================
  useEffect(() => {
    if (paused) return

    if (timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [paused, timeLeft])

  // =========================
  // TIMEOUT CALLBACK
  // =========================
  useEffect(() => {
    if (timeLeft > 0) return

    if (timeoutTriggeredRef.current) return

    timeoutTriggeredRef.current = true

    onTimeout?.()
  }, [timeLeft, onTimeout])

  // =========================
  // PROGRESS %
  // =========================
  const progress = useMemo(() => {
    return (timeLeft / duration) * 100
  }, [timeLeft, duration])

  return {
    timeLeft,
    progress,
    isExpired: timeLeft <= 0,
    reset,
    pause,
    resume,
  }
}