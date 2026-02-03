import React from "react";

const QuestionCard = ({ question, index, selected, onSelect }) => {
  return (
    <div className="card">
      <h3>
        Question {index + 1} <span className="badge">{question.type}</span>
      </h3>
      <p>{question.question}</p>
      {question.type === "mc" ? (
        <div className="grid">
          {question.options.map((option) => (
            <button
              key={option}
              type="button"
              className={`button ${selected === option ? "secondary" : ""}`}
              onClick={() => onSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <input
          className="input"
          value={selected || ""}
          onChange={(event) => onSelect(event.target.value)}
          placeholder="Type your answer"
        />
      )}
    </div>
  );
};

export default QuestionCard;
