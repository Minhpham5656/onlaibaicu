import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTests } from "../services/api";

const Home = () => {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTests()
      .then((response) => setTests(response.data.data))
      .catch(() => setError("Unable to load tests."));
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>English Revision Tests</h1>
        <p>Choose a test to start your practice session.</p>
        {error && <p className="notice">{error}</p>}
      </div>

      <div className="grid">
        {tests.map((test) => (
          <div key={test._id} className="card">
            <h3>{test.name}</h3>
            <Link className="button" to={`/test/${test._id}`}>
              Start Test
            </Link>
          </div>
        ))}
        {!tests.length && !error && (
          <div className="card">No tests available yet.</div>
        )}
      </div>
    </div>
  );
};

export default Home;
