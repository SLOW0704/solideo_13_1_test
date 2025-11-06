import axios from 'axios';
import { Project, Issue, Milestone, Schedule } from '../types';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects
export const getProjects = () => api.get<Project[]>('/projects');
export const getProject = (id: number) => api.get<Project>(`/projects/${id}`);
export const createProject = (project: Project) => api.post<Project>('/projects', project);
export const updateProject = (id: number, project: Project) =>
  api.put<Project>(`/projects/${id}`, project);
export const deleteProject = (id: number) => api.delete(`/projects/${id}`);

// Issues
export const getIssues = (params?: any) => api.get<Issue[]>('/issues', { params });
export const getIssue = (id: number) => api.get<Issue>(`/issues/${id}`);
export const createIssue = (issue: Issue) => api.post<Issue>('/issues', issue);
export const updateIssue = (id: number, issue: Issue) =>
  api.put<Issue>(`/issues/${id}`, issue);
export const deleteIssue = (id: number) => api.delete(`/issues/${id}`);

// Milestones
export const getMilestones = (params?: any) => api.get<Milestone[]>('/milestones', { params });
export const getMilestone = (id: number) => api.get<Milestone>(`/milestones/${id}`);
export const createMilestone = (milestone: Milestone) =>
  api.post<Milestone>('/milestones', milestone);
export const updateMilestone = (id: number, milestone: Milestone) =>
  api.put<Milestone>(`/milestones/${id}`, milestone);
export const deleteMilestone = (id: number) => api.delete(`/milestones/${id}`);

// Schedules
export const getSchedules = (params?: any) => api.get<Schedule[]>('/schedules', { params });
export const getSchedule = (id: number) => api.get<Schedule>(`/schedules/${id}`);
export const createSchedule = (schedule: Schedule) =>
  api.post<Schedule>('/schedules', schedule);
export const updateSchedule = (id: number, schedule: Schedule) =>
  api.put<Schedule>(`/schedules/${id}`, schedule);
export const deleteSchedule = (id: number) => api.delete(`/schedules/${id}`);
