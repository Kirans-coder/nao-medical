export default function MessageBubble({ message }) {
  return (
    <div className={message.senderRole}>
      <strong>{message.senderRole.toUpperCase()}</strong>

      {message.originalText && <p>{message.originalText}</p>}
      {message.translatedText && (
        <small>Translated: {message.translatedText}</small>
      )}

      {message.audioUrl && (
        <audio
          controls
          src={`http://localhost:5000${message.audioUrl}`}
        />
      )}
    </div>
  );
}
