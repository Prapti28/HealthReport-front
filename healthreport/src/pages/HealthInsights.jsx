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
        setError(err.response?.data?.message || "Failed to load health insights");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-sm text-gray-600">Loading health insights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
    <div className="flex">
      <Sidebar/>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Health Insights</h1>
          <p className="mt-2 text-sm text-gray-600">
            View health patterns, abnormal parameters, and report-based insights
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Health Score</p>
            <h2 className="mt-2 text-2xl font-semibold">
              {insights.healthScore} / 100
            </h2>
            <p className="mt-2 text-sm text-gray-600">Overall health condition</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Risk Level</p>
            <h2 className="mt-2 text-2xl font-semibold">{insights.riskLevel}</h2>
            <p className="mt-2 text-sm text-gray-600">Preventive monitoring</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Abnormal Parameters</p>
            <h2 className="mt-2 text-2xl font-semibold">
              {insights.abnormalParameters.length}
            </h2>
            <p className="mt-2 text-sm text-gray-600">Need attention</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Alerts</p>
            <h2 className="mt-2 text-2xl font-semibold">{insights.alerts.length}</h2>
            <p className="mt-2 text-sm text-gray-600">Important observations</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-5 text-lg font-semibold">Abnormal Parameters</h2>

            {insights.abnormalParameters.length > 0 ? (
              <div className="space-y-4">
                {insights.abnormalParameters.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Normal Range: {item.normalRange}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
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

                    <p className="mt-3 text-sm text-gray-700">
                      Current Value: {item.value}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No abnormal parameters found.</p>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">AI Summary</h2>
              <p className="text-sm leading-6 text-gray-600">
                {insights.summary}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">Alerts</h2>

              {insights.alerts.length > 0 ? (
                <div className="space-y-3">
                  {insights.alerts.map((alert, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-red-100 bg-red-50 p-3"
                    >
                      <p className="text-sm text-red-700">{alert}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No alerts available.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold">Parameter Comparison</h2>

          {insights.comparisonData.length > 0 ? (
            <div className="space-y-4">
              {insights.comparisonData.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.userValue} / {item.normalValue}
                    </p>
                  </div>

                  <div className="h-3 w-full rounded-full bg-gray-200">
                    <div
                      className="h-3 rounded-full bg-gray-900"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No comparison data available.</p>
          )}
        </div>

        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold">Health Trends</h2>

          {insights.trendData.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {insights.trendData.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <h3 className="text-sm font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <div className="mt-3 space-y-2">
                    {item.values.map((value, valueIndex) => (
                      <div
                        key={valueIndex}
                        className="flex items-center justify-between text-sm text-gray-600"
                      >
                        <span>{value.month}</span>
                        <span>{value.value}</span>
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