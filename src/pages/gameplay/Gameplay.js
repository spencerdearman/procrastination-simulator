import Calendar from "components/Calendar";
import Header from "components/Header";
import NotificationsList from "components/Notifications";
import Sidebar from "components/Sidebar";
import TickingSound from "components/TickingSound";
import { useGame } from "game-context/GameContext";

export default function Gameplay() {
  const { mode } = useGame();
  return (
    <div id="container" onDragOver={(e) => e.preventDefault()}>
      <NotificationsList />
      <TickingSound />
      <div id="main">
        <Header mode={mode} />
        <Calendar />
      </div>
      <Sidebar />
    </div>
  );
}
