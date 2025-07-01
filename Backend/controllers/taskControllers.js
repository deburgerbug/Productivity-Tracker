const Task = require('../models/Task');
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Provide the title" })
        }
        const newTask= await Task.create({
            title,
            description
        });
        res.status(201).json(newTask);
    }
    catch(error){
        res.status(500).json({message:"Server Error"})
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
const deleteTask = async(req,res)=> {
    try{
        const deleteTask = await Task.findById(req.params.id)
        if(!deleteTask){
            return res.status(404).json({message:" Task not Found"})
        }
        await deleteTask.remove()
        res.status(200).json({message:"Task Deleted Successfully"})
    }
    catch(err){
        res.status(500).json({message:"Server Error"})
    }
}
module.exports={createTask, getTasks, updateTaskStatus, deleteTask};

