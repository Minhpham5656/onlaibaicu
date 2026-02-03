const express = require("express");
const upload = require("../middleware/upload");
const { uploadQuestions } = require("../controllers/uploadController");

const router = express.Router();

router.post("/", upload.single("file"), uploadQuestions);

module.exports = router;
