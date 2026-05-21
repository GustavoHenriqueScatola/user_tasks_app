import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pendente");

  function loadTasks() {
    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Erro ao buscar tasks:", error));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: {
          title: title,
          description: description,
          status: status,
        },
      }),
    })
      .then((response) => response.json())
      .then((newTask) => {
        setTasks([...tasks, newTask]);

        setTitle("");
        setDescription("");
        setStatus("pendente");
      })
      .catch((error) => console.error("Erro ao criar task:", error));
  }

  return (
    <main className="container">
      <h1>Minhas tarefas</h1>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="pendente">Pendente</option>
          <option value="fazendo">Fazendo</option>
          <option value="concluida">Concluída</option>
        </select>

        <button type="submit">Adicionar tarefa</button>
      </form>

      <section className="task-list">
        {tasks.length === 0 ? (
          <p>Nenhuma tarefa cadastrada.</p>
        ) : (
          tasks.map((task) => (
            <div className="task-card" key={task.id}>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <span>{task.status}</span>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default App;