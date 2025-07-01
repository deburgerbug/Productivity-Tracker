const express =require('express');
const router = express.Router();

const {createTask, getTasks, updateTaskStatus, deleteTask} = require('../controllers/taskControllers')

router.post('/', createTask)
router.get('/', getTasks)
router.put('/:id', updateTaskStatus)
router.delete('/:id', deleteTask)

module.exports  = router;

