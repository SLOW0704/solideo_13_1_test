import { Router } from 'express';
import * as projectController from '../controllers/projectController';
import * as issueController from '../controllers/issueController';
import * as milestoneController from '../controllers/milestoneController';
import * as scheduleController from '../controllers/scheduleController';

const router = Router();

// Project routes
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getProjectById);
router.post('/projects', projectController.createProject);
router.put('/projects/:id', projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

// Issue routes
router.get('/issues', issueController.getAllIssues);
router.get('/issues/:id', issueController.getIssueById);
router.post('/issues', issueController.createIssue);
router.put('/issues/:id', issueController.updateIssue);
router.delete('/issues/:id', issueController.deleteIssue);

// Milestone routes
router.get('/milestones', milestoneController.getAllMilestones);
router.get('/milestones/:id', milestoneController.getMilestoneById);
router.post('/milestones', milestoneController.createMilestone);
router.put('/milestones/:id', milestoneController.updateMilestone);
router.delete('/milestones/:id', milestoneController.deleteMilestone);

// Schedule routes
router.get('/schedules', scheduleController.getAllSchedules);
router.get('/schedules/:id', scheduleController.getScheduleById);
router.post('/schedules', scheduleController.createSchedule);
router.put('/schedules/:id', scheduleController.updateSchedule);
router.delete('/schedules/:id', scheduleController.deleteSchedule);

export default router;
