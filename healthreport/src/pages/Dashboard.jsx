import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
//import { getDashboardData } from "../services/healthService";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <div className="mx-auto max-w-6xl px-6 py-10">
              <p className="text-sm text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <div className="mx-auto max-w-6xl px-6 py-10">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const summaryCards = [
    {
      title: "Health Score",
      value: `${dashboardData.healthScore} / 100`,
      note: "Overall health condition",
    },
    {
      title: "Reports Uploaded",
      value: dashboardData.reportCount,
      note: "Total medical reports",
    },
    {
      title: "Abnormal Parameters",
      value: dashboardData.abnormalParametersCount,
      note: "Need attention",
    },
    {
      title: "Risk Level",
      value: dashboardData.riskLevel,
      note: "Preventive monitoring",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-semibold">Dashboard</h1>
                <p className="mt-2 text-sm text-gray-600">
                  View your health summary, recent reports, and important alerts
                </p>
              </div>

              <Link
                to="/upload-report"
                className="w-fit rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Upload Report
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {summaryCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <h2 className="mt-2 text-2xl font-semibold">{card.value}</h2>
                  <p className="mt-2 text-sm text-gray-600">{card.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-2">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Recent Reports</h2>
                  <Link
                    to="/health-history"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    View All
                  </Link>
                </div>

                <div className="space-y-4">
                  {dashboardData.recentReports.length > 0 ? (
                    dashboardData.recentReports.map((report) => (
                      <div
                        key={report.id}
                        className="flex flex-col gap-3 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {report.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{report.date}</p>
                        </div>

                        <span
                          className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                            report.status === "Analyzed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {report.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No reports uploaded yet.</p>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h2 className="mb-5 text-lg font-semibold">Health Alerts</h2>

                <div className="space-y-4">
                  {dashboardData.alerts.length > 0 ? (
                    dashboardData.alerts.map((alert, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-red-100 bg-red-50 p-4"
                      >
                        <p className="text-sm leading-6 text-red-700">{alert}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No alerts right now.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <Link
                to="/report-analysis"
                className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-gray-300"
              >
                <h3 className="text-lg font-semibold">Report Analysis</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Check extracted health parameters and their explanations.
                </p>
              </Link>

              <Link
                to="/health-insights"
                className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-gray-300"
              >
                <h3 className="text-lg font-semibold">Health Insights</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  View patterns, comparisons, and health visualizations.
                </p>
              </Link>

              <Link
                to="/diet-plan"
                className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-gray-300"
              >
                <h3 className="text-lg font-semibold">Diet Plan</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Get food recommendations based on your health report.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;