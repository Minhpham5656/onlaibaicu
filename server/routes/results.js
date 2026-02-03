const express = require("express");
const { submitResult } = require("../controllers/resultController");

const router = express.Router();

router.post("/", submitResult);

module.exports = router;
