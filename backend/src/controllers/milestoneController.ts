import { Request, Response } from 'express';
import db from '../config/database';
import { Milestone } from '../models/types';

export const getAllMilestones = (req: Request, res: Response) => {
  const { project_id } = req.query;

  let query = 'SELECT * FROM milestones WHERE 1=1';
  const params: any[] = [];

  if (project_id) {
    query += ' AND project_id = ?';
    params.push(project_id);
  }

  query += ' ORDER BY due_date ASC';

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

export const getMilestoneById = (req: Request, res: Response) => {
  const { id } = req.params;
  db.get('SELECT * FROM milestones WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Milestone not found' });
    }
    res.json(row);
  });
};

export const createMilestone = (req: Request, res: Response) => {
  const {
    project_id,
    title,
    description,
    due_date,
    status = 'open',
  }: Milestone = req.body;

  if (!project_id || !title) {
    return res.status(400).json({ error: 'project_id and title are required' });
  }

  db.run(
    `INSERT INTO milestones (project_id, title, description, due_date, status)
     VALUES (?, ?, ?, ?, ?)`,
    [project_id, title, description, due_date, status],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        id: this.lastID,
        project_id,
        title,
        description,
        due_date,
        status,
      });
    }
  );
};

export const updateMilestone = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, due_date, status }: Milestone = req.body;

  db.run(
    `UPDATE milestones
     SET title = ?, description = ?, due_date = ?, status = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [title, description, due_date, status, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Milestone not found' });
      }
      res.json({ id, title, description, due_date, status });
    }
  );
};

export const deleteMilestone = (req: Request, res: Response) => {
  const { id } = req.params;

  db.run('DELETE FROM milestones WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Milestone not found' });
    }
    res.json({ message: 'Milestone deleted successfully' });
  });
};
