import { useEffect, useState } from "react";
import { api } from "../api";
import ChatBox from "../components/ChatBox";
import SearchBar from "../components/SearchBar";
import SummaryBox from "../components/SummaryBox";

const conversationId = "demo-conversation";

export default function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api.get(`/messages/${conversationId}`).then(res => {
      setMessages(res.data);
    });
  }, []);

  return (
    <div className="container">
      <h2>Doctor–Patient Translation App</h2>

      <SearchBar setMessages={setMessages} />

      <ChatBox
        messages={messages}
        setMessages={setMessages}
        conversationId={conversationId}
      />

      <SummaryBox conversationId={conversationId} />
    </div>
  );
}
