import { useState } from "react";
//import { uploadReport } from "../../services/reportService";

const UploadReportBox = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setSuccess("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a report file");
      return;
    }

    const formData = new FormData();
    formData.append("report", file);

    try {
      setLoading(true);
      const data = await uploadReport(formData);

      setSuccess("Report uploaded successfully");
      setFile(null);

      if (onUploadSuccess) {
        onUploadSuccess(data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">Upload Medical Report</h2>

      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="text-sm"
        />

        {file && (
          <p className="text-sm text-gray-600">
            Selected file: <span className="font-medium">{file.name}</span>
          </p>
        )}

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {success && (
          <p className="text-sm text-green-600">{success}</p>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-fit rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload Report"}
        </button>
      </div>
    </div>
  );
};

export default UploadReportBox;