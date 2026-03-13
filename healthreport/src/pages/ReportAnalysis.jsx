import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
//import { getReportAnalysis } from "../services/reportService";

const ReportAnalysis = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getReportAnalysis(id);
        setReport(data.report);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load report analysis");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-sm text-gray-600">Loading report analysis...</p>
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
          <h1 className="text-3xl font-semibold">Report Analysis</h1>
          <p className="mt-2 text-sm text-gray-600">
            View extracted health parameters and simple explanations
          </p>
        </div>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold">{report.reportName}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{report.status}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Risk Level</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{report.riskLevel}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Health Score</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {report.healthScore} / 100
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-2">
            <h2 className="mb-5 text-lg font-semibold">Extracted Parameters</h2>

            {report.parameters && report.parameters.length > 0 ? (
              <div className="space-y-4">
                {report.parameters.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Normal Range: {item.normalRange}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {item.value}
                        </p>
                        <span
                          className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
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
                    </div>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No extracted parameters available.</p>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">AI Summary</h2>
              <p className="text-sm leading-6 text-gray-600">
                {report.aiSummary || "No AI summary available yet."}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">Alerts</h2>

              {report.alerts && report.alerts.length > 0 ? (
                <div className="space-y-3">
                  {report.alerts.map((alert, index) => (
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
      </div>
    </div>
  );
};

export default ReportAnalysis;