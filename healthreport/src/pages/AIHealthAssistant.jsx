import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import ChatWindow from "../components/chatbot/ChatWindow";
// import { sendHealthMessage } from "../services/aiService";

const AIHealthAssistant = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello, I am your AI health assistant. Ask me anything about your report, diet, or health insights.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userText = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userText,
      },
    ]);

    setInput("");
    setError("");
    setLoading(true);

    try {
      const data = await sendHealthMessage(userText);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply,
        },
      ]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <div className="mx-auto max-w-5xl px-6 py-10">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold">AI Health Assistant</h1>
              <p className="mt-2 text-sm text-gray-600">
                Ask questions about your report, health status, diet, and lifestyle
              </p>
            </div>

            <ChatWindow
              messages={messages}
              input={input}
              setInput={setInput}
              handleSendMessage={handleSendMessage}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIHealthAssistant;