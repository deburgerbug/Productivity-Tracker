import { useState, useEffect } from 'react';
import API from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");

    const fetchTasks = async () => {
        try {
            const res = await API.get('/tasks'); // Corrected endpoint
            setTasks(res.data);
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const filteredTasks = tasks.filter((task) => {
        if (filter === "pending") return task.status === "pending";
        if (filter === "completed") return task.status === "completed";
        return true; // All
    });

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
                
                {/* Left Column - Task Form */}
                <div className="w-full lg:w-1/3">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Productivity Tracker
                    </h1>
                    <TaskForm onTaskCreated={fetchTasks} />
                </div>

                {/* Right Column - Tasks */}
                <div className="w-full lg:w-2/3">
                    <div className="flex gap-2 mb-4 justify-center lg:justify-start">
                        {["all", "pending", "completed"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded font-medium transition ${
                                    filter === status
                                        ? "bg-black text-white"
                                        : "bg-gray-200 text-black"
                                }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map((task) => (
                                <TaskCard key={task._id} task={task} onTaskUpdated={fetchTasks} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No tasks found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
