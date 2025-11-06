import { Request, Response } from 'express';
import db from '../config/database';
import { Schedule } from '../models/types';

export const getAllSchedules = (req: Request, res: Response) => {
  const { project_id, start_date, end_date } = req.query;

  let query = 'SELECT * FROM schedules WHERE 1=1';
  const params: any[] = [];

  if (project_id) {
    query += ' AND project_id = ?';
    params.push(project_id);
  }
  if (start_date) {
    query += ' AND start_date >= ?';
    params.push(start_date);
  }
  if (end_date) {
    query += ' AND end_date <= ?';
    params.push(end_date);
  }

  query += ' ORDER BY start_date ASC';

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

export const getScheduleById = (req: Request, res: Response) => {
  const { id } = req.params;
  db.get('SELECT * FROM schedules WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    res.json(row);
  });
};

export const createSchedule = (req: Request, res: Response) => {
  const {
    project_id,
    issue_id,
    title,
    description,
    start_date,
    end_date,
  }: Schedule = req.body;

  if (!project_id || !title || !start_date || !end_date) {
    return res
      .status(400)
      .json({ error: 'project_id, title, start_date, and end_date are required' });
  }

  db.run(
    `INSERT INTO schedules (project_id, issue_id, title, description, start_date, end_date)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [project_id, issue_id, title, description, start_date, end_date],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        id: this.lastID,
        project_id,
        issue_id,
        title,
        description,
        start_date,
        end_date,
      });
    }
  );
};

export const updateSchedule = (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title,
    description,
    start_date,
    end_date,
    issue_id,
  }: Schedule = req.body;

  db.run(
    `UPDATE schedules
     SET title = ?, description = ?, start_date = ?, end_date = ?, issue_id = ?,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [title, description, start_date, end_date, issue_id, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Schedule not found' });
      }
      res.json({ id, title, description, start_date, end_date, issue_id });
    }
  );
};

export const deleteSchedule = (req: Request, res: Response) => {
  const { id } = req.params;

  db.run('DELETE FROM schedules WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    res.json({ message: 'Schedule deleted successfully' });
  });
};
