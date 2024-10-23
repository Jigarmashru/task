const Task = require('../models/taskModel');

const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTaskById = async (req, res) => {
    try {
        const id = req.params.id;

        const onetask = await Task.findById(id);

        if (!onetask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(onetask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addTask = async (req, res) => {
    try {
        const tasks = await Task.create(req.body);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const tasks = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!tasks) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(200).send(tasks);
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteTask = async (req, res) => {
    try {
        const tasks = await Task.findByIdAndDelete(req.params.id);
        if (!tasks) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { getAllTask, getTaskById, addTask, updateTask, deleteTask };