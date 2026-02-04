import { useState } from "react";
import { api } from "../api";

export default function SummaryBox({ conversationId }) {
  const [summary, setSummary] = useState("");

  const generateSummary = async () => {
    const res = await api.post("/summarize", { conversationId });
    setSummary(res.data.summary);
  };

  return (
    <div>
      <button onClick={generateSummary}>Generate Medical Summary</button>
      {summary && <pre>{summary}</pre>}
    </div>
  );
}
