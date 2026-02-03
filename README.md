# English Test System (Monorepo)

A full-stack English revision testing web app for high school students. This repository is structured as a monorepo with a React frontend and Node.js backend.

---

## 1. 🎯 System Purpose

Build a full-stack web app where:

- Students take English revision tests online.
- System grades automatically.
- Teachers upload a file to change the question bank.
- No coding knowledge required for teachers.

---

## 2. 👥 User Roles

**Student**
- Select test
- Answer questions
- See score + corrections

**Teacher (Admin)**
- Login
- Upload Excel/JSON question file
- Manage test sets

---

## 3. 🏗 Project Architecture

Monorepo structure:

```
english-test-system/
│
├── client/   (React frontend)
├── server/   (Node.js backend)
├── .gitignore
└── README.md
```

---

## 4. 🚀 GitHub Setup Guide (Basic Repo Initialization)

```bash
git clone <repo_url>
cd english-test-system

mkdir client server

git add .
git commit -m "init project structure"
git push origin main
```

Branch model:
- `main` → production
- `dev` → development
- `feature/*` → new features
- `fix/*` → bug fixes

---

## 5. ⚙️ Backend (server/)

### Install

```bash
cd server
npm init -y
npm install express mongoose cors multer xlsx dotenv
npm install nodemon --save-dev
```

### Folder structure

```
server/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── uploads/
└── server.js
```

### Database Models (MongoDB)

**Test**
- name: String
- createdAt: Date

**Question**
- testId: ObjectId
- type: mc | fill | reorder | error
- question: String
- options: [String]
- answer: String
- explanation: String

**Result**
- testId: ObjectId
- score: Number
- answers: Array
- createdAt: Date

---

## 6. 📂 Question File Format

Excel columns:

| id | type | question | A | B | C | D | answer | explanation |

Rules:
- `mc` → use A–D
- `fill` → answer text
- `reorder` → full correct sentence
- `error` → wrong word

---

## 7. 📤 File Upload Logic (Excel)

Steps:
1. Teacher uploads file
2. Backend reads Excel using `xlsx`
3. Convert to JSON
4. Validate columns
5. Create new `Test` record
6. Insert `Questions`

Reject file if:
- Missing columns
- Wrong type
- Empty answer

---

## 8. 🔌 API Endpoints

| Method | Route            | Function            |
|--------|------------------|---------------------|
| GET    | /api/tests       | Get tests           |
| GET    | /api/tests/:id   | Get questions       |
| POST   | /api/upload      | Upload file         |
| DELETE | /api/tests/:id   | Delete test         |
| POST   | /api/results     | Submit answers      |

All APIs must return JSON.

---

## 9. 🧮 Grading Logic

```
correctCount = number of correct answers
score = (correctCount / totalQuestions) * 10
```

Return:
- score
- correct answers
- explanations

---

## 10. 💻 Frontend (client/)

### Setup

```bash
npx create-react-app client
cd client
npm install axios react-router-dom
```

### Pages

| Page       | Purpose         |
|------------|------------------|
| Home       | Start test       |
| Test       | Do questions     |
| Result     | Show score       |
| AdminLogin | Teacher login    |
| Dashboard  | Upload file      |

### UI Flow

Student Flow:

```
Home → Test → Result
```

Admin Flow:

```
AdminLogin → Dashboard → Upload
```

---

## 11. 🔁 Randomization

- Shuffle question order
- Shuffle answer options

---

## 12. 🔒 Environment Config

`server/.env`

```
PORT=5000
MONGO_URI=your_connection
ADMIN_USER=admin
ADMIN_PASS=123456
```

---

## 13. 🎨 UI Requirements

- Simple
- Mobile responsive
- Large text
- Blue/white theme

---

## 14. 🧠 Coding Rules

- Use MVC
- Modular code
- Comment functions
- Error handling
- Async/await
- Return JSON only
- Production-ready structure

---

## 15. 💎 Bonus Features (Optional)

- Leaderboard
- Analytics
- Difficulty levels
- Student accounts

---

## 16. ✅ Run Project

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm start
```
```
