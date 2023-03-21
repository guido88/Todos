import { useState } from "react";
import classes from "./App.module.css";
import Todo from "./components/Todo";
import TodoBar from "./components/TodoBar";
import TodoInput from "./components/TodoInput";

const todos_dummy = [
  { id: "1", task: "Learn React", status: "complete" },
  { id: "2", task: "Learn JS", status: "complete" },
  { id: "3", task: "Learn SASS", status: "incomplete" },
];

function App() {
  const [isSearch, setIsSearch] = useState(false);
  const [todos, setTodos] = useState(todos_dummy);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [inputTask, setInputTask] = useState("");

  const onChangeInputHandler = (event) => {
    setInputTask(event.target.value);
    if (isSearch) {
      setFilteredTodos(
        todos.filter((todo) => todo.task.includes(event.target.value))
      );
    }
  };

  const onClickFilterHandler = (value) => {
    const newTodos =
      value === "All"
        ? todos
        : value === "complete"
        ? todos.filter((todo) => todo.status === "complete")
        : todos.filter((todo) => todo.status === "incomplete");

    setFilteredTodos(newTodos);
  };

  const onDeleteTodoHandler = (id) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((todo) => todo.id !== id);
      setFilteredTodos(newTodos);
      return newTodos;
    });
  };

  const onEditTodoHandler = (id, editValue) => {
    setTodos((prevTodos) => {
      const todoIndex = prevTodos.findIndex((todo) => todo.id === id);
      const todo = prevTodos[todoIndex];

      const updatedItem = { ...todo, task: editValue };
      const updatedItems = [...prevTodos];
      updatedItems[todoIndex] = updatedItem;

      setFilteredTodos(updatedItems);
      return updatedItems;
    });
  };

  const onToggleCheckboxHandler = (id, editValue) => {
    setTodos((prevTodos) => {
      const todoIndex = prevTodos.findIndex((todo) => todo.id === id);
      const todo = prevTodos[todoIndex];
      const checkValue = editValue ? "complete" : "incomplete";
      const updatedItem = { ...todo, status: checkValue };

      const updatedItems = [...prevTodos];
      updatedItems[todoIndex] = updatedItem;

      setFilteredTodos(updatedItems);
      return updatedItems;
    });
  };

  const onAddTodoHandler = () => {
    if (!isSearch) {
      if (inputTask.trim().length === 0) {
        return;
      }

      setTodos((prevTodos) => {
        const newTodos = [...prevTodos];
        newTodos.push({
          id: Math.random(),
          task: inputTask,
          status: "incomplete",
        });
        setFilteredTodos(newTodos);
        return newTodos;
      });
    }
    setFilteredTodos(todos);
    setInputTask("");
    setIsSearch(false);
  };

  const onSearchTodoHandler = () => {
    setInputTask("");
    setIsSearch(true);
    setFilteredTodos(todos);
  };

  const isEmpty = todos.length === 0;

  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>THINGS TO DO</h1>
      <TodoInput
        value={inputTask}
        isSearch={isSearch}
        onChange={onChangeInputHandler}
      />

      {isEmpty && <h1 className={classes.h1}>No Todos Found</h1>}
      {!isEmpty &&
        filteredTodos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            description={todo.task}
            status={todo.status}
            onDelete={onDeleteTodoHandler}
            onEdit={onEditTodoHandler}
            onToggle={onToggleCheckboxHandler}
          />
        ))}
      <TodoBar
        onAddTodo={onAddTodoHandler}
        onSearchTodo={onSearchTodoHandler}
        todoNum={todos.filter((todo) => todo.status === "incomplete").length}
        onClickFilter={onClickFilterHandler}
      />
    </div>
  );
}

export default App;
