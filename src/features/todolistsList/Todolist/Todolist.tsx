import { Delete } from "@mui/icons-material"
import { Button, IconButton } from "@mui/material"
import { AddItemForm, EditableSpan } from "common/components"
import { TaskStatuses } from "common/enums"
import { useAppDispatch } from "common/hooks"
import React, { useEffect } from "react"
import { tasksThunks } from "../tasksSlice"
import { TaskType } from "../todolistsApi"
import { TodolistDomainType, todolistsActions, todolistsThunks } from "../todolistsSlice"
import { Task } from "./Task/Task"

type PropsType = {
  todolist: TodolistDomainType
  tasks: TaskType[]
}

export const Todolist = React.memo(function (props: PropsType) {
  const { id: todolistId } = props.todolist
  const { id } = props.todolist
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(props.todolist.id))
  }, [])

  const addTask = (title: string) => {
      dispatch(tasksThunks.addTask({ title, todolistId }))
    }

  const removeTodolist = () => {
    dispatch(todolistsThunks.removeTodolist(id))
  }

  const changeTodolistTitle = (title: string) => {
      dispatch(todolistsThunks.changeTodolistTitle({ id, title }))
    }

  const onAllClickHandler = () => dispatch(todolistsActions.changeTodolistFilter({ id, filter: 'all' }))

  const onActiveClickHandler = () => dispatch(todolistsActions.changeTodolistFilter({ id, filter: 'active' }))

  const onCompletedClickHandler = () => dispatch(todolistsActions.changeTodolistFilter({ id, filter: 'completed' }))

  let tasksForTodolist = props.tasks

  if (props.todolist.filter === "active") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New)
  }
  if (props.todolist.filter === "completed") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed)
  }

  return (
    <div>
      <h3>
        <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"} />
      <div>
        {tasksForTodolist.map((t) => (
          <Task
            key={t.id}
            task={t}
            todolistId={props.todolist.id}
          />
        ))}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <Button
          variant={props.todolist.filter === "all" ? "outlined" : "text"}
          onClick={onAllClickHandler}
          color={"inherit"}
        >
          All
        </Button>
        <Button
          variant={props.todolist.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={props.todolist.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  )
})
