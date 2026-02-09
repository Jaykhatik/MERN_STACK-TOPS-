import { useState } from "react";

function Fourth() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  const addTask = () => {
    setList([...list, task]);
    setTask("");
  };

  return (
    <>
      <input value={task} onChange={e => setTask(e.target.value)} />
      <button onClick={addTask}>Add</button>

      {list.map((t, i) => <p key={i}>{t}</p>)}
    </>
  );
}
export default Fourth;
