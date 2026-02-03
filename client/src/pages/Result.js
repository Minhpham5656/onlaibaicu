import React from "react";
import { Link, useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const result = location.state;

  if (!result) {
    return (
      <div className="container">
        <div className="card">
          <h2>No result data</h2>
          <Link className="button" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Your Score: {result.score}</h1>
        <p>
          Correct: {result.correctCount} / {result.totalQuestions}
        </p>
        <Link className="button" to="/">
          Take another test
        </Link>
      </div>

      <div className="card">
        <h2>Corrections</h2>
        {result.corrections.map((correction) => (
          <div key={correction.questionId} style={{ marginBottom: "16px" }}>
            <p>
              <strong>Answer:</strong> {correction.correctAnswer}
            </p>
            <p>
              <strong>Explanation:</strong> {correction.explanation || "N/A"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {correction.isCorrect ? "Correct" : "Incorrect"}
            </p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
