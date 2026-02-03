# English Test System

Full-stack English revision testing web application with React frontend and Node.js/Express backend.

## Repository Structure

```
english-test-system/
├── client/   # React frontend
├── server/   # Node.js backend
└── README.md
```

## Backend Setup (server)

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

### Environment Variables

```
PORT=5000
MONGO_URI=your_mongodb_connection
ADMIN_USER=admin
ADMIN_PASS=123456
```

## Frontend Setup (client)

```bash
cd client
npm install
npm start
```

## API Endpoints

| Method | Route            | Purpose            |
| ------ | ---------------- | ------------------ |
| GET    | /api/tests       | Get all tests      |
| GET    | /api/tests/:id   | Get questions      |
| POST   | /api/upload      | Upload Excel file  |
| DELETE | /api/tests/:id   | Delete test        |
| POST   | /api/results     | Submit result      |

## Excel Format

| id | type | question | A | B | C | D | answer | explanation |

Supported types: `mc`, `fill`, `reorder`, `error`.

## Scripts

### Backend

- `npm run dev` - start server with nodemon
- `npm start` - start server

### Frontend

- `npm start` - start development server
- `npm run build` - build for production
