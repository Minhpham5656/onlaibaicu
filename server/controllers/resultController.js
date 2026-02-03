const Question = require("../models/Question");
const Result = require("../models/Result");

const submitResult = async (req, res) => {
  try {
    const { testId, answers } = req.body;
    if (!testId || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid payload." });
    }

    const questions = await Question.find({ testId });
    if (!questions.length) {
      return res.status(404).json({ message: "Questions not found." });
    }

    const normalizedAnswers = answers.map((answer) => ({
      questionId: answer.questionId,
      answer: `${answer.answer || ""}`.trim(),
    }));

    let correctCount = 0;
    const corrections = questions.map((question) => {
      const submitted = normalizedAnswers.find(
        (answer) => `${answer.questionId}` === `${question._id}`
      );
      const isCorrect = submitted && submitted.answer === question.answer;
      if (isCorrect) {
        correctCount += 1;
      }

      return {
        questionId: question._id,
        correctAnswer: question.answer,
        explanation: question.explanation,
        isCorrect,
      };
    });

    const score = Number(((correctCount / questions.length) * 10).toFixed(2));
    const result = await Result.create({
      testId,
      score,
      answers: normalizedAnswers,
    });

    return res.json({
      resultId: result._id,
      score,
      correctCount,
      totalQuestions: questions.length,
      corrections,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to submit result." });
  }
};

module.exports = { submitResult };
