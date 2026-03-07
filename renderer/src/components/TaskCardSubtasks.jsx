import React, { useState } from "react";
import { SubTasks, SubtaskHeader } from "./SubtaskComponents.jsx";
import AddTaskBox from "./AddTaskBox.jsx";

export default function TaskCardSubtasks({ task }) {
    const [subtasksOpen, setSubTaskOpen] = useState(false);
    const [isAddingSubTask, setAddingSubTasks] = useState(false);

    if (task.completed) return null;

    return (
        <>
            <div className="divider" />
            <div className="subtasks">
                <SubtaskHeader
                    taskId={task.id}
                    subtasksOpen={subtasksOpen}
                    onClick={() => setSubTaskOpen(!subtasksOpen)}
                    onClickAddSubtask={() => setAddingSubTasks(!isAddingSubTask)} />
                {subtasksOpen && <SubTasks taskId={task.id} />}
            </div>
            {isAddingSubTask && <AddTaskBox taskId={task.id} onClose={() => setAddingSubTasks(false)} />}
        </>
    );
}
