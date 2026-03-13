import { useState } from "react";
import Navbar from "../components/layout/Navbar";
//import { uploadMedicalReport } from "../services/reportService";

const UploadReport = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [reportName, setReportName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!reportName.trim()) {
      setError("Please enter report name");
      return;
    }

    if (!selectedFile) {
      setError("Please select a report file");
      return;
    }

    const formData = new FormData();
    formData.append("reportName", reportName);
    formData.append("report", selectedFile);

    try {
      setLoading(true);
      const data = await uploadMedicalReport(formData);
      setSuccess(data.message || "Report uploaded successfully");
      setReportName("");
      setSelectedFile(null);
      e.target.reset();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload report");
    } finally {
      setLoading(false);
    }
  };

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

        <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Report Name
              </label>
              <input
                type="text"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                placeholder="Enter report name"
                className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-gray-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Select File
              </label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-gray-800"
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Uploading..." : "Upload Report"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadReport;