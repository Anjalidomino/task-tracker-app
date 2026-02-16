const e = React.createElement;
const useState = React.useState;

function Header() {
  return e("h1", null, "My Task Tracker");
}

function TaskInput(props) {
  const [text, setText] = useState("");

  function handleAdd() {
    if (text.trim() === "") return;
    props.addTask(text);
    setText("");
  }

  return e("div", { className: "input-section" },
    e("input", {
      type: "text",
      value: text,
      placeholder: "Enter a task...",
      onChange: (event) => setText(event.target.value),
      maxLength: 50
    }),
    e("button", {
      className: "add-btn",
      onClick: handleAdd
    }, "Add Task")
  );
}

function TaskItem(props) {
  return e("div", { className: "task" },
    e("span", {
      className: props.task.completed ? "completed" : "",
      onClick: () => props.toggleTask(props.task.id)
    }, props.task.name),

    e("button", {
      className: "delete-btn",
      onClick: () => props.deleteTask(props.task.id)
    }, "Delete")
  );
}

function TaskList(props) {
  if (props.tasks.length === 0) {
    return e("p", { className: "empty" }, "No tasks added yet.");
  }

  return e("div", null,
    props.tasks.map(task =>
      e(TaskItem, {
        key: task.id,
        task: task,
        toggleTask: props.toggleTask,
        deleteTask: props.deleteTask
      })
    )
  );
}

function Footer(props) {
  return e("div", { className: "footer" },
    "Total Tasks: " + props.total +
    " | Completed: " + props.completed
  );
}

function App() {
  const [tasks, setTasks] = useState([]);

  function addTask(name) {
    const newTask = {
      id: Date.now(),
      name: name,
      completed: false
    };
    setTasks([...tasks, newTask]);
  }

  function toggleTask(id) {
    const updated = tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );
    setTasks(updated);
  }

  function deleteTask(id) {
    const filtered = tasks.filter(task => task.id !== id);
    setTasks(filtered);
  }

  const completedCount = tasks.filter(t => t.completed).length;

  return e("div", { className: "app" },
    e(Header),
    e(TaskInput, { addTask }),
    e(TaskList, {
      tasks,
      toggleTask,
      deleteTask
    }),
    e(Footer, {
      total: tasks.length,
      completed: completedCount
    })
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(e(App));
