import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
//import { uploadReport } from "../services/reportService";

const UploadReport = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!selectedFile) {
      setError("Please select a report file");
      return;
    }
    try {
      setLoading(true);
      await uploadReport(selectedFile);
      setSuccess("Report uploaded successfully");
      setSelectedFile(null);
      e.target.reset();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload report");
    } finally {
      setLoading(false);
    }
  };

  /* drag-and-drop handlers — only update UI state, file picked via input */
  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setError("");
      setSuccess("");
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (file) => {
    if (!file) return null;
    const ext = file.name.split(".").pop().toLowerCase();
    if (ext === "pdf") return "📄";
    if (["png", "jpg", "jpeg"].includes(ext)) return "🖼️";
    return "📁";
  };

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
          50%       { transform: translateY(-6px); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes shimmerMove {
          0%   { background-position: -300px 0; }
          100% { background-position: 300px 0; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.92) translateY(8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .upload-root { font-family: 'DM Sans', sans-serif; }
        .upload-root h1, .upload-root h2, .upload-root h3 { font-family: 'Sora', sans-serif; }

        .fade-up-1 { opacity: 0; animation: fadeUp 0.7s ease 0.05s forwards; }
        .fade-up-2 { opacity: 0; animation: fadeUp 0.7s ease 0.15s forwards; }
        .fade-up-3 { opacity: 0; animation: fadeUp 0.7s ease 0.25s forwards; }
        .fade-up-4 { opacity: 0; animation: fadeUp 0.7s ease 0.35s forwards; }

        .card-float { animation: float 5s ease-in-out infinite; }
        .dot-breathe { animation: breathe 3s ease-in-out infinite; }

        .drop-zone {
          border-radius: 20px;
          border: 2px dashed #d1d5db;
          background: rgba(255,255,255,0.6);
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .drop-zone:hover, .drop-zone.active {
          border-color: #0d9488;
          background: rgba(240,253,250,0.85);
          box-shadow: 0 0 0 4px rgba(13,148,136,0.08);
        }
        .drop-zone input[type="file"] {
          position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%;
        }

        .file-pill {
          display: flex; align-items: center; gap: 12px;
          border-radius: 14px;
          border: 1.5px solid #d1fae5;
          background: rgba(236,253,245,0.9);
          padding: 12px 16px;
          animation: popIn 0.3s cubic-bezier(.34,1.56,.64,1) forwards;
        }

        .btn-primary {
          background: linear-gradient(135deg, #0d9488, #0284c7);
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          border: none;
          border-radius: 12px;
          padding: 13px 28px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(13,148,136,0.35);
          transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
          position: relative;
          overflow: hidden;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(13,148,136,0.4);
          filter: brightness(1.05);
        }
        .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
        .btn-primary .shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%);
          background-size: 300px 100%;
          animation: shimmerMove 2s infinite;
        }
        .btn-secondary {
          background: rgba(255,255,255,0.9);
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          padding: 11px 20px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          color: #374151;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .btn-secondary:hover { background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

        .tip-card {
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(8px);
          padding: 14px 16px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease;
          display: flex; align-items: flex-start; gap: 12px;
        }
        .tip-card:hover { transform: translateY(-3px) scale(1.01); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }

        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
      `}</style>

      <div
        className="upload-root min-h-screen relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#f8fffe 0%,#f0f9ff 50%,#faf5ff 100%)" }}
      >
        {/* Mesh blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-400/30 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-sky-400/20 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-purple-400/20 blur-[90px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <Navbar />

          <div className="flex">
            <Sidebar />

            <div className="flex-1 min-w-0">
              <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

                {/* ── Page header ── */}
                <div className="mb-6 sm:mb-8 fade-up-1">
                  <div className="rounded-2xl bg-white/80 backdrop-blur-lg border border-white/70 shadow-xl p-5 sm:p-6 lg:p-8 transition-all duration-300"
                    style={{ animation: "float 5s ease-in-out infinite" }}>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-100 px-2.5 py-1 text-xs font-semibold text-teal-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dot-breathe" />
                            AI Analysis Ready
                          </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                          Upload Report
                        </h1>
                        <p className="mt-1.5 text-sm sm:text-base text-gray-500 max-w-xl leading-relaxed">
                          Upload your medical report in PDF or image format for AI-powered analysis and personalised health insights.
                        </p>
                      </div>

                      {/* Format badges */}
                      <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:flex-col sm:items-end lg:flex-row lg:items-center">
                        {["PDF", "PNG", "JPG", "JPEG"].map((fmt) => (
                          <span key={fmt}
                            className="inline-flex items-center rounded-lg bg-white/90 border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-500">
                            {fmt}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Main grid ── */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

                  {/* Upload form — left/main */}
                  <div className="lg:col-span-8 fade-up-2">
                    <div className="rounded-2xl bg-white/80 backdrop-blur-lg border border-white/70 shadow-xl overflow-hidden">
                      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#0d9488,#0284c7,#7c3aed)" }} />

                      <div className="p-5 sm:p-6 lg:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">

                          {/* Drop zone */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                              Select or drop your file
                            </label>

                            <div
                              className={`drop-zone ${dragOver ? "active" : ""}`}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                            >
                              <input
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={handleFileChange}
                              />

                              <div className="flex flex-col items-center justify-center gap-4 py-12 px-6 text-center pointer-events-none select-none">
                                {/* Upload icon */}
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
                                  style={{ background: "linear-gradient(135deg,#ccfbf1,#bae6fd)" }}>
                                  <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                  </svg>
                                </div>

                                <div>
                                  <p className="text-sm font-semibold text-gray-700">
                                    Drag & drop your report here
                                  </p>
                                  <p className="mt-1 text-xs text-gray-400">
                                    or <span className="text-teal-600 font-semibold">browse files</span> from your device
                                  </p>
                                </div>

                                <div className="flex items-center gap-2">
                                  {["PDF", "PNG", "JPG", "JPEG"].map((f) => (
                                    <span key={f}
                                      className="rounded-md bg-white/80 border border-gray-200 px-2 py-0.5 text-[10px] font-bold text-gray-500 tracking-wide">
                                      {f}
                                    </span>
                                  ))}
                                </div>

                                <p className="text-[11px] text-gray-400">Max file size: 10 MB</p>
                              </div>
                            </div>
                          </div>

                          {/* Selected file pill */}
                          {selectedFile && (
                            <div className="file-pill">
                              <span className="text-2xl leading-none">{getFileIcon(selectedFile)}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-800 truncate">{selectedFile.name}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{formatSize(selectedFile.size)}</p>
                              </div>
                              <span className="flex-shrink-0 inline-flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Ready
                              </span>
                            </div>
                          )}

                          {/* Error */}
                          {error && (
                            <div className="flex items-center gap-2.5 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                              <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                              </svg>
                              <p className="text-sm text-red-600">{error}</p>
                            </div>
                          )}

                          {/* Success */}
                          {success && (
                            <div className="flex items-center gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                              <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <p className="text-sm text-emerald-700 font-medium">{success}</p>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                            <button type="submit" disabled={loading} className="btn-primary">
                              {loading && <span className="shimmer" />}
                              <span className="relative flex items-center gap-2">
                                {loading ? (
                                  <>
                                    <span className="spinner" />
                                    Uploading…
                                  </>
                                ) : (
                                  <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    Upload Report
                                  </>
                                )}
                              </span>
                            </button>

                            {selectedFile && !loading && (
                              <button
                                type="button"
                                className="btn-secondary"
                                onClick={() => { setSelectedFile(null); setError(""); setSuccess(""); }}
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Clear file
                              </button>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  {/* Right info panel */}
                  <div className="lg:col-span-4 flex flex-col gap-5 fade-up-3">

                    {/* How it works */}
                    <div className="rounded-2xl bg-white/80 backdrop-blur-lg border border-white/70 shadow-xl p-5">
                      <div className="h-1 w-full rounded-full mb-4" style={{ background: "linear-gradient(90deg,#7c3aed,#0284c7)" }} />
                      <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center text-xs">🤖</span>
                        How it works
                      </h3>
                      <div className="flex flex-col gap-4">
                        {[
                          { step: "1", color: "#0d9488", bg: "#f0fdf4", icon: "📤", label: "Upload", desc: "Upload your medical report PDF or image." },
                          { step: "2", color: "#0284c7", bg: "#f0f9ff", icon: "🔍", label: "Analyse", desc: "Our AI extracts and analyses key parameters." },
                          { step: "3", color: "#7c3aed", bg: "#faf5ff", icon: "💡", label: "Insights", desc: "Receive insights, alerts, and diet recommendations." },
                        ].map((s) => (
                          <div key={s.step} className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
                              style={{ background: s.color }}>
                              {s.step}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-800">{s.icon} {s.label}</p>
                              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{s.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="rounded-2xl bg-white/80 backdrop-blur-lg border border-white/70 shadow-xl p-5 card-float">
                      <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center text-xs">💡</span>
                        Tips for best results
                      </h3>
                      <div className="flex flex-col gap-3">
                        {[
                          { icon: "✅", text: "Use clear, high-resolution scans or PDFs" },
                          { icon: "✅", text: "Ensure all text in the report is legible" },
                          { icon: "✅", text: "Upload full reports — not just selected pages" },
                          { icon: "⚠️", text: "Max file size is 10 MB per upload" },
                        ].map((t, i) => (
                          <div key={i} className="tip-card">
                            <span className="text-base leading-none flex-shrink-0">{t.icon}</span>
                            <p className="text-xs text-gray-600 leading-relaxed">{t.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Security note */}
                    <div className="rounded-2xl border border-teal-100 bg-teal-50/70 backdrop-blur p-4 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-teal-800">Secure & Private</p>
                        <p className="text-xs text-teal-700 mt-0.5 leading-relaxed">
                          Your reports are encrypted end-to-end and never shared with third parties.
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

export default UploadReport;