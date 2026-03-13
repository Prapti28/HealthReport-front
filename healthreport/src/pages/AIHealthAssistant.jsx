import { useState } from "react";
import Navbar from "../components/layout/Navbar";
//import { sendHealthMessage } from "../services/aiService";

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

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const data = await sendHealthMessage(input);

      const aiMessage = {
        sender: "ai",
        text: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">AI Health Assistant</h1>
          <p className="mt-2 text-sm text-gray-600">
            Ask questions about your report, health status, diet, and lifestyle
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="h-[500px] space-y-4 overflow-y-auto p-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.sender === "user"
                      ? "bg-gray-900 text-white"
                      : "border border-gray-200 bg-gray-50 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                  Thinking...
                </div>
              </div>
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
      </div>
    </div>
  );
};

export default AIHealthAssistant;