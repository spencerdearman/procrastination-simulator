import Groq from "groq-sdk";
import { useEffect, useState } from "react";
import Stats from "./Stats";

function WeekSummary() {
  const [summary, setSummary] = useState("");
  const [log, setLog] = useState(null);
  const [name, setName] = useState("Lebron");
  const stats = {
    academics: 20,
    social: 95,
    energy: 80,
    mentalHealth: 90,
  };
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
              content: `Write 50-word summary of ${name}'s week, based on their status and schedule. Their status is made up of 4 values (each out of 100), Academics, Social Life, Energy, and Mental Health. Here are the status values: Academics: ${stats.academics}, Social Life: ${stats.social}, Energy: ${stats.energy}, Mental Health: ${stats.mentalHealth}. Adjust the tone and description of their day based on how high each of these values are, assuming 100=best and 0=worst. Write it in first-person and do not specifically reference the stats. Their schedule was: ${log}.`,
            },
          ],
          model: "llama-3.1-8b-instant", // Smallest Model Available
          temperature: 1.5,
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

  return (
    <div>
      <div id="week-summary-header">
        <p className="intro-text">You are a...</p>
        {summary && <h3 id="banner-text">Lebron</h3>}
      </div>
      <div id="content">
        <div id="stats-box">
          <h3 id="blurb-text">Your Cumulative Stats</h3>
          <h3 id="blurb-text">Your Cumulative Stats</h3>
          <Stats />
        </div>
        <div id="summary-text-box">
          <h3 id="blurb-text">Your Week</h3>
          <p id="blurb-text">
            {" "}
            Matthew woke up to the sound of his alarm, rubbing his eyes as he
            prepared for another busy school day. After a quick breakfast, he
            grabbed his backpack and headed out the door, catching the bus just
            in time. His morning was packed with solving algebra problems,
            discussing historical events, and presenting his science project. At
            lunch, he joked around with his friends, enjoying a much-needed
            break. The afternoon flew by with a hands-on coding lesson in
            computer class and an intense game of basketball in P.E. After
            school, he stayed late for robotics club, fine-tuning a project for
            an upcoming competition. Once home, he finished his homework and
            relaxed with a video game before heading to bed, ready to do it all
            again tomorrow.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeekSummary;
