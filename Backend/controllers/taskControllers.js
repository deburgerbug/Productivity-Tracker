const {z}= require('zod');
const Task = require('../models/Task');
const taskSchema = z.object({
    title: z.string().min(1,"Title is required"),
    description: z.string().optional()
})
const createTask = async (req, res, next)=>{
    try{
        const parsed = taskSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({
                message: " Validation failed",
                errors: parsed.error.flatten().fieldErrors,
            });
        }
        const newTask = await Task.create(parsed.data)
        res.status(201).json(newTask);
    }
    catch(error){
        next(error)
    }
}

const getTasks  = async(req, res) =>{
    try{
        const tasks = await Task.find().sort({createdAt: -1});
        res.status(200).json(tasks)
    }
    catch(error){
        res.status(500).json({message: "server error"})
    }
};
const updateTaskStatus = async(req,res) =>{
    try{
        const task = await Task.findById(req.params.id)
        if(!task){
            return res.status(404).json({message:"Task not Found"})
        }
        task.status = task.status === 'pending'?'completed':'pending';

        const updatedTask = await task.save()
        res.status(200).json(updatedTask)
    }
    catch(err){
        res.status(500).json({message:"server Error"})
    }
}
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.remove();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports={createTask, getTasks, updateTaskStatus, deleteTask};
