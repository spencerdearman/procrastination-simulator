import { useState, useEffect } from "react";
import Stats from './Stats'

function WeekSummary() {
  const [summary, setSummary] = useState("");
  
  useEffect(() => {
    async function fetchSummary() {
      setSummary(""); // Reset before streaming
      try {
        const response = await fetch("https://api.groq.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`, // Ensure this is set properly
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: "Summarize a busy week for a high school student." }],
            model: "llama-3.1-8b-instant",
            stream: true, // Enable streaming
          }),
        });

        if (!response.body) throw new Error("No response body");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          setSummary((prev) => prev + chunk);
        }
      } catch (error) {
        console.error("Error streaming summary:", error);
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
        </div>
      </div>
    </div>
  );
}

export default WeekSummary;
