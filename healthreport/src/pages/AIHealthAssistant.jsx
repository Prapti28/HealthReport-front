import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import ChatWindow from "../components/chatbot/ChatWindow";
//import { askHealthAssistant } from "../services/aiService";

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
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError("");
    setLoading(true);
    try {
      const data = await askHealthAssistant(input);
      const aiMessage = { sender: "ai", text: data.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    { icon: "🩺", label: "Explain my report", text: "Can you explain the key findings in my latest report?" },
    { icon: "🥗", label: "Diet suggestions", text: "What foods should I eat based on my health parameters?" },
    { icon: "📊", label: "Health trends", text: "What trends do you see in my recent health data?" },
    { icon: "💊", label: "Medication tips", text: "Any lifestyle tips to complement my current health plan?" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.82); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.92) translateY(6px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .ai-root { font-family: 'DM Sans', sans-serif; }
        .ai-root h1, .ai-root h2, .ai-root h3 { font-family: 'Sora', sans-serif; }

        .fade-up-1 { opacity: 0; animation: fadeUp 0.7s ease 0.05s forwards; }
        .fade-up-2 { opacity: 0; animation: fadeUp 0.7s ease 0.15s forwards; }
        .fade-up-3 { opacity: 0; animation: fadeUp 0.7s ease 0.25s forwards; }
        .fade-up-4 { opacity: 0; animation: fadeUp 0.7s ease 0.35s forwards; }

        .dot-breathe { animation: breathe 2.5s ease-in-out infinite; }
        .card-float  { animation: float 5s ease-in-out infinite; }

        /* animated gradient border on the AI badge */
        .ai-badge {
          background: linear-gradient(270deg, #7c3aed, #0284c7, #0d9488, #7c3aed);
          background-size: 300% 300%;
          animation: gradientShift 4s ease infinite;
          border-radius: 999px;
          padding: 2px;
          display: inline-flex;
        }
        .ai-badge-inner {
          background: white;
          border-radius: 999px;
          padding: 4px 12px;
          font-size: 11px;
          font-weight: 700;
          color: #7c3aed;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .quick-prompt-btn {
          display: flex; align-items: center; gap-8px;
          border-radius: 12px;
          border: 1.5px solid #e5e7eb;
          background: rgba(255,255,255,0.85);
          padding: 9px 14px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          color: #374151;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.2s;
          text-align: left;
          width: 100%;
        }
        .quick-prompt-btn:hover {
          border-color: #0d9488;
          background: rgba(240,253,250,0.9);
          box-shadow: 0 4px 12px rgba(13,148,136,0.12);
          transform: translateY(-1px);
        }

        .stat-chip {
          display: flex; flex-direction: column; align-items: center; gap: 2px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(8px);
          padding: 12px 14px;
          flex: 1;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
      `}</style>

      <div
        className="ai-root min-h-screen relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#f8fffe 0%,#f0f9ff 50%,#faf5ff 100%)" }}
      >
        {/* Mesh blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-400/20 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-sky-400/20 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-teal-400/25 blur-[90px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <Navbar />

          <div className="flex">
            <Sidebar />

            <div className="flex-1 min-w-0">
              <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

                {/* ── Page header ── */}
                <div className="mb-6 sm:mb-8 fade-up-1">
                  <div
                    className="rounded-2xl bg-white/80 backdrop-blur-lg border border-white/70 shadow-xl p-5 sm:p-6 lg:p-8"
                    style={{ animation: "float 5s ease-in-out infinite" }}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-4">
                        {/* AI avatar */}
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                          style={{ background: "linear-gradient(135deg,#7c3aed,#0284c7)" }}
                        >
                          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <div className="ai-badge">
                              <span className="ai-badge-inner">AI Powered</span>
                            </div>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dot-breathe" />
                              Online
                            </span>
                          </div>
                          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                            AI Health Assistant
                          </h1>
                          <p className="mt-1 text-sm sm:text-base text-gray-500 max-w-xl leading-relaxed">
                            Ask questions about your report, health status, diet, and lifestyle — powered by AI.
                          </p>
                        </div>
                      </div>

                      {/* Stat chips — hidden on mobile */}
                      <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                        {[
                          { value: "24/7", label: "Available", color: "#7c3aed" },
                          { value: "AI", label: "Powered", color: "#0284c7" },
                          { value: "100%", label: "Private", color: "#0d9488" },
                        ].map((s) => (
                          <div key={s.label} className="stat-chip">
                            <span className="text-sm font-bold" style={{ color: s.color, fontFamily: "Sora, sans-serif" }}>{s.value}</span>
                            <span className="text-[10px] text-gray-400 font-medium">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Main layout ── */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

                  {/* Chat window — main */}
                  <div className="lg:col-span-8 fade-up-2">
                    <div className="rounded-2xl bg-white/80 backdrop-blur-lg border border-white/70 shadow-xl overflow-hidden">
                      {/* Accent strip */}
                      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#7c3aed,#0284c7,#0d9488)" }} />

                      {/* Chat header bar */}
                      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-white/60">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg,#7c3aed,#0284c7)" }}>
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">Health Assistant</p>
                            <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block dot-breathe" />
                              Active session
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">
                          {messages.length} message{messages.length !== 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* ChatWindow component — all props unchanged */}
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

                  {/* Right sidebar panel */}
                  <div className="lg:col-span-4 flex flex-col gap-5 fade-up-3">

                    {/* Quick prompts */}
                    <div className="rounded-2xl bg-white/80 backdrop-blur-lg border border-white/70 shadow-xl p-5">
                      <div className="h-1 w-full rounded-full mb-4" style={{ background: "linear-gradient(90deg,#7c3aed,#0284c7)" }} />
                      <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center text-xs">⚡</span>
                        Quick questions
                      </h3>
                      <div className="flex flex-col gap-2">
                        {quickPrompts.map((p) => (
                          <button
                            key={p.label}
                            type="button"
                            className="quick-prompt-btn"
                            onClick={() => setInput(p.text)}
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-base leading-none">{p.icon}</span>
                              <span>{p.label}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                      <p className="mt-3 text-[10px] text-gray-400 text-center">
                        Click a prompt to fill the input
                      </p>
                    </div>

                    {/* What I can help with */}
                    <div className="rounded-2xl bg-white/80 backdrop-blur-lg border border-white/70 shadow-xl p-5 card-float">
                      <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-sky-50 flex items-center justify-center text-xs">🩺</span>
                        What I can help with
                      </h3>
                      <div className="flex flex-col gap-2.5">
                        {[
                          { icon: "📋", color: "#0d9488", bg: "#f0fdf4", label: "Report Interpretation", desc: "Understand your lab values and parameters" },
                          { icon: "🥗", color: "#d97706", bg: "#fffbeb", label: "Diet & Nutrition", desc: "Food recommendations based on your data" },
                          { icon: "📈", color: "#0284c7", bg: "#f0f9ff", label: "Health Trends", desc: "Track changes across your reports" },
                          { icon: "⚠️", color: "#dc2626", bg: "#fff1f2", label: "Risk Alerts", desc: "Explain abnormal values and next steps" },
                        ].map((item) => (
                          <div key={item.label} className="flex items-start gap-3 rounded-xl p-3 border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all duration-200">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                              style={{ background: item.bg }}>
                              {item.icon}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-800">{item.label}</p>
                              <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Privacy note */}
                    <div className="rounded-2xl border border-purple-100 bg-purple-50/60 backdrop-blur p-4 flex items-start gap-3 fade-up-4">
                      <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-purple-800">AI + Privacy</p>
                        <p className="text-[11px] text-purple-700 mt-0.5 leading-relaxed">
                          Your conversations are private and not used to train AI models.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIHealthAssistant;