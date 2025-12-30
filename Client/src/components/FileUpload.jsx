import { useState } from "react";
import api from "../api/axios";

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      await api.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Upload successful!");
      setFile(null);

      // 🔥 dashboard ko bol rahe: files dubara load karo
      onUploadSuccess();
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input type="file" onChange={handleFileChange} />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default FileUpload;
