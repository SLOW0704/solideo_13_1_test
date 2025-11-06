import { useState, useEffect } from 'react';
import { Schedule } from '../types';
import * as api from '../services/api';
import { format } from 'date-fns';

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Schedule>({
    project_id: 1,
    title: '',
    description: '',
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      const response = await api.getSchedules();
      setSchedules(response.data);
    } catch (error) {
      console.error('Failed to load schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createSchedule(formData);
      setFormData({
        project_id: 1,
        title: '',
        description: '',
        start_date: '',
        end_date: '',
      });
      setShowForm(false);
      loadSchedules();
    } catch (error) {
      console.error('Failed to create schedule:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this schedule?')) return;
    try {
      await api.deleteSchedule(id);
      loadSchedules();
    } catch (error) {
      console.error('Failed to delete schedule:', error);
    }
  };

  if (loading) return <div className="loading">Loading schedules...</div>;

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Schedules</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Schedule'}
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
                <label className="form-label">Start Date *</label>
                <input
                  type="datetime-local"
                  className="form-input"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">End Date *</label>
                <input
                  type="datetime-local"
                  className="form-input"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Create Schedule
            </button>
          </form>
        )}

        {schedules.length === 0 ? (
          <div className="empty-state">
            <h3>No schedules yet</h3>
            <p>Create your first schedule to plan work</p>
          </div>
        ) : (
          <ul className="list">
            {schedules.map((schedule) => (
              <li key={schedule.id} className="list-item">
                <div style={{ flex: 1 }}>
                  <h3>{schedule.title}</h3>
                  <p className="text-muted mb-1">{schedule.description}</p>
                  <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                    {format(new Date(schedule.start_date), 'MMM dd, yyyy HH:mm')} -{' '}
                    {format(new Date(schedule.end_date), 'MMM dd, yyyy HH:mm')}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(schedule.id!)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
