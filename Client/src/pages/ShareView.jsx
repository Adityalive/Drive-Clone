import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShareView = () => {
  const { token } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedFile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/share/${token}`
        );

        setFile(res.data);
      } catch (err) {
        setError("Invalid or expired link");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedFile();
  }, [token]);

  if (loading) return <p>Loading file...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shared File</h2>

      <p>
        <strong>{file.fileName}</strong>
      </p>

      <a href={file.url} target="_blank" rel="noreferrer">
        Open / Download
      </a>
    </div>
  );
};

export default ShareView;
