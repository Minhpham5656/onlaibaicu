const express = require("express");
const { getTests, getQuestionsByTest, deleteTest } = require("../controllers/testController");

const router = express.Router();

router.get("/", getTests);
router.get("/:id", getQuestionsByTest);
router.delete("/:id", deleteTest);

module.exports = router;
