import { useEffect, useState } from "react";
import api from "../api/axios";
import FileUpload from "../components/FileUpload";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
<ToastContainer position="top-right" autoClose={3000} />

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await api.get(`/files?page=${pageNumber}&limit=5`);

      setFiles(res.data.files);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch files", error);
    } finally {
      setLoading(false);
    }
  };
  const handleShare = async (fileId) => {
  try {
    const res = await api.post(`/share/${fileId}`);

    const shareUrl = res.data.shareUrl;

    // 🔥 Clipboard me copy
    await navigator.clipboard.writeText(shareUrl);
         toast.success("Share link copied to clipboard");
  } catch (error) {
    console.error("Share failed", error);
    alert("Failed to create share link");
  }
};


  // 🔥 Page load hote hi API call
  useEffect(() => {
    fetchFiles(1);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Files</h2>
     <FileUpload onUploadSuccess={() => fetchFiles(page)} />

      {loading && <p>Loading...</p>}

      {!loading && files.length === 0 && <p>No files found</p>}

      <ul>
        {files.map((file) => (
          <li key={file._id} style={{ marginBottom: "10px" }}>
            <strong>{file.originalName}</strong>

            <button
    style={{ marginLeft: "10px" }}
    onClick={() => handleShare(file._id)}
  >
    Share
  </button>
          </li>
        ))}
      </ul>

      {/* PAGINATION */}
      <div style={{ marginTop: "20px" }}>
        <button
          disabled={page === 1}
          onClick={() => fetchFiles(page - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => fetchFiles(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
