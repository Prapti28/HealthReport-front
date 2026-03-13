import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const summaryCards = [
  {
    title: "Health Score",
    value: "72 / 100",
    note: "Overall health condition",
  },
  {
    title: "Reports Uploaded",
    value: "3",
    note: "Total medical reports",
  },
  {
    title: "Abnormal Parameters",
    value: "4",
    note: "Need attention",
  },
  {
    title: "Risk Level",
    value: "Medium",
    note: "Preventive monitoring",
  },
];

const recentReports = [
  {
    id: 1,
    name: "Blood Test Report",
    date: "12 Mar 2026",
    status: "Analyzed",
  },
  {
    id: 2,
    name: "Vitamin Check Report",
    date: "25 Feb 2026",
    status: "Analyzed",
  },
  {
    id: 3,
    name: "Cholesterol Report",
    date: "10 Jan 2026",
    status: "Pending",
  },
];

const alerts = [
  "Hemoglobin is below the normal range.",
  "Cholesterol is slightly higher than recommended.",
  "Vitamin D level may need improvement.",
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <div className="flex">
        <Sidebar/>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="mt-2 text-sm text-gray-600">
              View your health summary, recent reports, and alerts
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
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex flex-col gap-3 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {report.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {report.date}
                    </p>
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
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-5 text-lg font-semibold">Health Alerts</h2>

            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-red-100 bg-red-50 p-4"
                >
                  <p className="text-sm leading-6 text-red-700">
                    {alert}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link
            to="/report-analysis"
            className="rounded-xl border border-gray-200 bg-white p-6 hover:border-gray-300"
          >
            <h3 className="text-lg font-semibold">Report Analysis</h3>

            <p className="mt-2 text-sm text-gray-600">
              View extracted parameters and explanations.
            </p>
          </Link>

          <Link
            to="/health-insights"
            className="rounded-xl border border-gray-200 bg-white p-6 hover:border-gray-300"
          >
            <h3 className="text-lg font-semibold">Health Insights</h3>

            <p className="mt-2 text-sm text-gray-600">
              View health trends and visual analytics.
            </p>
          </Link>

          <Link
            to="/diet-plan"
            className="rounded-xl border border-gray-200 bg-white p-6 hover:border-gray-300"
          >
            <h3 className="text-lg font-semibold">Diet Plan</h3>

            <p className="mt-2 text-sm text-gray-600">
              Get personalized food recommendations.
            </p>
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;