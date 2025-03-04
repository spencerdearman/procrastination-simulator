import { useGame } from "game-context/GameContext";
import Calendar from "components/Calendar";
import Header from "components/Header";
import NotificationsList from "components/Notifications";
import Sidebar from "components/Sidebar";
import TickingSound from "components/TickingSound";

export default function Gameplay() {
  const {
    mode,
    notifications,
    handleAcceptNotification,
    handleRejectNotification,
  } = useGame();

  return (
    <div id="container" onDragOver={(e) => e.preventDefault()}>
      <NotificationsList
        notifications={notifications}
        onAccept={handleAcceptNotification}
        onReject={handleRejectNotification}
      />
      <TickingSound />
      <div id="main">
        <Header mode={mode} />
        <Calendar />
      </div>
      <Sidebar />
    </div>
  );
}
