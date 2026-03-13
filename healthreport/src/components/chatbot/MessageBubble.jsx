const MessageBubble = ({ sender, text }) => {
  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
          sender === "user"
            ? "bg-gray-900 text-white"
            : "border border-gray-200 bg-gray-50 text-gray-800"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default MessageBubble;