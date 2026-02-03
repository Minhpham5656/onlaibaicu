const Test = require("../models/Test");
const Question = require("../models/Question");
const shuffle = require("../utils/shuffle");

const getTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({ createdAt: -1 });
    return res.json({ data: tests });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch tests." });
  }
};

const getQuestionsByTest = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Test.findById(id);
    if (!test) {
      return res.status(404).json({ message: "Test not found." });
    }

    const questions = await Question.find({ testId: id });
    const shuffledQuestions = shuffle(questions).map((question) => {
      if (question.type === "mc" && question.options.length > 0) {
        return {
          ...question.toObject(),
          options: shuffle(question.options),
        };
      }
      return question;
    });

    return res.json({ test, questions: shuffledQuestions });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch questions." });
  }
};

const deleteTest = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Test.findById(id);
    if (!test) {
      return res.status(404).json({ message: "Test not found." });
    }

    await Question.deleteMany({ testId: id });
    await Test.findByIdAndDelete(id);
    return res.json({ message: "Test deleted." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete test." });
  }
};

module.exports = {
  getTests,
  getQuestionsByTest,
  deleteTest,
};
