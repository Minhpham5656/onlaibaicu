const REQUIRED_COLUMNS = [
  "id",
  "type",
  "question",
  "A",
  "B",
  "C",
  "D",
  "answer",
  "explanation",
];

const VALID_TYPES = new Set(["mc", "fill", "reorder", "error"]);

const normalize = (value) => (value === undefined || value === null ? "" : `${value}`.trim());

const validateQuestions = (rows) => {
  if (!Array.isArray(rows) || rows.length === 0) {
    return { valid: false, message: "File is empty or invalid." };
  }

  const missingColumns = REQUIRED_COLUMNS.filter(
    (column) => !Object.prototype.hasOwnProperty.call(rows[0], column)
  );

  if (missingColumns.length > 0) {
    return {
      valid: false,
      message: `Missing columns: ${missingColumns.join(", ")}`,
    };
  }

  for (const [index, row] of rows.entries()) {
    const type = normalize(row.type);
    const question = normalize(row.question);
    const answer = normalize(row.answer);

    if (!VALID_TYPES.has(type)) {
      return {
        valid: false,
        message: `Invalid type at row ${index + 1}.`,
      };
    }

    if (!question) {
      return {
        valid: false,
        message: `Question is required at row ${index + 1}.`,
      };
    }

    if (!answer) {
      return {
        valid: false,
        message: `Answer is required at row ${index + 1}.`,
      };
    }
  }

  return { valid: true };
};

module.exports = { REQUIRED_COLUMNS, validateQuestions, normalize };
