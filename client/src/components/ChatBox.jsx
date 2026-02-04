import { useState } from "react";
import { api } from "../api";
import MessageBubble from "./MessageBubble";
import AudioRecorder from "./AudioRecorder";

export default function ChatBox({ messages, setMessages, conversationId }) {
  const [text, setText] = useState("");
  const [role, setRole] = useState("doctor");

  const sendMessage = async () => {
    if (!text) return;

    const res = await api.post("/translate", {
      text,
      from: "English",
      to: "Hindi",
      role,
      conversationId
    });

    setMessages([...messages, res.data]);
    setText("");
  };

  return (
    <>
      <select onChange={e => setRole(e.target.value)}>
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
      </select>

      {messages.map(msg => (
        <MessageBubble key={msg._id} message={msg} />
      ))}

      <input
        placeholder="Type message..."
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <button onClick={sendMessage}>Send Text</button>

      <AudioRecorder
        role={role}
        conversationId={conversationId}
        onSend={msg => setMessages([...messages, msg])}
      />
    </>
  );
}
