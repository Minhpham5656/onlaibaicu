import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQuestions, submitResult } from "../services/api";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
import ProgressBar from "../components/ProgressBar";

const Test = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchQuestions(id)
      .then((response) => setQuestions(response.data.questions || []))
      .catch(() => setError("Unable to load questions."))
      .finally(() => setLoading(false));
  }, [id]);

  const total = questions.length;
  const answeredCount = useMemo(
    () => Object.values(answers).filter((value) => value).length,
    [answers]
  );

  const handleSubmit = async () => {
    try {
      const payload = {
        testId: id,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
      };
      const response = await submitResult(payload);
      navigate("/result", { state: response.data });
    } catch (submitError) {
      setError("Submission failed. Please try again.");
    }
  };

  if (loading) {
    return <div className="container">Loading questions...</div>;
  }

  return (
    <div className="container">
      <h1>Test Session</h1>
      {error && <p className="notice">{error}</p>}
      <Timer duration={1800} onComplete={handleSubmit} />
      <ProgressBar current={answeredCount} total={total} />

      {questions.map((question, index) => (
        <QuestionCard
          key={question._id}
          question={question}
          index={index}
          selected={answers[question._id]}
          onSelect={(value) =>
            setAnswers((prev) => ({
              ...prev,
              [question._id]: value,
            }))
          }
        />
      ))}

      <button type="button" className="button" onClick={handleSubmit}>
        Submit Test
      </button>
    </div>
  );
};

export default Test;
