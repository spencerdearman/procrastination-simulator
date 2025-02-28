import Calendar from "components/Calendar";
import Header from "components/Header";
import NotificationsList from "components/Notifications";
import Sidebar from "components/Sidebar";

export default function Gameplay() {
  return (
    <div id="container">
      <NotificationsList />
      <div id="main">
        <Header />
        <Calendar />
      </div>
      <Sidebar />
    </div>
  );
}
