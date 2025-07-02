import { useState } from 'react';
import API from '../services/api'

export default function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState(' ')
    const [description, setDescription] = useState(' ')
    const [error, setError] = useState(' ')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title.trim()) {
            setError('Title is Required')
            return;
        }
        try {
            await API.post('./tasks', { title, description })
            setTitle('');
            setDescription('');
            setError('');
            onTaskCreated();
        }
        catch (err) {
            console.error(err)
            setError("Something gone wrong")
        }

    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow border border-gray-300">

            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Add New Task</h2>


            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

            <input
                type="text"
                placeholder="Title *"
                className="w-full border border-gray-400 p-2 rounded mb-3 bg-gray-50 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />


            <textarea
                placeholder="Description (optional)"
                className="w-full border border-gray-400 p-2 rounded mb-3 resize-none bg-gray-50 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />


            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
            >
                Add Task
            </button>
        </form>

    );
}