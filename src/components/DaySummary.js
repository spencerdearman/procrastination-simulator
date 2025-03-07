import Groq from "groq-sdk";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Stats from "./Stats";

function DaySummary({ currentDay, nextDay }) {
  const [summary, setSummary] = useState("");
  const name = useState("Lebron");
  const navigate = useNavigate();
  const groq = new Groq({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    async function fetchSummary() {
      setSummary(""); // Reset before fetching
      try {
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: `Write 50-word summary of ${name}'s day, based on their status and schedule. Their status is made up of 4 values (each out of 100), Academics, Social Life, Energy, and Mental Health.  Write it in first-person and do not specifically reference the stats. Their schedule was: ${JSON.stringify(currentDay.logs)}.`,
            },
          ],
          model: "llama-3.1-8b-instant", // Smallest Model Available
          temperature: 0.5,
        });

        setSummary(
          chatCompletion.choices[0]?.message?.content ||
            "No summary generated.",
        );
      } catch (error) {
        console.error("Error fetching summary:", error);
        setSummary("Failed to load summary.");
      }
    }

    fetchSummary();
  }, []);

  const goToNextDay = () => {
    navigate("/game/calendar", { state: { currentDay: nextDay } });
  };

  return (
    <div>
      <div id="header-day">
        <h3 id="banner-text-day">
          <span style={{ color: "#D05147" }}>{`${currentDay.dayOfWeek} `}</span>
          at a Glance
        </h3>
      </div>
      <div id="content">
        <div id="stats-box">
          <h3 className="subheader-text">Your Cumulative Stats</h3>
          <Stats />
        </div>
        <div id="summary-text-box">
          <h3 className="subheader-text">Your Day</h3>
          <p id="blurb-text">{summary || "Writing Your Journal Entry 📝..."}</p>
          <button onClick={() => goToNextDay()} className="restart-button">
            Next Day
          </button>
        </div>
      </div>
    </div>
  );
}

export default DaySummary;
