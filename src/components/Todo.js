import { useRef, useState } from "react";
import { edit, trash } from "../icons/icons";
import classes from "./Todo.module.css";

const Todo = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const descriptionRef = useRef();
  const checkboxRef = useRef();

  const onEditHandler = () => {
    if (isEditing) {
      props.onEdit(props.id, descriptionRef.current.value);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const onToggleHangdler = () => {
    props.onToggle(props.id, checkboxRef.current.checked);
  };

  return (
    <div className={classes.todo}>
      <div className={classes.task}>
        <input
          className={classes.checkbox}
          type="checkbox"
          defaultChecked={props.status === "complete"}
          ref={checkboxRef}
          onChange={onToggleHangdler}
        />

        {!isEditing && <label htmlFor="todo">{props.description}</label>}
        {isEditing && (
          <input
            type="text"
            defaultValue={props.description}
            ref={descriptionRef}
          />
        )}
      </div>
      <div className={classes.actions}>
        <span onClick={onEditHandler}>{edit}</span>
        <span onClick={props.onDelete.bind(null, props.id)}>{trash}</span>
      </div>
    </div>
  );
};

export default Todo;
