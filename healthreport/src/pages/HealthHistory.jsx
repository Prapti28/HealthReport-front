import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
//import { getHealthHistory } from "../services/healthService";

const HealthHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHealthHistory();
        setHistoryData(data.reports || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load health history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-sm text-gray-600">Loading health history...</p>
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

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Health History</h1>
          <p className="mt-2 text-sm text-gray-600">
            Track your previous reports and monitor health changes over time
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Uploaded Reports</h2>
            <Link
              to="/upload-report"
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Upload Report
            </Link>
          </div>

          {historyData.length > 0 ? (
            <div className="space-y-4">
              {historyData.map((report) => (
                <div
                  key={report.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {report.reportName}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Uploaded on {report.date}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:w-auto">
                      <div>
                        <p className="text-xs text-gray-500">Health Score</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {report.healthScore} / 100
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Risk Level</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {report.riskLevel}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <span
                          className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                            report.status === "Analyzed"
                              ? "bg-green-100 text-green-700"
                              : report.status === "Uploaded"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {report.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      to={`/report-analysis/${report.id}`}
                      className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      View Analysis
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No reports found yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthHistory;