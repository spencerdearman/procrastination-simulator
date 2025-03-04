import { useLocation } from "react-router-dom";
import DaySummary from "../components/DaySummary";
import "../styles/DaySummary.css";

export default function EndOfDay() {
  const { state } = useLocation();
  const { currentDay, nextDay } = state || {};
  return <DaySummary currentDay={currentDay} nextDay={nextDay} />;
}
