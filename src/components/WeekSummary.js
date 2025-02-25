import Groq from "groq-sdk";
import {useEffect,useState} from "react";
import Stats from './Stats';

function WeekSummary() {
  const [summary, setSummary] = useState("");
  const groq = new Groq({ apiKey: "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", dangerouslyAllowBrowser: true });

  useEffect(() => {
    async function fetchSummary() {
      setSummary(""); // Reset before fetching
      try {
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: "Summarize a busy week for a high school student in a fun, engaging way. Keep it under 100 words.",
            }
          ],
          model: "llama-3.3-70b-versatile", // More capable model
        });

        setSummary(chatCompletion.choices[0]?.message?.content || "No summary generated.");
      } catch (error) {
        console.error("Error fetching summary:", error);
        setSummary("Failed to load summary.");
      }
    }

    fetchSummary();
  }, []);

  return (
    <div>
      <div id="header">
        <p id="intro-text">You are a...</p>
        <h3 id="banner-text">Lebron</h3>
      </div>
      <div id="content">
        <div id="stats-box">
          <h3 id="blurb-text">Your Cumulative Stats</h3>
          <Stats />
        </div>
        <div id="summary-text-box">
          <h3 id="blurb-text">Your Week</h3>
          <p id="blurb-text">{summary || "Loading your week summary..."}</p>
          <button className="restart-button">Restart Game</button>
        </div>
      </div>
    </div>
  );
}

export default WeekSummary;
