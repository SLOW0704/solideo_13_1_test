import { useState, useEffect } from 'react';
import { Milestone } from '../types';
import * as api from '../services/api';
import { format } from 'date-fns';

export default function MilestonesPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Milestone>({
    project_id: 1,
    title: '',
    description: '',
    due_date: '',
    status: 'open',
  });

  useEffect(() => {
    loadMilestones();
  }, []);

  const loadMilestones = async () => {
    try {
      const response = await api.getMilestones();
      setMilestones(response.data);
    } catch (error) {
      console.error('Failed to load milestones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createMilestone(formData);
      setFormData({
        project_id: 1,
        title: '',
        description: '',
        due_date: '',
        status: 'open',
      });
      setShowForm(false);
      loadMilestones();
    } catch (error) {
      console.error('Failed to create milestone:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this milestone?')) return;
    try {
      await api.deleteMilestone(id);
      loadMilestones();
    } catch (error) {
      console.error('Failed to delete milestone:', error);
    }
  };

  const handleStatusChange = async (id: number, status: Milestone['status']) => {
    try {
      const milestone = milestones.find((m) => m.id === id);
      if (milestone) {
        await api.updateMilestone(id, { ...milestone, status });
        loadMilestones();
      }
    } catch (error) {
      console.error('Failed to update milestone:', error);
    }
  };

  if (loading) return <div className="loading">Loading milestones...</div>;

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Milestones</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Milestone'}
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
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as Milestone['status'] })
                  }
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Create Milestone
            </button>
          </form>
        )}

        {milestones.length === 0 ? (
          <div className="empty-state">
            <h3>No milestones yet</h3>
            <p>Create your first milestone to track progress</p>
          </div>
        ) : (
          <div className="grid grid-2">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="card">
                <h3>{milestone.title}</h3>
                <p className="text-muted mb-2">{milestone.description}</p>
                {milestone.due_date && (
                  <p className="text-muted mb-1">
                    Due: {format(new Date(milestone.due_date), 'MMM dd, yyyy')}
                  </p>
                )}
                <div className="flex-between mt-2">
                  <select
                    className="form-select"
                    value={milestone.status}
                    onChange={(e) =>
                      handleStatusChange(milestone.id!, e.target.value as Milestone['status'])
                    }
                    style={{ width: '150px' }}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button
                    onClick={() => handleDelete(milestone.id!)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
