import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import * as api from '../services/api';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Project>({
    name: '',
    description: '',
    status: 'active',
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await api.getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createProject(formData);
      setFormData({ name: '', description: '', status: 'active' });
      setShowForm(false);
      loadProjects();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      loadProjects();
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  if (loading) return <div className="loading">Loading projects...</div>;

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Projects</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Project'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <div className="form-group">
              <label className="form-label">Project Name *</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as Project['status'] })
                }
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success">
              Create Project
            </button>
          </form>
        )}

        {projects.length === 0 ? (
          <div className="empty-state">
            <h3>No projects yet</h3>
            <p>Create your first project to get started</p>
          </div>
        ) : (
          <div className="grid grid-2">
            {projects.map((project) => (
              <div key={project.id} className="card">
                <h3>{project.name}</h3>
                <p className="text-muted mb-2">{project.description}</p>
                <div className="flex-between">
                  <span className={`badge badge-${project.status}`}>{project.status}</span>
                  <div className="flex gap-1">
                    <Link
                      to={`/projects/${project.id}/issues`}
                      className="btn btn-primary btn-sm"
                    >
                      View Issues
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id!)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
