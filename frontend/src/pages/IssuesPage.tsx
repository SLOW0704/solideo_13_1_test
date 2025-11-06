import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Issue, Milestone } from '../types';
import * as api from '../services/api';

export default function IssuesPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Issue>({
    project_id: Number(projectId),
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
    assignee: '',
  });

  useEffect(() => {
    loadData();
  }, [projectId]);

  const loadData = async () => {
    try {
      const [issuesRes, milestonesRes] = await Promise.all([
        api.getIssues({ project_id: projectId }),
        api.getMilestones({ project_id: projectId }),
      ]);
      setIssues(issuesRes.data);
      setMilestones(milestonesRes.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createIssue({ ...formData, project_id: Number(projectId) });
      setFormData({
        project_id: Number(projectId),
        title: '',
        description: '',
        status: 'open',
        priority: 'medium',
        assignee: '',
      });
      setShowForm(false);
      loadData();
    } catch (error) {
      console.error('Failed to create issue:', error);
    }
  };

  const handleStatusChange = async (id: number, status: Issue['status']) => {
    try {
      const issue = issues.find((i) => i.id === id);
      if (issue) {
        await api.updateIssue(id, { ...issue, status });
        loadData();
      }
    } catch (error) {
      console.error('Failed to update issue:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this issue?')) return;
    try {
      await api.deleteIssue(id);
      loadData();
    } catch (error) {
      console.error('Failed to delete issue:', error);
    }
  };

  if (loading) return <div className="loading">Loading issues...</div>;

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Issues - Project {projectId}</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Issue'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input
                type="text"
                className="form-input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value as Issue['priority'] })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Milestone</label>
                <select
                  className="form-select"
                  value={formData.milestone_id || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      milestone_id: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                >
                  <option value="">No milestone</option>
                  {milestones.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Assignee</label>
              <input
                type="text"
                className="form-input"
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                placeholder="Enter assignee name"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Create Issue
            </button>
          </form>
        )}

        {issues.length === 0 ? (
          <div className="empty-state">
            <h3>No issues yet</h3>
            <p>Create your first issue to track work</p>
          </div>
        ) : (
          <ul className="list">
            {issues.map((issue) => (
              <li key={issue.id} className="list-item">
                <div style={{ flex: 1 }}>
                  <h3>{issue.title}</h3>
                  <p className="text-muted mb-1">{issue.description}</p>
                  <div className="flex gap-1">
                    <span className={`badge badge-${issue.status}`}>{issue.status}</span>
                    <span className={`badge badge-${issue.priority}`}>{issue.priority}</span>
                    {issue.assignee && (
                      <span className="badge" style={{ background: '#e3f2fd', color: '#1976d2' }}>
                        {issue.assignee}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <select
                    className="form-select"
                    value={issue.status}
                    onChange={(e) => handleStatusChange(issue.id!, e.target.value as Issue['status'])}
                    style={{ width: '150px' }}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button onClick={() => handleDelete(issue.id!)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
