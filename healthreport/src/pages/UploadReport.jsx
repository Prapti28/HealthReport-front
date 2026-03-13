import Navbar from "../components/layout/Navbar";
import UploadReportBox from "../components/report/UploadReportBox";

const UploadReport = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Upload Report</h1>
          <p className="mt-2 text-sm text-gray-600">
            Upload your medical report in PDF or image format for analysis
          </p>
        </div>

        <UploadReportBox />
      </div>
    </div>
  );
};

export default UploadReport;