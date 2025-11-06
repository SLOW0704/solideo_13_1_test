import { Project, Issue, Milestone, Schedule } from '../types';

// LocalStorage keys
const KEYS = {
  PROJECTS: 'pms_projects',
  ISSUES: 'pms_issues',
  MILESTONES: 'pms_milestones',
  SCHEDULES: 'pms_schedules',
};

// Initialize with sample data if empty
const initializeSampleData = () => {
  if (!localStorage.getItem(KEYS.PROJECTS)) {
    const sampleProjects: Project[] = [
      {
        id: 1,
        name: 'PMS 프로젝트',
        description: '프로젝트 관리 시스템 개발',
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
    localStorage.setItem(KEYS.PROJECTS, JSON.stringify(sampleProjects));

    const sampleIssues: Issue[] = [
      {
        id: 1,
        project_id: 1,
        title: 'UI 개선 작업',
        description: '메인 화면 UI 개선이 필요합니다',
        status: 'in_progress',
        priority: 'high',
        assignee: '김개발',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
        project_id: 1,
        title: 'API 문서 작성',
        description: 'REST API 문서화 작업',
        status: 'open',
        priority: 'medium',
        assignee: '이개발',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
    localStorage.setItem(KEYS.ISSUES, JSON.stringify(sampleIssues));

    const sampleMilestones: Milestone[] = [
      {
        id: 1,
        project_id: 1,
        title: 'v1.0 릴리즈',
        description: '첫 번째 정식 버전 출시',
        due_date: '2025-12-31',
        status: 'in_progress',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
    localStorage.setItem(KEYS.MILESTONES, JSON.stringify(sampleMilestones));

    const sampleSchedules: Schedule[] = [
      {
        id: 1,
        project_id: 1,
        issue_id: 1,
        title: 'UI 개선 작업',
        description: '메인 화면 디자인 개선',
        start_date: '2025-11-10T09:00:00',
        end_date: '2025-11-15T18:00:00',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
    localStorage.setItem(KEYS.SCHEDULES, JSON.stringify(sampleSchedules));
  }
};

// Helper to get next ID
const getNextId = (items: any[]): number => {
  if (items.length === 0) return 1;
  return Math.max(...items.map((item) => item.id || 0)) + 1;
};

// Projects
export const getProjects = () => {
  initializeSampleData();
  const data = localStorage.getItem(KEYS.PROJECTS);
  return Promise.resolve({ data: data ? JSON.parse(data) : [] });
};

export const getProject = (id: number) => {
  const data = localStorage.getItem(KEYS.PROJECTS);
  const projects = data ? JSON.parse(data) : [];
  const project = projects.find((p: Project) => p.id === id);
  return Promise.resolve({ data: project });
};

export const createProject = (project: Project) => {
  const data = localStorage.getItem(KEYS.PROJECTS);
  const projects = data ? JSON.parse(data) : [];
  const newProject = {
    ...project,
    id: getNextId(projects),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  projects.push(newProject);
  localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
  return Promise.resolve({ data: newProject });
};

export const updateProject = (id: number, project: Project) => {
  const data = localStorage.getItem(KEYS.PROJECTS);
  const projects = data ? JSON.parse(data) : [];
  const index = projects.findIndex((p: Project) => p.id === id);
  if (index !== -1) {
    projects[index] = { ...project, id, updated_at: new Date().toISOString() };
    localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
    return Promise.resolve({ data: projects[index] });
  }
  return Promise.reject(new Error('Project not found'));
};

export const deleteProject = (id: number) => {
  const data = localStorage.getItem(KEYS.PROJECTS);
  const projects = data ? JSON.parse(data) : [];
  const filtered = projects.filter((p: Project) => p.id !== id);
  localStorage.setItem(KEYS.PROJECTS, JSON.stringify(filtered));
  return Promise.resolve({ data: { message: 'Deleted' } });
};

// Issues
export const getIssues = (params?: any) => {
  initializeSampleData();
  const data = localStorage.getItem(KEYS.ISSUES);
  let issues = data ? JSON.parse(data) : [];

  if (params?.project_id) {
    issues = issues.filter((i: Issue) => i.project_id === Number(params.project_id));
  }
  if (params?.milestone_id) {
    issues = issues.filter((i: Issue) => i.milestone_id === Number(params.milestone_id));
  }
  if (params?.status) {
    issues = issues.filter((i: Issue) => i.status === params.status);
  }
  if (params?.priority) {
    issues = issues.filter((i: Issue) => i.priority === params.priority);
  }

  return Promise.resolve({ data: issues });
};

export const getIssue = (id: number) => {
  const data = localStorage.getItem(KEYS.ISSUES);
  const issues = data ? JSON.parse(data) : [];
  const issue = issues.find((i: Issue) => i.id === id);
  return Promise.resolve({ data: issue });
};

export const createIssue = (issue: Issue) => {
  const data = localStorage.getItem(KEYS.ISSUES);
  const issues = data ? JSON.parse(data) : [];
  const newIssue = {
    ...issue,
    id: getNextId(issues),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  issues.push(newIssue);
  localStorage.setItem(KEYS.ISSUES, JSON.stringify(issues));
  return Promise.resolve({ data: newIssue });
};

export const updateIssue = (id: number, issue: Issue) => {
  const data = localStorage.getItem(KEYS.ISSUES);
  const issues = data ? JSON.parse(data) : [];
  const index = issues.findIndex((i: Issue) => i.id === id);
  if (index !== -1) {
    issues[index] = { ...issue, id, updated_at: new Date().toISOString() };
    localStorage.setItem(KEYS.ISSUES, JSON.stringify(issues));
    return Promise.resolve({ data: issues[index] });
  }
  return Promise.reject(new Error('Issue not found'));
};

export const deleteIssue = (id: number) => {
  const data = localStorage.getItem(KEYS.ISSUES);
  const issues = data ? JSON.parse(data) : [];
  const filtered = issues.filter((i: Issue) => i.id !== id);
  localStorage.setItem(KEYS.ISSUES, JSON.stringify(filtered));
  return Promise.resolve({ data: { message: 'Deleted' } });
};

// Milestones
export const getMilestones = (params?: any) => {
  initializeSampleData();
  const data = localStorage.getItem(KEYS.MILESTONES);
  let milestones = data ? JSON.parse(data) : [];

  if (params?.project_id) {
    milestones = milestones.filter(
      (m: Milestone) => m.project_id === Number(params.project_id)
    );
  }

  return Promise.resolve({ data: milestones });
};

export const getMilestone = (id: number) => {
  const data = localStorage.getItem(KEYS.MILESTONES);
  const milestones = data ? JSON.parse(data) : [];
  const milestone = milestones.find((m: Milestone) => m.id === id);
  return Promise.resolve({ data: milestone });
};

export const createMilestone = (milestone: Milestone) => {
  const data = localStorage.getItem(KEYS.MILESTONES);
  const milestones = data ? JSON.parse(data) : [];
  const newMilestone = {
    ...milestone,
    id: getNextId(milestones),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  milestones.push(newMilestone);
  localStorage.setItem(KEYS.MILESTONES, JSON.stringify(milestones));
  return Promise.resolve({ data: newMilestone });
};

export const updateMilestone = (id: number, milestone: Milestone) => {
  const data = localStorage.getItem(KEYS.MILESTONES);
  const milestones = data ? JSON.parse(data) : [];
  const index = milestones.findIndex((m: Milestone) => m.id === id);
  if (index !== -1) {
    milestones[index] = { ...milestone, id, updated_at: new Date().toISOString() };
    localStorage.setItem(KEYS.MILESTONES, JSON.stringify(milestones));
    return Promise.resolve({ data: milestones[index] });
  }
  return Promise.reject(new Error('Milestone not found'));
};

export const deleteMilestone = (id: number) => {
  const data = localStorage.getItem(KEYS.MILESTONES);
  const milestones = data ? JSON.parse(data) : [];
  const filtered = milestones.filter((m: Milestone) => m.id !== id);
  localStorage.setItem(KEYS.MILESTONES, JSON.stringify(filtered));
  return Promise.resolve({ data: { message: 'Deleted' } });
};

// Schedules
export const getSchedules = (params?: any) => {
  initializeSampleData();
  const data = localStorage.getItem(KEYS.SCHEDULES);
  let schedules = data ? JSON.parse(data) : [];

  if (params?.project_id) {
    schedules = schedules.filter(
      (s: Schedule) => s.project_id === Number(params.project_id)
    );
  }

  return Promise.resolve({ data: schedules });
};

export const getSchedule = (id: number) => {
  const data = localStorage.getItem(KEYS.SCHEDULES);
  const schedules = data ? JSON.parse(data) : [];
  const schedule = schedules.find((s: Schedule) => s.id === id);
  return Promise.resolve({ data: schedule });
};

export const createSchedule = (schedule: Schedule) => {
  const data = localStorage.getItem(KEYS.SCHEDULES);
  const schedules = data ? JSON.parse(data) : [];
  const newSchedule = {
    ...schedule,
    id: getNextId(schedules),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  schedules.push(newSchedule);
  localStorage.setItem(KEYS.SCHEDULES, JSON.stringify(schedules));
  return Promise.resolve({ data: newSchedule });
};

export const updateSchedule = (id: number, schedule: Schedule) => {
  const data = localStorage.getItem(KEYS.SCHEDULES);
  const schedules = data ? JSON.parse(data) : [];
  const index = schedules.findIndex((s: Schedule) => s.id === id);
  if (index !== -1) {
    schedules[index] = { ...schedule, id, updated_at: new Date().toISOString() };
    localStorage.setItem(KEYS.SCHEDULES, JSON.stringify(schedules));
    return Promise.resolve({ data: schedules[index] });
  }
  return Promise.reject(new Error('Schedule not found'));
};

export const deleteSchedule = (id: number) => {
  const data = localStorage.getItem(KEYS.SCHEDULES);
  const schedules = data ? JSON.parse(data) : [];
  const filtered = schedules.filter((s: Schedule) => s.id !== id);
  localStorage.setItem(KEYS.SCHEDULES, JSON.stringify(filtered));
  return Promise.resolve({ data: { message: 'Deleted' } });
};
