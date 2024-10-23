import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [completed, setCompleted] = useState(false);
    const [create, setCreate] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [taskId, setTaskId] = useState(null);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getAllTasks");
            setTasks(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            name,
            description: desc,
            completed,
            createdAt: create,
        };

        try {
            if (isEditMode) {
                await axios.put(`http://localhost:3000/updateTask/${taskId}`, body);
                setIsEditMode(false);
            } else {
                await axios.post("http://localhost:3000/addTask", body);
            }
            fetchTasks();
            resetForm();
        } catch (err) {
            console.log(err);
        }
    };

    const resetForm = () => {
        setName("");
        setDesc("");
        setCompleted(false);
        setCreate("");
        setIsEditMode(false);
        setTaskId(null);
    };

    const handleEdit = (task) => {
        setName(task.name);
        setDesc(task.description);
        setCompleted(task.completed);
        setCreate(task.createdAt);
        setTaskId(task._id);
        setIsEditMode(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/deleteTask/${id}`);
            fetchTasks();
        } catch (err) {
            console.log(err);
        }
    };


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>{isEditMode ? "Edit Task" : "Add Task"}</h2>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <input
                            type="text"
                            placeholder="Enter Description"
                            className="form-control"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="create">Created At</label>
                        <input
                            type="date"
                            className="form-control"
                            value={create}
                            onChange={(e) => setCreate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="completed">Is Completed</label>
                        <select
                            className="form-control"
                            value={completed ? "true" : "false"}
                            onChange={(e) => setCompleted(e.target.value === "true")}
                        >
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                    <button className="btn btn-primary">
                        {isEditMode ? "Update" : "Submit"}
                    </button>
                </form>
                <hr />
                <h3>Task List</h3>
                <ul className="task-list">
                    {tasks.map((task) => (
                        <li key={task._id} className="task-item">
                            <div>
                                <h5>{task.name}</h5>
                                <p>{task.description}</p>
                                <small>Created At: {formatDate(task.createdAt)}</small>
                                <br />
                                <small>Completed: {task.completed ? "Yes" : "No"}</small>
                            </div>
                            <div className="button-group">
                                <button
                                    className="btn btn-warning"
                                    onClick={() => handleEdit(task)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(task._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
