import MessageBubble from "./MessageBubble";

const ChatWindow = ({
  messages = [],
  input,
  setInput,
  handleSendMessage,
  loading,
  error,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="h-[500px] space-y-4 overflow-y-auto p-6">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            sender={message.sender}
            text={message.text}
          />
        ))}

        {loading && (
          <MessageBubble sender="ai" text="Thinking..." />
        )}
      </div>

      {error && (
        <div className="px-6 pb-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-3 border-t border-gray-200 p-4"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your health report..."
          className="flex-1 rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-gray-900"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;