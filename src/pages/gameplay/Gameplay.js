import Calendar from "components/Calendar";
import Header from "components/Header";
import NotificationsList from "components/Notifications";
import Sidebar from "components/Sidebar";
import { useGame } from "../../game-context/GameContext";

export default function Gameplay() {
  const { player, currentTime, gameDay } = useGame();

  return (
    <div id="container">
      <NotificationsList />
      <div id="main">
        <Header />
        <Calendar />
      </div>
      <Sidebar attributes={player.attributes} />
    </div>
  );
}
