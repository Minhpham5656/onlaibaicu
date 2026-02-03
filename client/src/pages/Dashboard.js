import React, { useEffect, useState } from "react";
import { deleteTest, fetchTests, uploadTestFile } from "../services/api";

const Dashboard = () => {
  const [tests, setTests] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const loadTests = () => {
    fetchTests()
      .then((response) => setTests(response.data.data))
      .catch(() => setMessage("Unable to load tests."));
  };

  useEffect(() => {
    loadTests();
  }, []);

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      await uploadTestFile(formData);
      setMessage("Upload successful.");
      setFile(null);
      loadTests();
    } catch (error) {
      setMessage("Upload failed. Please check the file format.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTest(id);
      loadTests();
    } catch (error) {
      setMessage("Delete failed.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Admin Dashboard</h1>
        {message && <p className="notice">{message}</p>}
        <form onSubmit={handleUpload}>
          <input
            className="input"
            type="file"
            accept=".xlsx,.xls"
            onChange={(event) => setFile(event.target.files[0])}
          />
          <div style={{ marginTop: "16px" }}>
            <button type="submit" className="button">
              Upload Test File
            </button>
          </div>
        </form>
      </div>

      <div className="grid">
        {tests.map((test) => (
          <div key={test._id} className="card">
            <h3>{test.name}</h3>
            <button
              type="button"
              className="button secondary"
              onClick={() => handleDelete(test._id)}
            >
              Delete Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
