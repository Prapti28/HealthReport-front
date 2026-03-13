import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
//import { getHealthInsights } from "../services/healthService";

const HealthInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await getHealthInsights();
        setInsights(data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load health insights",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(135deg,#f8fffe,#f0f9ff,#faf5ff)]">
        <Navbar />
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="animate-pulse text-sm text-gray-600">
            Loading health insights...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[linear-gradient(135deg,#f8fffe,#f0f9ff,#faf5ff)]">
        <Navbar />
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f8fffe,#f0f9ff,#faf5ff)] text-gray-900">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          {/* HEADER */}

          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">
              Health Insights
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              AI-powered analysis of your medical reports
            </p>
          </div>

          {/* SUMMARY CARDS */}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white/80 backdrop-blur border border-white/70 p-6 shadow-lg hover:shadow-xl transition">
              <p className="text-sm text-gray-500">Health Score</p>

              <h2 className="mt-2 text-3xl font-bold text-teal-600">
                {insights.healthScore}
              </h2>

              <p className="text-xs text-gray-500 mt-1">out of 100</p>
            </div>

            <div className="rounded-2xl bg-white/80 backdrop-blur border border-white/70 p-6 shadow-lg hover:shadow-xl transition">
              <p className="text-sm text-gray-500">Risk Level</p>

              <h2 className="mt-2 text-3xl font-bold text-purple-600">
                {insights.riskLevel}
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                preventive monitoring
              </p>
            </div>

            <div className="rounded-2xl bg-white/80 backdrop-blur border border-white/70 p-6 shadow-lg hover:shadow-xl transition">
              <p className="text-sm text-gray-500">Abnormal Parameters</p>

              <h2 className="mt-2 text-3xl font-bold text-red-500">
                {insights.abnormalParameters.length}
              </h2>

              <p className="text-xs text-gray-500 mt-1">need attention</p>
            </div>

            <div className="rounded-2xl bg-white/80 backdrop-blur border border-white/70 p-6 shadow-lg hover:shadow-xl transition">
              <p className="text-sm text-gray-500">Alerts</p>

              <h2 className="mt-2 text-3xl font-bold text-orange-500">
                {insights.alerts.length}
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                important observations
              </p>
            </div>
          </div>

          {/* ABNORMAL PARAMETERS */}

          <div className="mt-10 grid gap-8 ">
            <div className="rounded-2xl bg-white/80 backdrop-blur border border-white/70 p-7 shadow-lg">
              <h2 className="text-xl font-semibold mb-6">
                Abnormal Parameters
              </h2>

              {insights.abnormalParameters.length > 0 ? (
                <div className="space-y-5">
                  {insights.abnormalParameters.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-gray-200 p-5 hover:shadow-md transition"
                    >
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>

                          <p className="text-sm text-gray-500">
                            Normal Range: {item.normalRange}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            item.status === "Low"
                              ? "bg-red-100 text-red-700"
                              : item.status === "High"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <p className="mt-3 text-sm font-medium text-gray-800">
                        Current Value: {item.value}
                      </p>

                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                        {item.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No abnormal parameters found.
                </p>
              )}
            </div>

            {/* AI SUMMARY */}

            <div className="space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 p-7 shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-purple-700">
                  AI Summary
                </h2>

                <p className="text-gray-700 leading-relaxed text-[15px]">
                  {insights.summary}
                </p>
              </div>

              {/* ALERTS */}

              <div className="rounded-2xl bg-white/80 backdrop-blur-lg border border-white/70 shadow-xl overflow-hidden">
  {/* Accent strip */}
  <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#0284c7,#0ea5e9,#38bdf8)" }} />

  <div className="p-6 sm:p-7">
    {/* Header */}
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: "Sora, sans-serif" }}>
          Alerts
        </h2>
        {insights.alerts.length > 0 && (
          <p className="text-xs text-sky-600 font-medium mt-0.5">
            {insights.alerts.length} active alert{insights.alerts.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>
      {insights.alerts.length > 0 && (
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-200 px-2.5 py-1 text-[11px] font-semibold text-sky-700">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          Live
        </span>
      )}
    </div>

    {/* Alert list */}
    {insights.alerts.length > 0 ? (
      <div className="space-y-3">
        {insights.alerts.map((alert, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50/80 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-sky-200"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="w-7 h-7 rounded-lg bg-white border border-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
              <svg className="w-3.5 h-3.5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-sky-800 leading-relaxed">{alert}</p>
          </div>
        ))}
      </div>
    ) : (
      <div className="rounded-2xl border border-dashed border-sky-200 bg-sky-50/50 p-8 text-center">
        <div className="w-10 h-10 rounded-xl bg-sky-100 mx-auto mb-3 flex items-center justify-center">
          <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-sky-700">No alerts available</p>
        <p className="text-xs text-sky-500 mt-0.5">Everything looks clear right now</p>
      </div>
    )}
  </div>
</div>
            </div>
          </div>

          {/* PARAMETER COMPARISON */}

          <div className="mt-10 rounded-2xl bg-white/80 backdrop-blur border border-white/70 p-7 shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Parameter Comparison</h2>

            {insights.comparisonData.length > 0 ? (
              <div className="space-y-6">
                {insights.comparisonData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <p className="font-medium">{item.name}</p>

                      <p className="text-sm text-gray-500">
                        {item.userValue} / {item.normalValue}
                      </p>
                    </div>

                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-teal-500 to-sky-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No comparison data available.
              </p>
            )}
          </div>

          {/* HEALTH TRENDS */}

          <div className="mt-10 rounded-2xl bg-white/80 backdrop-blur border border-white/70 p-7 shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Health Trends</h2>

            {insights.trendData.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-3">
                {insights.trendData.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-gray-200 p-5 hover:shadow-md transition"
                  >
                    <h3 className="font-semibold mb-3">{item.name}</h3>

                    <div className="space-y-2">
                      {item.values.map((value, valueIndex) => (
                        <div
                          key={valueIndex}
                          className="flex justify-between text-sm text-gray-600"
                        >
                          <span>{value.month}</span>
                          <span className="font-medium">{value.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No trend data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthInsights;