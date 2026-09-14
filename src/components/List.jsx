import { } from 'react';

const taskList = [
    {
        task: "Task 1",
        completed: true,
        icon: "🪄"
    },
    {
        task: "Task 2",
        completed: true,
        icon: "🪄"
    },
    {
        task: "Task 3",
        completed: false,
        icon: "🪄"
    },
]

const List = () => {
    return (

        

        taskList.map((task, index) => (
            <div key={index}>
                <span>{task.icon}</span>
                <span>{task.task}</span>
                <span>{task.completed ? "✅" : "❌"}</span>
            </div>
        ))
    );
};

export default List;