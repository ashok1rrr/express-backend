import express from 'express';
import Task from '../models/Task';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
});

router.get('/', authMiddleware, async (_, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.put('/:id', authMiddleware, async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

router.delete('/:id', authMiddleware, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

export default router;
