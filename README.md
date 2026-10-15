# Concept Tracker (React + Express)

## Run
```bash
# terminal 1 - backend (port 5000)
cd server && npm install && npm start

# terminal 2 - frontend (port 5173)
cd client && npm install && npm run dev
```
Open http://localhost:5173

## Add your content
Edit `server/data.json` and refresh the page, or replace everything at once:
```bash
curl -X PUT http://localhost:5000/api/data -H "Content-Type: application/json" -d @my-data.json
```
Definition items also have a `definition` field. Shape: `{ "definition": [...], "comparison": [...], "process": [...], "multiple": [...] }`
Every item needs a unique `title` (used to save progress) plus the field keys from `client/src/config.js`.

## Production (one server)
```bash
cd client && npm run build
cd ../server && npm start     # serves API + built app on http://localhost:5000
```

## Structure
```
server/index.js   backend (API)      server/data.json  content      server/marks.json  progress
client/src/App.jsx   the ENTIRE frontend in one file (config, hooks, components, pages, CSS, start-up)
client/index.html    loads App.jsx
```
Sections inside App.jsx: 1 config, 2 helpers, 3 hooks, 4 content blocks, 5 small components, 6 list views, 7 pages, 8 app, 9 styles (CSS), 10 start.
