// Minimal backend: serves the content (data.json) and saves progress (marks.json).
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

const DATA_FILE = path.join(__dirname, "data.json");
const MARKS_FILE = path.join(__dirname, "marks.json");

// --- tiny helpers to read / write JSON files ---
const readJSON = (file, fallback) => {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch { return fallback; }
};
const writeJSON = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// --- content ---
app.get("/api/data", (req, res) => res.json(readJSON(DATA_FILE, {})));

// Replace all content at once (handy for importing your 28/16/5/4 items)
app.put("/api/data", (req, res) => {
  writeJSON(DATA_FILE, req.body);
  res.json({ ok: true });
});

// --- progress (marks) ---
app.get("/api/marks", (req, res) => res.json(readJSON(MARKS_FILE, {})));

// body: { key: "definition:Closure", status: "know" | "explained" | "mastered" | null }
app.put("/api/marks", (req, res) => {
  const { key, status } = req.body;
  const marks = readJSON(MARKS_FILE, {});
  if (status) marks[key] = status;
  else delete marks[key];
  writeJSON(MARKS_FILE, marks);
  res.json(marks);
});

// Reset every mark inside one category
app.delete("/api/marks/:category", (req, res) => {
  const marks = readJSON(MARKS_FILE, {});
  Object.keys(marks).forEach((k) => {
    if (k.startsWith(req.params.category + ":")) delete marks[k];
  });
  writeJSON(MARKS_FILE, marks);
  res.json(marks);
});

// Production: also serve the built React app
app.use(express.static(path.join(__dirname, "../client/dist")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
