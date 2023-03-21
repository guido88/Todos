import { add, search } from "../icons/icons";
import classes from "./TodoBar.module.css";

const TodoBar = (props) => {
  return (
    <div className={classes.todobar}>
      <div className={classes.icons}>
        <span onClick={props.onAddTodo}>{add}</span>
        <span onClick={props.onSearchTodo}>{search}</span>
        <div className={classes.separator}></div>
        <span>{props.todoNum} items left</span>
      </div>

      <div className={classes.filters}>
        <button onClick={props.onClickFilter.bind(null, "All")}>All</button>
        <button onClick={props.onClickFilter.bind(null, "incomplete")}>
          Active
        </button>
        <button onClick={props.onClickFilter.bind(null, "complete")}>
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoBar;
