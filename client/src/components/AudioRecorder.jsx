import { useRef, useState } from "react";
import { api } from "../api";

export default function AudioRecorder({ conversationId, role, onSend }) {
  const mediaRecorder = useRef(null);
  const [recording, setRecording] = useState(false);
  const chunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = e => {
      chunks.current.push(e.data);
    };

    mediaRecorder.current.onstop = async () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      chunks.current = [];

      const formData = new FormData();
      formData.append("audio", blob);
      formData.append("conversationId", conversationId);
      formData.append("role", role);

      const res = await api.post("/audio", formData);
      onSend(res.data);
    };

    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  return (
    <button onClick={recording ? stopRecording : startRecording}>
      {recording ? "Stop Recording" : "Record Audio"}
    </button>
  );
}
