import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
//import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginUser(form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
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

        .login-root { font-family: 'DM Sans', sans-serif; }
        .login-root h1, .login-root h2, .login-root h3 { font-family: 'Sora', sans-serif; }

        .input-field {
          width: 100%;
          border-radius: 12px;
          border: 1.5px solid #e5e7eb;
          background: rgba(255,255,255,0.85);
          padding: 11px 14px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #111827;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .input-field:focus {
          border-color: #0d9488;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(13,148,136,0.1);
        }
        .input-field::placeholder { color: #9ca3af; }

        .btn-primary {
          background: linear-gradient(135deg, #0d9488, #0284c7);
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          border: none;
          border-radius: 12px;
          padding: 13px;
          width: 100%;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(13,148,136,0.35);
          transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
          position: relative;
          overflow: hidden;
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

        .card-float { animation: float 5s ease-in-out infinite; }
        .fade-up-1 { opacity: 0; animation: fadeUp 0.7s ease 0.1s forwards; }
        .fade-up-2 { opacity: 0; animation: fadeUp 0.7s ease 0.2s forwards; }
        .fade-up-3 { opacity: 0; animation: fadeUp 0.7s ease 0.3s forwards; }
        .fade-up-4 { opacity: 0; animation: fadeUp 0.7s ease 0.4s forwards; }

        .feature-chip {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.8);
          border-radius: 999px;
          padding: 7px 14px;
          font-size: 12px;
          font-weight: 500;
          color: #374151;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .dot-breathe { animation: breathe 3s ease-in-out infinite; }
      `}</style>

      <div
        className="login-root min-h-screen relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#f8fffe 0%,#f0f9ff 50%,#faf5ff 100%)" }}
      >
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-400/30 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-sky-400/20 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-purple-400/20 blur-[90px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-10 xl:gap-16">

              <div className="hidden lg:flex flex-col gap-8 flex-1 max-w-lg">
                <div className="fade-up-1">
                  <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-100 px-3 py-1.5 text-xs font-semibold text-teal-700 mb-5">
                    <span className="w-2 h-2 rounded-full bg-teal-500 dot-breathe" />
                    Health Intelligence Platform
                  </span>
                  <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                    Your health,<br />
                    <span style={{ background: "linear-gradient(135deg,#0d9488,#0284c7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      understood deeply.
                    </span>
                  </h1>
                  <p className="mt-4 text-base text-gray-500 leading-relaxed">
                    Upload your medical reports and get AI-powered insights, personalized diet plans, and real-time health monitoring.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 fade-up-2">
                  {[
                    { dot: "bg-teal-500", label: "Smart Report Analysis" },
                    { dot: "bg-sky-500", label: "AI Health Insights" },
                    { dot: "bg-purple-500", label: "Personalized Diet Plans" },
                    { dot: "bg-amber-500", label: "Risk Monitoring" },
                  ].map((f) => (
                    <div key={f.label} className="feature-chip">
                      <span className={`w-2 h-2 rounded-full ${f.dot} flex-shrink-0`} />
                      {f.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full max-w-md flex-shrink-0 fade-up-2">
                <div className="rounded-2xl bg-white/80 backdrop-blur-lg border border-white/70 shadow-xl overflow-hidden transition-all duration-300">
                  <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#0d9488,#0284c7,#7c3aed)" }} />

                  <div className="p-6 sm:p-8">
                    <div className="mb-7">
                      <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                        style={{ background: "linear-gradient(135deg,#0d9488,#0284c7)" }}>
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back</h2>
                      <p className="mt-1 text-sm text-gray-500">Sign in to access your health dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                      <div className="fade-up-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="input-field"
                            style={{ paddingLeft: "40px" }}
                            required
                          />
                        </div>
                      </div>

                      <div className="fade-up-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-sm font-medium text-gray-700">Password</label>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="input-field"
                            style={{ paddingLeft: "40px", paddingRight: "42px" }}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      {error && (
                        <div className="flex items-center gap-2.5 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                          <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                          </svg>
                          <p className="text-sm text-red-600">{error}</p>
                        </div>
                      )}

                      <div className="fade-up-4">
                        <button type="submit" disabled={loading} className="btn-primary">
                          {loading && <span className="shimmer" />}
                          <span className="relative flex items-center justify-center gap-2">
                            {loading ? (
                              <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Signing in…
                              </>
                            ) : (
                              <>
                                Log in
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </>
                            )}
                          </span>
                        </button>
                      </div>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                      <div className="flex-1 h-px bg-gray-100" />
                      <span className="text-xs text-gray-400 font-medium">New here?</span>
                      <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    <Link
                      to="/register"
                      className="flex items-center justify-center gap-2 w-full rounded-xl bg-white/90 border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200"
                    >
                      Create a free account
                      <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </Link>
                  </div>
                </div>

                <p className="mt-4 text-center text-xs text-gray-400 fade-up-4">
                  🔒 Your data is encrypted and never shared with third parties.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;