import { useCallback, useEffect } from "react";
import { useGameStore } from "./store/gameStore";
import { soundManager } from "./utils/soundManager";

import StartScreen from "./screens/StartScreen";
import ProfessionScreen from "./screens/ProfessionScreen";
import GameScreen from "./screens/GameScreen";
import DailySummaryScreen from "./screens/DailySummaryScreen";
import DayTransitionScreen from "./screens/DayTransitionScreen";
import GameOverScreen from "./screens/GameOverScreen";
import VictoryScreen from "./screens/VictoryScreen";

function App() {
  const screen = useGameStore((state) => state.screen);
  const goToScreen = useGameStore((state) => state.goToScreen);

  const handleTransitionComplete = useCallback(() => {
    goToScreen("game");
  }, [goToScreen]);

  useEffect(() => {
    if (screen === "game" || screen === "day_transition") {
      soundManager.setBGMGenre(2); // Adventure Lofi (Zelda Lofi)
      soundManager.startBGM();
    } else if (screen === "start" || screen === "profession" || screen === "daily_summary" || screen === "victory") {
      soundManager.setBGMGenre(1); // Cozy Pads
      soundManager.startBGM();
    } else if (screen === "game_over") {
      soundManager.stopBGM();
    }
  }, [screen]);

  switch (screen) {
    case "start":
      return <StartScreen />;

    case "profession":
      return <ProfessionScreen />;

    case "game":
      return <GameScreen />;

    case "day_transition":
      return <DayTransitionScreen onComplete={handleTransitionComplete} />;

    case "daily_summary":
      return <DailySummaryScreen />;

    case "game_over":
      return <GameOverScreen />;

    case "victory":
      return <VictoryScreen />;

    default:
      return <StartScreen />;
  }
}

export default App;
