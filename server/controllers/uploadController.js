const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const Test = require("../models/Test");
const Question = require("../models/Question");
const { validateQuestions, normalize } = require("../utils/validateQuestions");

const uploadQuestions = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const validation = validateQuestions(rows);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    const testName = path.basename(req.file.originalname, path.extname(req.file.originalname));
    const test = await Test.create({ name: testName });

    const questions = rows.map((row) => {
      const options = [normalize(row.A), normalize(row.B), normalize(row.C), normalize(row.D)].filter(
        (value) => value
      );

      return {
        testId: test._id,
        type: normalize(row.type),
        question: normalize(row.question),
        options,
        answer: normalize(row.answer),
        explanation: normalize(row.explanation),
      };
    });

    await Question.insertMany(questions);

    return res.status(201).json({ message: "Upload successful.", testId: test._id });
  } catch (error) {
    return res.status(500).json({ message: "Failed to upload file." });
  } finally {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, () => null);
    }
  }
};

module.exports = { uploadQuestions };
