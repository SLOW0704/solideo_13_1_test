import { Request, Response } from 'express';
import db from '../config/database';
import { Issue } from '../models/types';

export const getAllIssues = (req: Request, res: Response) => {
  const { project_id, milestone_id, status, priority } = req.query;

  let query = 'SELECT * FROM issues WHERE 1=1';
  const params: any[] = [];

  if (project_id) {
    query += ' AND project_id = ?';
    params.push(project_id);
  }
  if (milestone_id) {
    query += ' AND milestone_id = ?';
    params.push(milestone_id);
  }
  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }
  if (priority) {
    query += ' AND priority = ?';
    params.push(priority);
  }

  query += ' ORDER BY created_at DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

export const getIssueById = (req: Request, res: Response) => {
  const { id } = req.params;
  db.get('SELECT * FROM issues WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    res.json(row);
  });
};

export const createIssue = (req: Request, res: Response) => {
  const {
    project_id,
    milestone_id,
    title,
    description,
    status = 'open',
    priority = 'medium',
    assignee,
  }: Issue = req.body;

  if (!project_id || !title) {
    return res.status(400).json({ error: 'project_id and title are required' });
  }

  db.run(
    `INSERT INTO issues (project_id, milestone_id, title, description, status, priority, assignee)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [project_id, milestone_id, title, description, status, priority, assignee],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        id: this.lastID,
        project_id,
        milestone_id,
        title,
        description,
        status,
        priority,
        assignee,
      });
    }
  );
};

export const updateIssue = (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title,
    description,
    status,
    priority,
    assignee,
    milestone_id,
  }: Issue = req.body;

  db.run(
    `UPDATE issues
     SET title = ?, description = ?, status = ?, priority = ?, assignee = ?, milestone_id = ?,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [title, description, status, priority, assignee, milestone_id, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Issue not found' });
      }
      res.json({ id, title, description, status, priority, assignee, milestone_id });
    }
  );
};

export const deleteIssue = (req: Request, res: Response) => {
  const { id } = req.params;

  db.run('DELETE FROM issues WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    res.json({ message: 'Issue deleted successfully' });
  });
};
