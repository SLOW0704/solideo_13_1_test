import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage';
import IssuesPage from './pages/IssuesPage';
import MilestonesPage from './pages/MilestonesPage';
import SchedulesPage from './pages/SchedulesPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>Project Management System</h1>
          <ul className="nav-links">
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/milestones">Milestones</Link>
            </li>
            <li>
              <Link to="/schedules">Schedules</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId/issues" element={<IssuesPage />} />
          <Route path="/milestones" element={<MilestonesPage />} />
          <Route path="/schedules" element={<SchedulesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
