# PMS - Project Management System

A comprehensive Project Management System with Issue Tracking, Milestones, and Schedule Management features.

## Features

- **Project Management**: Create, update, and manage multiple projects
- **Issue Tracking**: Track issues with status, priority, and assignee management
- **Milestone Management**: Set project milestones with due dates and progress tracking
- **Schedule Management**: Plan and manage project schedules with timeline views
- **Modern UI**: Clean, responsive interface built with React
- **RESTful API**: Well-structured backend API with TypeScript

## Tech Stack

### Backend
- Node.js + Express
- TypeScript
- SQLite (database)
- CORS enabled

### Frontend
- React 18
- TypeScript
- React Router v6
- Axios (API client)
- Vite (build tool)
- date-fns (date formatting)

## Project Structure

```
pms-system/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Type definitions
│   │   ├── routes/          # API routes
│   │   └── index.ts         # Server entry point
│   ├── data/                # SQLite database (auto-generated)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── index.html
│   └── package.json
└── package.json             # Workspace root
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd solideo_13_1_test
```

2. Install dependencies:
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

## Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run them separately:

**Backend (API Server):**
```bash
cd backend
npm run dev
```
Server will run on http://localhost:3001

**Frontend (React App):**
```bash
cd frontend
npm run dev
```
App will run on http://localhost:3000

### Production Build

Build both applications:
```bash
npm run build
```

Build separately:
```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build
```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Issues
- `GET /api/issues` - Get all issues (with query filters)
- `GET /api/issues/:id` - Get issue by ID
- `POST /api/issues` - Create new issue
- `PUT /api/issues/:id` - Update issue
- `DELETE /api/issues/:id` - Delete issue

Query parameters: `project_id`, `milestone_id`, `status`, `priority`

### Milestones
- `GET /api/milestones` - Get all milestones (with query filters)
- `GET /api/milestones/:id` - Get milestone by ID
- `POST /api/milestones` - Create new milestone
- `PUT /api/milestones/:id` - Update milestone
- `DELETE /api/milestones/:id` - Delete milestone

Query parameters: `project_id`

### Schedules
- `GET /api/schedules` - Get all schedules (with query filters)
- `GET /api/schedules/:id` - Get schedule by ID
- `POST /api/schedules` - Create new schedule
- `PUT /api/schedules/:id` - Update schedule
- `DELETE /api/schedules/:id` - Delete schedule

Query parameters: `project_id`, `start_date`, `end_date`

## Usage Guide

### Creating a Project
1. Navigate to the Projects page
2. Click "+ New Project" button
3. Fill in project name, description, and status
4. Click "Create Project"

### Managing Issues
1. Click "View Issues" on any project card
2. Click "+ New Issue" to create an issue
3. Fill in issue details (title, description, priority, assignee, milestone)
4. Use the status dropdown to update issue status
5. Click "Delete" to remove an issue

### Managing Milestones
1. Navigate to the Milestones page
2. Click "+ New Milestone"
3. Set milestone title, description, due date, and status
4. Update milestone status using the dropdown
5. Click "Delete" to remove a milestone

### Managing Schedules
1. Navigate to the Schedules page
2. Click "+ New Schedule"
3. Set schedule details with start and end dates
4. View all schedules in a timeline list
5. Click "Delete" to remove a schedule

## Features in Detail

### Issue Tracking
- Multiple status types: Open, In Progress, Resolved, Closed
- Priority levels: Low, Medium, High, Critical
- Assignee management
- Link issues to milestones
- Filter by project, milestone, status, or priority

### Milestone Management
- Track progress with status updates
- Set due dates for better planning
- Link issues to milestones
- Filter milestones by project

### Schedule Management
- Create time-based schedules
- Set start and end dates/times
- Link schedules to issues
- Filter schedules by date range

## Database Schema

### Projects
- `id`: Primary key
- `name`: Project name
- `description`: Project description
- `status`: active | archived | completed
- `created_at`, `updated_at`: Timestamps

### Issues
- `id`: Primary key
- `project_id`: Foreign key to projects
- `milestone_id`: Foreign key to milestones (optional)
- `title`: Issue title
- `description`: Issue description
- `status`: open | in_progress | resolved | closed
- `priority`: low | medium | high | critical
- `assignee`: Assignee name
- `created_at`, `updated_at`: Timestamps

### Milestones
- `id`: Primary key
- `project_id`: Foreign key to projects
- `title`: Milestone title
- `description`: Milestone description
- `due_date`: Target completion date
- `status`: open | in_progress | completed | closed
- `created_at`, `updated_at`: Timestamps

### Schedules
- `id`: Primary key
- `project_id`: Foreign key to projects
- `issue_id`: Foreign key to issues (optional)
- `title`: Schedule title
- `description`: Schedule description
- `start_date`: Start date/time
- `end_date`: End date/time
- `created_at`, `updated_at`: Timestamps

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - see LICENSE.md for details
