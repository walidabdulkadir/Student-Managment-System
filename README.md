# Student Management System

A simple, modular Student Management System (SMS) with a Node.js backend and a lightweight frontend. This repository provides a minimal, extensible foundation for managing student records, demonstrating best practices for project structure, setup, and local development.

---

## Features

- CRUD operations for student records (create, read, update, delete)
- Minimal REST API implemented in `backend/server.js`
- Static frontend demonstrating usage in `frontend/` (`index.html`, `script.js`, `style.css`)
- Easy to run locally for development and testing

## Tech Stack

- Backend: Node.js, Express (see `backend/package.json`)
- Frontend: Plain HTML, CSS, and JavaScript

## Repository Structure

- `backend/` — Node.js backend and API server
- `frontend/` — Static frontend (single-page) demonstrating integration

## Prerequisites

- Node.js (LTS recommended)
- npm (comes with Node.js)

## Local setup and run

1. Install backend dependencies

```bash
cd backend
npm install
```

2. Start the backend server

```bash
npm start
# or
node server.js
```

3. Open the frontend

Open `frontend/index.html` in your browser (double-click or serve the folder with a static server).

Tip: For CORS-free local testing, you can serve the `frontend/` directory with a simple static server, for example:

```bash
npx http-server frontend -p 7000
# then open http://localhost:7000
```

## API Overview

The backend exposes a minimal REST API for student records. Typical endpoints (adjust to match your `server.js` implementation):

- `GET /students` — list all students
- `GET /students/:id` — get a single student
- `POST /students` — create a new student (JSON body)
- `PUT /students/:id` — update a student (JSON body)
- `DELETE /students/:id` — delete a student

Examples (using `curl`):

```bash
# List students
curl http://localhost:7000/students

# Create a student
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com"}' \
  http://localhost:7000/students
```

## Configuration

- Port and other small settings can be configured in `backend/server.js` (or environment variables if already supported).

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository
2. Create a feature branch
3. Implement changes and add tests
4. Open a pull request describing the changes


## Contacts & Support

If you have questions or need help, open an issue in this repository or contact the maintainers.

---
Made By Walid
