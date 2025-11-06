export interface Project {
  id?: number;
  name: string;
  description?: string;
  status: 'active' | 'archived' | 'completed';
  created_at?: string;
  updated_at?: string;
}

export interface Milestone {
  id?: number;
  project_id: number;
  title: string;
  description?: string;
  due_date?: string;
  status: 'open' | 'in_progress' | 'completed' | 'closed';
  created_at?: string;
  updated_at?: string;
}

export interface Issue {
  id?: number;
  project_id: number;
  milestone_id?: number;
  title: string;
  description?: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Schedule {
  id?: number;
  project_id: number;
  issue_id?: number;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  created_at?: string;
  updated_at?: string;
}
