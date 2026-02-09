import React from 'react'
import { useState } from 'react'

function Todolist() {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);

    const addTodo = () => {
        if (task === "") return;

        setTodos([...todos, { text: task, done: false }]);
        setTask("");
    };

    const toggleDone = (index) => {
        const newTodos = [...todos];
        newTodos[index].done = !newTodos[index].done;
        setTodos(newTodos);
    };

     const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };
    return (

        <>
            <h3>Todo</h3>

            <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add task"
            />
            <button onClick={addTodo}>Add</button>

            {todos.map((todo, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => toggleDone(index)}
                    />

                    <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
                        {todo.text}
                    </span>
                     <button onClick={() => deleteTodo(index)}>Delete</button>
                </div>
            ))}
        </>
    )
}

export default Todolist