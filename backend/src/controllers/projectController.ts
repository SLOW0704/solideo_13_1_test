import { Request, Response } from 'express';
import db from '../config/database';
import { Project } from '../models/types';

export const getAllProjects = (req: Request, res: Response) => {
  db.all('SELECT * FROM projects ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

export const getProjectById = (req: Request, res: Response) => {
  const { id } = req.params;
  db.get('SELECT * FROM projects WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(row);
  });
};

export const createProject = (req: Request, res: Response) => {
  const { name, description, status = 'active' }: Project = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  db.run(
    'INSERT INTO projects (name, description, status) VALUES (?, ?, ?)',
    [name, description, status],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, name, description, status });
    }
  );
};

export const updateProject = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, status }: Project = req.body;

  db.run(
    'UPDATE projects SET name = ?, description = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [name, description, status, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json({ id, name, description, status });
    }
  );
};

export const deleteProject = (req: Request, res: Response) => {
  const { id } = req.params;

  db.run('DELETE FROM projects WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  });
};
