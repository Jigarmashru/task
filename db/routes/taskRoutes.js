const express = require('express');
const router = express.Router();
const { getAllTask, getTaskById, addTask, updateTask, deleteTask } = require('../controllers/taskController');

router.get('/getAllTasks',getAllTask)
router.get('/getTaskById/:id',getTaskById)
router.post('/addTask',addTask)
router.put('/updateTask/:id',updateTask)
router.delete('/deleteTask/:id',deleteTask)

module.exports = router;