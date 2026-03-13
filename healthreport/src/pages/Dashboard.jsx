import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
//import { getDashboardData } from "../services/healthService";


const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes pulseRing {
    0%,100% { box-shadow: 0 0 0 0 rgba(20,184,166,0.4); }
    50%      { box-shadow: 0 0 0 8px rgba(20,184,166,0); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-4px); }
  }
  @keyframes breathe {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:0.5; transform:scale(0.85); }
  }

  .dash-root * { font-family: 'Geist', sans-serif; }
  .font-serif-disp { font-family: 'Instrument Serif', serif; }

  .card-hover {
    transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease;
  }
  .card-hover:hover { transform: translateY(-4px) scale(1.015); box-shadow: 0 20px 48px -12px rgba(0,0,0,0.14); }

  .btn-primary {
    background: linear-gradient(135deg, #0d9488, #0ea5e9);
    transition: filter 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .btn-primary:hover { filter: brightness(1.08); transform: translateY(-2px); box-shadow: 0 8px 24px -4px rgba(14,165,233,0.45); }

  .ticker-wrap { overflow: hidden; }
  .ticker-inner { display: flex; width: max-content; animation: ticker 28s linear infinite; }

  .score-ring {
    background: conic-gradient(#0d9488 var(--pct), #e2e8f0 var(--pct));
    border-radius: 50%;
  }
  .score-ring-inner {
    position: absolute; inset: 6px;
    background: white; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }

  .shimmer-skeleton {
    background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
    background-size: 400px 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 12px;
  }

  .alert-item { animation: fadeUp 0.5s ease both; }
  .report-row  { animation: fadeUp 0.5s ease both; }

  /* Noise texture overlay */
  .noise::before {
    content:''; position:absolute; inset:0; pointer-events:none; z-index:0;
    opacity:0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px;
  }
`;


const SkeletonCard = () => (
  <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 space-y-3">
    <div className="shimmer-skeleton h-3 w-24" />
    <div className="shimmer-skeleton h-8 w-32" />
    <div className="shimmer-skeleton h-3 w-40" />
  </div>
);

const ScoreRing = ({ score }) => {
  const pct = `${(score / 100) * 360}deg`;
  return (
    <div className="relative w-20 h-20 flex-shrink-0" style={{ '--pct': pct }}>
      <div className="score-ring w-full h-full" />
      <div className="score-ring-inner flex-col">
        <span className="text-sm font-bold text-gray-900 leading-none">{score}</span>
        <span className="text-[9px] text-gray-400 leading-none">/100</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    healthScore: 0,
    reportCount: 0,
    abnormalParametersCount: 0,
    riskLevel: "Low",
    recentReports: [],
    alerts: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData({
          healthScore: data?.healthScore ?? 0,
          reportCount: data?.reportCount ?? 0,
          abnormalParametersCount: data?.abnormalParametersCount ?? 0,
          riskLevel: data?.riskLevel ?? "Low",
          recentReports: data?.recentReports ?? [],
          alerts: data?.alerts ?? [],
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const tickerItems = [
    "Health Overview", "·", "Recent Reports", "·",
    "Abnormal Parameters", "·", "Risk Level", "·",
    "Health Alerts", "·", "Diet Plan", "·", "AI Insights", "·",
  ];

  const BgWrapper = ({ children }) => (
    <div className="dash-root noise min-h-screen relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg,#f0fdf8 0%,#f8faff 45%,#fdf4ff 100%)' }}>
      <style>{styles}</style>

      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(20,184,166,0.18) 0%,transparent 70%)' }} />
      <div className="absolute top-1/3 -right-40 w-[440px] h-[440px] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(14,165,233,0.14) 0%,transparent 70%)' }} />
      <div className="absolute -bottom-24 left-1/4 w-[420px] h-[420px] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(168,85,247,0.12) 0%,transparent 70%)' }} />

      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.025) 1px,transparent 1px)', backgroundSize: '56px 56px' }} />

      <Navbar />
      <div className="flex relative z-10">{children}</div>
    </div>
  );

  if (loading) return (
    <BgWrapper>
      <Sidebar />
      <div className="flex-1 min-w-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/70 shadow-2xl p-8 mb-8">
            <div className="shimmer-skeleton h-6 w-48 mb-3" />
            <div className="shimmer-skeleton h-10 w-64 mb-2" />
            <div className="shimmer-skeleton h-4 w-80" />
          </div>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    </BgWrapper>
  );

  if (error) return (
    <BgWrapper>
      <Sidebar />
      <div className="flex-1 min-w-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-red-100 shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <h2 className="font-semibold text-gray-900">Something went wrong</h2>
            </div>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      </div>
    </BgWrapper>
  );

  const summaryCards = [
    {
      title: "Health Score",
      value: `${dashboardData.healthScore}`,
      suffix: "/ 100",
      note: "Overall health condition",
      accent: "#0891b2",
      bg: "from-cyan-500/10 to-sky-500/10",
      border: "border-sky-100",
      dot: "bg-sky-500",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: "Reports Uploaded",
      value: dashboardData.reportCount,
      suffix: "",
      note: "Total medical reports",
      accent: "#0d9488",
      bg: "from-teal-500/10 to-emerald-500/10",
      border: "border-teal-100",
      dot: "bg-teal-500",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "Abnormal Parameters",
      value: dashboardData.abnormalParametersCount,
      suffix: "",
      note: "Need attention",
      accent: "#dc2626",
      bg: "from-red-500/10 to-rose-500/10",
      border: "border-red-100",
      dot: "bg-red-500",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      ),
    },
    {
      title: "Risk Level",
      value: dashboardData.riskLevel,
      suffix: "",
      note: "Preventive monitoring",
      accent: "#d97706",
      bg: "from-amber-500/10 to-orange-500/10",
      border: "border-amber-100",
      dot: "bg-amber-500",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  const riskColor = {
    Low: "text-emerald-700 bg-emerald-50 border-emerald-200",
    Medium: "text-amber-700 bg-amber-50 border-amber-200",
    High: "text-red-700 bg-red-50 border-red-200",
  }[dashboardData.riskLevel] || "text-gray-700 bg-gray-50 border-gray-200";

  return (
    <BgWrapper>
      <Sidebar />
      <div className="flex-1 min-w-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

          <div className="ticker-wrap mb-6 rounded-full bg-white/60 backdrop-blur border border-white/80 shadow-sm py-2 overflow-hidden">
            <div className="ticker-inner select-none">
              {[...tickerItems, ...tickerItems].map((t, i) => (
                <span key={i} className={`px-4 text-xs font-medium tracking-widest uppercase ${t === '·' ? 'text-teal-400' : 'text-gray-400'}`}>{t}</span>
              ))}
            </div>
          </div>

          <div className="mb-8 opacity-0 animate-[fadeUp_0.6s_ease_0.05s_forwards]">
            <div className="rounded-3xl bg-white/75 backdrop-blur-2xl border border-white/80 shadow-2xl overflow-hidden">
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg,#0d9488,#0ea5e9,#a855f7)' }} />

              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start gap-5">
                    <ScoreRing score={dashboardData.healthScore} />

                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-teal-600 mb-1">
                        Personal Health Overview
                      </p>
                      <h1 className="font-serif-disp text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
                        Your Dashboard
                      </h1>
                      <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-xl leading-relaxed">
                        Health summary, recent reports, and important alerts — all in one place.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${riskColor}`}>
                      {dashboardData.riskLevel} Risk
                    </span>
                    <Link to="/upload-report" className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload Report
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5 mb-8">
            {summaryCards.map((card, i) => (
              <div
                key={card.title}
                className={`card-hover rounded-2xl p-5 sm:p-6 border ${card.border} bg-gradient-to-br ${card.bg} backdrop-blur-md shadow-sm opacity-0 animate-[fadeUp_0.6s_ease_forwards]`}
                style={{ animationDelay: `${i * 80 + 200}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/80 border border-white shadow-sm flex items-center justify-center" style={{ color: card.accent }}>
                    {card.icon}
                  </div>
                  <div className={`w-2 h-2 rounded-full ${card.dot}`} style={{ animation: 'breathe 3s ease-in-out infinite' }} />
                </div>

                <div className="flex items-end gap-1">
                  <span className="font-serif-disp text-3xl sm:text-4xl text-gray-900 leading-none">{card.value}</span>
                  {card.suffix && <span className="text-sm text-gray-400 mb-1">{card.suffix}</span>}
                </div>

                <p className="mt-1 text-xs font-semibold tracking-wide uppercase" style={{ color: card.accent }}>{card.title}</p>
                <p className="mt-1 text-xs text-gray-500">{card.note}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 mb-8">

            <div className="xl:col-span-8 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/80 shadow-xl overflow-hidden opacity-0 animate-[fadeUp_0.6s_ease_0.4s_forwards]">
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg,#0d9488,#0ea5e9)' }} />
              <div className="p-5 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div>
                    <h2 className="font-serif-disp text-xl sm:text-2xl text-gray-900">Recent Reports</h2>
                    <p className="text-xs text-gray-400 mt-0.5 tracking-wide">Latest uploaded medical reports</p>
                  </div>
                  <Link to="/health-history"
                    className="inline-flex w-fit items-center gap-1.5 rounded-xl bg-gray-50 border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-white hover:shadow-md transition-all">
                    View all
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {dashboardData?.recentReports?.length > 0 && (
                  <div className="hidden sm:grid grid-cols-12 gap-3 px-4 mb-2">
                    <span className="col-span-6 text-[10px] font-bold tracking-widest uppercase text-gray-400">Report Name</span>
                    <span className="col-span-3 text-[10px] font-bold tracking-widest uppercase text-gray-400">Date</span>
                    <span className="col-span-3 text-[10px] font-bold tracking-widest uppercase text-gray-400 text-right">Status</span>
                  </div>
                )}

                <div className="space-y-2">
                  {dashboardData?.recentReports?.length > 0 ? (
                    dashboardData.recentReports.map((report, idx) => (
                      <div
                        key={report._id}
                        className="report-row group flex flex-col gap-2 sm:grid sm:grid-cols-12 sm:gap-3 sm:items-center rounded-2xl border border-gray-100 bg-gray-50/60 px-4 py-3.5 hover:bg-white hover:border-teal-100 hover:shadow-lg transition-all duration-200"
                        style={{ animationDelay: `${idx * 60}ms` }}
                      >
                        <div className="sm:col-span-6 flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 truncate">{report.name}</span>
                        </div>
                        <p className="sm:col-span-3 text-xs text-gray-400 pl-11 sm:pl-0">{report.date}</p>
                        <div className="sm:col-span-3 flex sm:justify-end pl-11 sm:pl-0">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            report.status === "Analyzed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${report.status === "Analyzed" ? "bg-emerald-500" : "bg-amber-500"}`} />
                            {report.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-10 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-gray-100 mx-auto mb-3 flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-400">No reports uploaded yet</p>
                      <p className="text-xs text-gray-300 mt-1">Upload your first medical report to get started</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="xl:col-span-4 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/80 shadow-xl overflow-hidden opacity-0 animate-[fadeUp_0.6s_ease_0.5s_forwards]">
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg,#f43f5e,#fb923c)' }} />
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-red-500" style={{ animation: 'pulseRing 2s ease-in-out infinite' }} />
                  </div>
                  <h2 className="font-serif-disp text-xl sm:text-2xl text-gray-900">Health Alerts</h2>
                </div>
                <p className="text-xs text-gray-400 mb-6 pl-11 -mt-0.5 tracking-wide">Important warnings and observations</p>

                <div className="space-y-3">
                  {dashboardData?.alerts?.length > 0 ? (
                    dashboardData.alerts.map((alert, i) => (
                      <div
                        key={i}
                        className="alert-item rounded-2xl border border-red-100 bg-red-50/80 p-4 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
                        style={{ animationDelay: `${i * 80}ms` }}
                      >
                        <div className="flex gap-3">
                          <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                          </svg>
                          <p className="text-sm leading-relaxed text-red-700">{alert}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/60 p-8 text-center">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 mx-auto mb-3 flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-emerald-700">All clear!</p>
                      <p className="text-xs text-emerald-500 mt-0.5">No health alerts right now</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                to: "/report-analysis",
                tag: "Analytics",
                tagColor: "text-sky-700 bg-sky-50 border-sky-200",
                accent: "#0ea5e9",
                gradFrom: "#e0f2fe",
                gradTo: "#bae6fd",
                title: "Report Analysis",
                desc: "Check extracted health parameters and their explanations.",
                delay: "600ms",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
              },
              {
                to: "/health-insights",
                tag: "AI Insights",
                tagColor: "text-violet-700 bg-violet-50 border-violet-200",
                accent: "#8b5cf6",
                gradFrom: "#ede9fe",
                gradTo: "#ddd6fe",
                title: "Health Insights",
                desc: "View patterns, comparisons, and health visualizations.",
                delay: "700ms",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                to: "/diet-plan",
                tag: "Diet & Care",
                tagColor: "text-amber-700 bg-amber-50 border-amber-200",
                accent: "#f59e0b",
                gradFrom: "#fef3c7",
                gradTo: "#fde68a",
                title: "Diet Plan",
                desc: "Get food recommendations based on your health report.",
                delay: "800ms",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-md shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden opacity-0 animate-[fadeUp_0.6s_ease_forwards]"
                style={{ animationDelay: item.delay }}
              >
                <div className="h-28 relative overflow-hidden flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg,${item.gradFrom},${item.gradTo})` }}>
                  <div className="w-14 h-14 rounded-2xl bg-white/70 backdrop-blur shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ color: item.accent }}>
                    {item.icon}
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-white/20" />
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-white/20" />
                </div>

                <div className="p-5">
                  <span className={`inline-flex text-[10px] font-bold tracking-widest uppercase border rounded-full px-2.5 py-1 ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <h3 className="font-serif-disp text-xl text-gray-900 mt-3">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{item.desc}</p>

                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold" style={{ color: item.accent }}>
                    Explore
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </BgWrapper>
  );
};

export default Dashboard;