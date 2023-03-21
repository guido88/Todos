import React from "react";
import classes from "./TodoInput.module.css";

const TodoInput = (props) => {
  return (
    <input
      className={classes.input}
      onChange={props.onChange}
      value={props.value}
      type="text"
      placeholder={props.isSearch ? "Search..." : "Add New..."}
    />
  );
};

export default TodoInput;
