import { useCallback, useEffect, useState } from 'react'
import { useGameStore } from './store/gameStore'
import { soundManager } from './utils/soundManager'
import { StageHost, StageBackdrop } from './StageHost'
import { hasWebGL } from './ui/hooks'

import StartScreen from './screens/StartScreen'
import ProfessionScreen from './screens/ProfessionScreen'
import GameScreen from './screens/GameScreen'
import DailySummaryScreen from './screens/DailySummaryScreen'
import DayTransitionScreen from './screens/DayTransitionScreen'
import GameOverScreen from './screens/GameOverScreen'
import VictoryScreen from './screens/VictoryScreen'

/** Chờ font Google tải xong để chữ vẽ trên tường (biển công ty, bảng trắng) đúng font */
function useFontsReady() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let alive = true
    const done = () => alive && setReady(true)
    document.fonts?.ready.then(done, done)
    const fallback = window.setTimeout(done, 2500)
    return () => {
      alive = false
      window.clearTimeout(fallback)
    }
  }, [])
  return ready
}

function App() {
  const screen = useGameStore((state) => state.screen)
  const goToScreen = useGameStore((state) => state.goToScreen)
  const fontsReady = useFontsReady()
  const webgl = hasWebGL()

  const handleTransitionComplete = useCallback(() => {
    if (useGameStore.getState().screen === 'day_transition') goToScreen('game')
  }, [goToScreen])

  useEffect(() => {
    if (screen === 'game' || screen === 'day_transition') {
      soundManager.setBGMGenre(2) // Adventure Lofi (Zelda Lofi)
      soundManager.startBGM()
    } else if (screen === 'start' || screen === 'profession' || screen === 'daily_summary' || screen === 'victory') {
      soundManager.setBGMGenre(1) // Cozy Pads
      soundManager.startBGM()
    } else if (screen === 'game_over') {
      soundManager.stopBGM()
    }
  }, [screen])

  let overlay
  switch (screen) {
    case 'profession':
      overlay = <ProfessionScreen />
      break
    case 'game':
      overlay = <GameScreen />
      break
    case 'day_transition':
      overlay = <DayTransitionScreen onComplete={handleTransitionComplete} />
      break
    case 'daily_summary':
      overlay = <DailySummaryScreen />
      break
    case 'game_over':
      overlay = <GameOverScreen />
      break
    case 'victory':
      overlay = <VictoryScreen />
      break
    default:
      overlay = <StartScreen />
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-night">
      {webgl && fontsReady ? <StageHost screen={screen} /> : <StageBackdrop />}
      {overlay}
    </div>
  )
}

export default App
