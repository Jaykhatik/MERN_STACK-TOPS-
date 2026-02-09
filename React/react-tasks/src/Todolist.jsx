import React from 'react'
import { useState } from 'react'

function Todolist() {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);

    const addTodo = () => {
        if (task.trim() === "") return;
        setTodos([...todos, { text: task, completed: false }]);
        setTask("");
    }

    const toggleComplete = (index) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const deleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };
    
    return (

        <>
            <h2>Todo List</h2>

            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter task"
            />
            <button onClick={addTodo}>Add</button>

            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleComplete(index)}
                        />

                        <span
                            style={{
                                textDecoration: todo.completed ? "line-through" : "none",
                                marginLeft: "8px",
                            }}
                        >
                            {todo.text}
                        </span>

                        <button onClick={() => deleteTodo(index)}>❌</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Todolist