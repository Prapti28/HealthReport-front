import { Link } from "react-router-dom";

const ReportCard = ({ report }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {report.reportName}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Uploaded on {report.date}
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

      <div className="mt-4 grid grid-cols-2 gap-4">
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
      </div>

      <div className="mt-5">
        <Link
          to={`/report-analysis/${report.id}`}
          className="inline-block rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          View Analysis
        </Link>
      </div>
    </div>
  );
};

export default ReportCard;