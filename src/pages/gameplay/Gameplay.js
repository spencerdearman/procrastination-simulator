import Calendar from "components/Calendar";
import Header from "components/Header";
import NotificationsList from "components/Notifications";
import Sidebar from "components/Sidebar";
import TickingSound from "components/TickingSound";

export default function Gameplay() {
  return (
    <div id="container">
      <NotificationsList />
      <TickingSound />
      <div id="main">
        <Header />
        <Calendar />
      </div>
      <Sidebar />
    </div>
  );
}
