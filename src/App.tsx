import { useGameStore } from "./store/gameStore";

import StartScreen from "./screens/StartScreen";
import ProfessionScreen from "./screens/ProfessionScreen";
import GameScreen from "./screens/GameScreen";
import DailySummaryScreen from "./screens/DailySummaryScreen";
import GameOverScreen from "./screens/GameOverScreen";
import VictoryScreen from "./screens/VictoryScreen";

function App() {
  const screen = useGameStore((state) => state.screen);

  switch (screen) {
    case "start":
      return <StartScreen />;

    case "profession":
      return <ProfessionScreen />;

    case "game":
      return <GameScreen />;

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
